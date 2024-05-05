use crate::models::comic::{Chapter, Comic, ComicInfo};
use crate::traits::Source;
use crate::CLIENT;
use async_trait::async_trait;
use regex::Regex;
use soup::{NodeExt, QueryBuilderExt, Soup};

#[derive(Default, Clone, Debug)]
pub struct MangapillSource;

#[async_trait]
impl Source for MangapillSource {
    async fn search(&self, query: &str) -> reqwest::Result<Vec<Comic>> {
        let url = format!("{}/search?q={query}", self.base_url());
        let body = CLIENT.get(url).send().await?.text().await?;
        let soup = Soup::new(&body);

        let tmp = soup.class("lg:grid-cols-5").find();

        if tmp.is_none() {
            // Couldn't find anything.
            return Ok(Vec::new());
        }

        let manga_src: Vec<_> = tmp
            .unwrap()
            .children()
            .filter(|x| x.display().to_lowercase().contains(&query.to_lowercase()))
            .collect();

        let mut mangas: Vec<Comic> = Vec::with_capacity(manga_src.len());

        for i in manga_src {
            // didn't use iterators here because code was too long
            let name = i
                .class("leading-tight")
                .find()
                .expect("Couldn't find name")
                .text();

            let tmp = i.tag("a").find();
            let base_url = self.base_url();
            let img = i.tag("img").find().unwrap().get("data-src").unwrap();

            match tmp {
                Some(e) => {
                    let regex = Regex::new("[0-9]+").unwrap();

                    let tmp = e.get("href").unwrap();
                    let source = format!("{base_url}{tmp}");
                    let id = regex.find(&source).unwrap()
                        .as_str().parse::<u32>().unwrap();

                    mangas.push(Comic::new(&name, &source, id, &img, self.base_url()));
                }
                None => continue,
            }
        }

        Ok(mangas)
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
        "Mangapill"
    }

    fn clone_dyn(&self) -> Box<dyn Source> {
        Box::new(self.clone())
    }
}
