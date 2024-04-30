use crate::models::comic::*;
use async_trait::async_trait;

#[async_trait]
pub trait Source: Send + Sync {
    /// Returns a list of search results based on query
    async fn search(&self, query: &str) -> reqwest::Result<Vec<Comic>>;

    fn base_url(&self) -> &'static str;

    /// Returns the chapters for a given comic
    async fn get_chapters(&self, comic: &Comic) -> reqwest::Result<Vec<Chapter>>;

    async fn get_info(&self, comic: &Comic) -> reqwest::Result<Option<ComicInfo>>;

    fn name(&self) -> &'static str;
}
