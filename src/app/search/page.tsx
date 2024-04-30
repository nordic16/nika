'use client' 
import { montserrat } from '../ui/fonts';
import { invoke } from '@tauri-apps/api/tauri';

function handle_change() {
    var elem = document.getElementById("search-box")!;
    var text: string = elem.value;

    if (text.length != 0) {
      invoke('test', { msg: text });
    }

}

export default function Search() {
  return(
    <div className="md:container mx-auto">
      <p className={`${montserrat.className} text-5xl font-bold mb-10`}>Nika - Search Page</p> 
      <div className="ml-2 w-full text-center">
        <input id="search-box" onInput={handle_change} className="bg-nika-secondary w-10/12 text-center rounded-3xl py-4 text-2xl w-full" placeholder="Search Comics..."></input>
      </div>
    </div>
    )
}
