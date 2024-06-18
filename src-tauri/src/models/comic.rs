use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize)]
pub struct Comic {
    name: String,
    source: String,
    id: u32,
    poster_url: String,
}

impl Comic {
    pub fn new(name: &str, source: &str, id: u32, img_source: &str) -> Self {
        Self {
            name: name.to_owned(),
            source: source.to_owned(),
            id,
            poster_url: img_source.to_owned(),
        }
    }

    pub fn name(&self) -> &str {
        &self.name
    }

    pub fn source(&self) -> &str {
        &self.source
    }

    pub fn poster_url(&self) -> &str {
        &self.poster_url
    }
}

#[derive(Debug, Clone, Serialize)]
pub struct Chapter {
    name: String,
    source: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct ComicInfo {
    // some sources don't include authors lmfao
    author: Option<String>,
    // rating: Option<String>,
    status: String,
    genres: Option<Vec<String>>,
    description: Option<String>
}

impl ComicInfo {
    pub fn new(author: Option<String>, status: &str, genres: Option<Vec<String>>, description: Option<String>) -> Self {
        Self { author, status: status.to_owned(), genres, description }
    }
}

impl Chapter {
    pub fn new(name: &str, source: &str) -> Self {
        Self {
            name: name.to_owned(),
            source: source.to_owned(),
        }
    }
}