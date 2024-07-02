// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{env::temp_dir, fs::create_dir_all};
use crate::{commands::*, SOURCES};

#[derive(Default)]
pub struct App;

impl App {
    /// Sets up cache dir and creates folders for each source.
    fn setup_cache(&self) -> NikaError<()> {
         
        let tmp_dir = temp_dir();

        for source in SOURCES.iter() {
            let path = tmp_dir.join(format!("nika/posters/{}", source.name()));
            // Again: probably doesn't need to be handled...
            let _ = create_dir_all(path);
        }
        Ok(())
    }

    pub fn run(&self) -> NikaError<()> {
        // Sets up cache dir.
        self.setup_cache()?;

        tauri::Builder::default()
            .invoke_handler(tauri::generate_handler![search, get_sources, download_poster, get_comic_info, get_chapters])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
        
            Ok(())
        }
    }