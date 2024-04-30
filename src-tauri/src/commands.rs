pub mod search {
    #[tauri::command]
    pub async fn test(msg: String) {
        println!("sent from frontend: {msg}");
    }
}
