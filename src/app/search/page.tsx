'use client' 
import { FormEvent } from 'react';
import { montserrat } from '../ui/fonts';
import { invoke } from '@tauri-apps/api/tauri';

function handle_search_input(event: FormEvent<HTMLInputElement>) {
    var elem = event.currentTarget.value;

    if (elem.length != 0) {
      invoke('test', { msg: elem });
    }

}

export default function Search() {
  invoke('get_sources').then((values) => {
    console.log(values);
  });

    return(
      <div className="md:container mx-auto">
        <p className={`${montserrat.className} text-5xl font-bold mb-10`}>Nika - Search Page</p> 
        <div className="ml-2 w-full text-center">
          <input id="search-box" onInput={handle_search_input} className="bg-nika-secondary w-10/12 text-center rounded-3xl py-4 text-2xl w-full" placeholder="Search Comics..."></input>
          <div className="mt-2">
            <label className="mr-3">Choose source</label>
            <select id="sources">
              <option></option>
            </select>
          </div>
        </div>
      </div>
      )
  

  
}
