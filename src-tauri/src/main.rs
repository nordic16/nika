// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod commands;
pub mod traits;
pub mod models;

use commands::search::test;
use lazy_static::lazy_static;
use reqwest::{Client, ClientBuilder};

lazy_static! {
    pub static ref CLIENT: Client = ClientBuilder::new().gzip(true).build().unwrap();
}


fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![test])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}


