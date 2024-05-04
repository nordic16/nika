use thiserror::Error;
use crate::{models::comic::Comic, SOURCES};

#[derive(Error, Debug)]
pub enum Errors {
    #[error("networking error.")]
    RequestError(#[from] reqwest::Error)
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

    Ok(results)
}

