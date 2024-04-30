

use async_trait::async_trait;
use crate::models::comic::{Chapter, Comic, ComicInfo};
use crate::traits::Source;
use crate::CLIENT;

pub struct MangapillSource;

#[async_trait]
impl Source for MangapillSource {
    async fn search(&self, query: &str) -> reqwest::Result<Vec<Comic>> {
        let url = format!("{}/{query}", self.base_url());
        let body = CLIENT.get(url).send().await?.text().await?;

        todo!()
    }

    fn base_url(&self) -> &'static str {
        "https://mangapill.com"
    }

    async fn get_chapters(&self, comic: &Comic) -> reqwest::Result<Vec<Chapter>> {
        todo!()
    }

    async fn get_info(&self, comic: &Comic) -> reqwest::Result<Option<ComicInfo>> {
        todo!()
    }

    fn name(&self) -> &'static str {
        todo!()
    }
}
