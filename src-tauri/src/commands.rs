use std::io;

use thiserror::Error;
use crate::{models::comic::Comic, SOURCES};

#[derive(Error, Debug)]
pub enum Errors {
    #[error("Networking Error.")]
    RequestError(#[from] reqwest::Error),

    #[error("IO Error.")]
    IOError(#[from] io::Error)
}

// we must manually implement serde::Serialize
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

    let results_2 = results.clone();

    // Posters will be downloaded concurrently.
    
    /*
    for result in results_2 {
      tauri::async_runtime::spawn(async move {
        source.download_poster(&result).await.unwrap();
      });
    }
    */

    Ok(results)
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