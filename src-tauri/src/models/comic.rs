use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize)]
pub struct Comic {
    name: String,
    source: String,
    id: u32,
    pub(super) poster_url: String,

    /// Url for used source.
    pub(super) source_url: String
}

impl Comic {
    pub fn new(name: &str, source: &str, id: u32, img_source: &str, source_url: &str) -> Self {
        Self {
            name: name.to_owned(),
            source: source.to_owned(),
            id,
            poster_url: img_source.to_owned(),
            source_url: source_url.to_owned()
        }
    }
}

#[derive(Clone, Debug)]
pub struct Chapter {
    name: String,
    source: String,
}

impl Chapter {
    pub fn new(name: &str, source: &str) -> Self {
        Self {
            name: name.to_owned(),
            source: source.to_owned(),
        }
    }
}

#[derive(Debug, Clone, Default)]
pub struct ComicInfo {
    // might change later.
    pub date: String,
    pub status: String,
    pub genres: Vec<String>,
}

impl ComicInfo {
    pub fn new(date: &str, status: &str, genres: Vec<String>) -> Self {
        Self {
            date: date.to_owned(),
            status: status.to_owned(),
            genres,
        }
    }
}
