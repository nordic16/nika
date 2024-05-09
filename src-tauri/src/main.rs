// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod commands;
pub mod models;
pub mod traits;
mod app;

use crate::commands::NikaError;
use app::App;
use lazy_static::lazy_static;
use reqwest::{Client, ClientBuilder};

use crate::{models::sources::mangapill::MangapillSource, traits::Source};

lazy_static! {
  pub static ref CLIENT: Client = ClientBuilder::new().gzip(true).build().unwrap();

  #[derive(Debug)]
  pub static ref SOURCES: Vec<Box<dyn Source>> = vec![Box::<MangapillSource>::default()];
}

fn main() -> NikaError<()> {
    let app = App::default();
    app.run()
}
