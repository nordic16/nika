'use client' 
import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import { montserrat } from '../ui/fonts';
import { invoke } from '@tauri-apps/api/tauri';



export default function Search() {
  const [sources, set_sources] = useState(['']);
  const [sel_source, set_sel_source] = useState('');

  function handle_search_input(event: FormEvent<HTMLInputElement>) {
    var elem = event.currentTarget.value;

    if (elem.length !== 0) {
      invoke('test', { msg: elem });
    }
  } 

  function handle_source_change(evt: ChangeEvent<HTMLSelectElement>) {
    const index = evt.target.selectedIndex;
    set_sel_source(sources[index]);

    console.log(`Set source to ${sources[index]}!`);
  }
  

  useEffect(() => {
    invoke('get_sources').then((values) => {
      console.log(values);
      let arr = JSON.parse(JSON.stringify(values)) as string[];
      set_sources(arr);
    });
  }, []);

  let options = <select id="sources" onChange={handle_source_change}>
    {sources.map((el, index) => <option key={index}>{el}</option>)};
    <option>test</option>
  </select>;

  return (
    <div className="md:container mx-auto">
      <p className={`${montserrat.className} text-5xl font-bold mb-10`}>Nika - Search Page</p> 
      <div className="ml-2 w-full text-center">
        <input id="search-box" onInput={handle_search_input} className="bg-nika-secondary w-10/12 text-center rounded-3xl py-4 text-2xl w-full" placeholder="Search Comics..."></input>
        <div className="mt-2">
          <label className="mr-3">Choose source</label>
          {options}
        </div>
      </div>
    </div>
  )
}
