// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::{self, create_dir, create_dir_all};

use tauri::api::path::cache_dir;

use crate::{commands::*, SOURCES};

#[derive(Default)]
pub struct App;

impl App {

    /// Sets up cache dir and creates folders for each source.
    fn setup_cache(&self) {
        let cache_path = cache_dir().unwrap();

        for source in SOURCES.iter() {
            let path = cache_path.join(format!("nika/posters/{}", source.name()));
            let _ = create_dir_all(path);

        }

        // Again: probably doesn't need to be handled...
    }

    pub fn run(&self) -> NikaError<()> {
        // Creates cache dir.
        self.setup_cache();

        tauri::Builder::default()
            .invoke_handler(tauri::generate_handler![search, get_sources])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
        
            Ok(())
        }
    }