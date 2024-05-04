'use client' 
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { montserrat } from '../ui/fonts';
import { invoke } from '@tauri-apps/api/tauri';
import comic_component, { Comic } from '../models/comic';

export default function Search() {
  const [sources, set_sources] = useState(['']);
  const [sel_source, set_sel_source] = useState('');
  const [results, set_results] = useState(Array<Comic>)

  function handle_search_input(event: FormEvent<HTMLInputElement>) {
    var elem = event.currentTarget.value;

    
    invoke('search', { query: elem, source: sel_source }).then(values => {
      let arr = JSON.parse(JSON.stringify(values)) as Comic[];
      set_results(arr);

    }).catch(e => console.log(e));
  } 

  function handle_source_change(evt: ChangeEvent<HTMLSelectElement>) {
    const index = evt.target.selectedIndex;
    set_sel_source(sources[index]);

    console.log(`Set source to ${sources[index]}!`);
  }
  
  useEffect(() => {
    invoke('get_sources').then((values) => {
      let arr = JSON.parse(JSON.stringify(values)) as string[];
      set_sel_source(arr[0])
      set_sources(arr);
    });
  }, []);

  let options = <select className='text-black p-1' onChange={handle_source_change}>
    {sources.map((el, index) => <option key={index}>{el}</option>)};
  </select>;


  let results_div = null;

  if (results.length !== 0) {
    results_div = <div className='mt-2 bg-nika-secondary p-8 rounded-3xl'>
      <div className='grid grid-cols-4 gap-4 overflow-auto max-h-100'>
        {results.map(r => comic_component(r))}
      </div>
    </div>;
  }

  return (
    <div className="md:container mx-auto">
      <p className={`${montserrat.className} text-5xl font-bold mb-10`}>Nika - Search Page</p> 
      <div className="ml-2 w-full text-center">
        <input id="search-box" onInput={handle_search_input} className="bg-nika-secondary w-10/12 text-center rounded-3xl py-4 text-2xl w-full" placeholder="Search Comics..."></input>
        <div className="mt-2">
          <label className="mr-3">Choose source</label>
          {options}
          {results_div}
        </div>
      </div>
    </div>
  )
}
