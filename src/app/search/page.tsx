'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { montserrat } from '../ui/fonts'; 
import { invoke } from '@tauri-apps/api/tauri';
import ComicComponent, { Comic } from '../models/comic';

export default function Search() {
  const [sources, set_sources] = useState(['']);
  const [sel_source, set_sel_source] = useState('');
  const [components, set_components] = useState(Array<React.JSX.Element>);

  function handle_search_input(event: FormEvent<HTMLInputElement>) {
    let query = event.currentTarget.value;
    invoke('search', { query: query, source: sel_source }).then(values => {
      let arr = JSON.parse(JSON.stringify(values)) as Comic[];
      set_components(arr.map(c => <ComicComponent comic={c} />))

    }).catch(e => console.log(e));
  
}

  function handle_source_change(evt: ChangeEvent<HTMLSelectElement>) {
    const index = evt.target.selectedIndex;
    set_sel_source(sources[index]);
    localStorage.setItem('source', sources[index]);

    console.log(`Set source to ${sources[index]}!`);
  }

  useEffect(() => {
    invoke('get_sources').then((values) => {
      let arr = JSON.parse(JSON.stringify(values)) as string[];
      set_sel_source(arr[0])
      set_sources(arr);
    });
  }, []);

  let options = <select className='text-black p-1 max-h-10' onChange={handle_source_change}>
    {sources.map((el, index) => <option key={index}>{el}</option>)};
  </select>;

  return (
    <div className='px-8'>
      <div className='grid grid-cols-5 gap-3 items-center'>
        <input onInput={handle_search_input} className="bg-nika-secondary col-span-4 pl-2 text-lg p-3 rounded-3xl" placeholder="Search Comics..."></input>
        {options}
      </div>
      <div className="ml-2 w-full">
        <div className="mt-3 flex gap-2 flex-wrap justify-center">
          {components}
        </div>  
      </div>
    </div>
  )
}
