use std::io;

use thiserror::Error;
use crate::{models::comic::{Chapter, Comic, ComicInfo}, SOURCES};

#[derive(Error, Debug)]
pub enum Errors {
    #[error("Networking Error.")]
    RequestError(#[from] reqwest::Error),

    #[error("IO Error.")]
    IOError(#[from] io::Error)
}

// serde::Serialize must be manually implemented.
impl serde::Serialize for Errors {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
      S: serde::ser::Serializer,
    {
      serializer.serialize_str(self.to_string().as_ref())
    }
  }
  
pub type NikaError<T> = Result<T, Errors>;

#[tauri::command]
pub async fn search(query: String, source: String) -> NikaError<Vec<Comic>> {
    // Will never fail
    let source = SOURCES.iter().find(|f| f.name().to_lowercase() == source.to_lowercase()).unwrap();
    let results = source.search(&query).await?;

    // Posters will be downloaded concurrently.
    
    /*
    let results_2: Vec<Comic> = results.clone();

    for result in results_2 {
      tauri::async_runtime::spawn(async move {
        source.download_poster(&result).await.unwrap();
      });
    }
    */

    Ok(results)
}

#[tauri::command]
pub async fn get_comic_info(comic: Comic, source: String) -> NikaError<ComicInfo> {
  let source = SOURCES.iter().find(|f| f.name().to_lowercase() == source.to_lowercase()).unwrap();
  source.get_comic_info(&comic).await
}


#[tauri::command]
pub fn get_sources() -> Vec<String> {
    SOURCES.iter().map(|f| f.name().to_owned()).collect()
}

#[tauri::command(rename_all = "snake_case")]
pub async fn download_poster(comic: Comic, source_name: String) -> NikaError<String> {
  let results : Vec<_> = SOURCES.iter().filter(|f| f.name().to_lowercase() == source_name.to_lowercase()).collect();
  let source = &results[0];

  source.download_poster(&comic).await
}

#[tauri::command(rename_all = "snake_case")]
pub async fn get_chapters(comic: Comic, source: String) -> NikaError<Vec<Chapter>> {
  let results : Vec<_> = SOURCES.iter().filter(|f| f.name().to_lowercase() == source.to_lowercase()).collect();
  let source = &results[0];

  source.get_chapters(&comic).await
}
