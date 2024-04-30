#[derive(Clone, Debug)]
pub struct Comic {
    name: String,
    source: String,
}

impl Comic {
    pub fn new(name: &str, source: &str) -> Self {
        Self {
            name: name.to_owned(),
            source: source.to_owned()
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
            source: source.to_owned()
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

