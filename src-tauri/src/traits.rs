use std::{fmt::Debug, fs::File, io::Write};

use crate::{commands::NikaError, models::comic::*, CLIENT};
use async_trait::async_trait;
use tauri::api::path::cache_dir;

#[async_trait]
pub trait Source: Send + Sync + Debug {
    /// Returns a list of search results based on query
    async fn search(&self, query: &str) -> NikaError<Vec<Comic>>;

    fn base_url(&self) -> &'static str;

    /// Returns the chapters for a given comic
    async fn get_chapters(&self, comic: &Comic) -> NikaError<Vec<Chapter>>;

    async fn get_info(&self, comic: &Comic) -> NikaError<Option<ComicInfo>>;

    fn name(&self) -> &'static str;

    fn clone_dyn(&self) -> Box<dyn Source>;

    /// Returns the full path for the downloaded poster.
    async fn download_poster(&self, comic: &Comic) -> NikaError<String> {
        let mut response = CLIENT.get(comic.poster_url()).header("Referer", self.base_url()).send().await?;
        let cache_dir = cache_dir().unwrap();

        let name = comic.name().replace(' ', "_");
        let fname = cache_dir.join(format!("nika/posters/{}/{}_poster.jpeg", self.name(), &name));
        
        if !fname.exists() {
            let mut f: File = File::create(&fname).unwrap();
            
            while let Some(chunk) = response.chunk().await? {
                f.write_all(&chunk).unwrap();
            }
        }

        let full_path = fname.to_string_lossy();
        Ok(full_path.to_string())
    }
}

impl Clone for Box<dyn Source> {
    fn clone(&self) -> Self {
        self.clone_dyn()
    }
}
