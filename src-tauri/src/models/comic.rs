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

    pub fn name<'a>(&'a self) -> &'a str {
        &self.name
    }

    pub fn source<'a>(&'a self) -> &'a str {
        &self.source
    }

    pub fn poster_url<'a>(&'a self) -> &'a str {
        &self.poster_url
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