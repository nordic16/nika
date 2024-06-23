'use client'

import { useSearchParams } from "next/navigation";
import { Chapter, Comic, ComicInfo } from "../models/comic";
import { montserrat } from '../ui/fonts'; 
import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";


export default function ComicPage() {
  const params = useSearchParams();
  const comic = JSON.parse(params.get('comic')!) as Comic;    
  const img = params.get('img_path')!;
  
  const [loading, set_loading] = useState(true);
  const [description, set_description] = useState(String);
  const [chapters, set_chapters] = useState(Array<React.JSX.Element>);
  const [status, set_status] = useState(String); 

  useEffect(() => {
    async function get_info() {
      const source = localStorage.getItem('source')!;

      console.log(source);

      const info_res = await invoke('get_comic_info', { source: 'mangapill', comic: comic }).catch(e => console.log(e));
      const chapters_res = await invoke('get_chapters', { source: 'mangapill', comic: comic}).catch(e => console.log(e));
      
      const info = JSON.parse(JSON.stringify(info_res)) as ComicInfo;
      const chapters_raw = JSON.parse(JSON.stringify(chapters_res)) as Chapter[];
    
      const desc = info.description! as string;

      // processing chapters
      const chapters = chapters_raw.map(ch => <div className="p-1 mx-1">
        <a href="/chapterpage" className="font-semibold truncate transition ease-in-out hover:text-nika-blue-primary">{ch.name}</a>
        </div>)

      set_description(desc);
      set_chapters(chapters.reverse());
      set_status(info.status.toString());
      set_loading(false);      // TODO: find better way to implement a loading screen lol.
    }

    get_info();
  });


  // goofy ahh code
  var body = !loading ? (<div className="flex">
    <img className="basis-3/12 lg:basis-4/12 rounded-xl grow-1" src={img} alt={''}></img>
    <div className="basis-9/12 lg:basis-8/12 lg:ml-12 ml-8 py-4">
      <p className={`text-4xl md:text-5xl font-bold ${montserrat.className}`}>{comic?.name}</p>
      <div className={`flex mt-1 ml-2 gap-2 ${montserrat.className}`}>
        <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold md:text-lg text-nika-green">{status}</p>
        <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold md:text-lg text-nika-red">Seinen</p>
        <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold md:text-lg text-nika-purple">Shonen</p>
      </div>
  
      <div className="ml-2 w-full mt-4 bg-nika-secondary hidden xl:block py-4 px-8 rounded-xl">
        <p className={`${montserrat.className} text-xl md:text-2xl font-bold text-center mb-2`}>Description</p>
        <p className="">{description}</p>
      </div>
  
      <div className="ml-2 mt-4 bg-nika-secondary py-4 px-8 rounded-xl max-h-96 overflow-scroll">
        <p className={`${montserrat.className} text-xl md:text-2xl font-bold text-center mb-2`}>Chapter List</p>
        <div className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 text-center">
          {chapters}
        </div>
      </div>
    </div>
  
    { /* Loading screen */ }
    </div>) : <div><p className={`${montserrat.className} text-center h-full w-full text-7xl absolute font-extrabold`}>Loading...</p></div>

  return body;
}
