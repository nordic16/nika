use std::{env::temp_dir, fmt::Debug, io::Write};

use crate::{commands::NikaError, models::comic::*, CLIENT};
use async_trait::async_trait;
use tauri::api::path::cache_dir;
use tokio::{fs::{self, File}, io::AsyncWriteExt};

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
        let tmp_dir = temp_dir();
        let name = comic.name().replace(' ', "_");
        let fname = tmp_dir.join(format!("nika/posters/{}/{}_poster.jpeg", self.name(), &name));
        
        // No need to redownload a poster...
        if !fname.exists() {
            let mut response: reqwest::Response = CLIENT.get(comic.poster_url()).header("Referer", self.base_url()).send().await?;
            let mut f = File::create(&fname).await?;
            
            while let Some(chunk) = response.chunk().await? {
                f.write(&chunk).await?;
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
