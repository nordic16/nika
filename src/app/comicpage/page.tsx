'use client'

import { useSearchParams } from "next/navigation";
import { Comic, ComicInfo } from "../models/comic";
import { montserrat } from '../ui/fonts'; 
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";


export default function ComicPage() {
  const params = useSearchParams();
  const comic = JSON.parse(params.get('comic')!) as Comic;    
  const img = params.get('img_path')!;

  const [description, set_description] = useState(String);

  useEffect(() => {
    async function get_info() {
      const source = localStorage.getItem('source')!;

      console.log(source);

      const result = await invoke('get_comic_info', { source: 'mangapill', comic: comic }).catch(e => console.log(e));
      console.log(JSON.stringify(result));
      let info = JSON.parse(JSON.stringify(result)) as ComicInfo;
    
      const desc = info.description! as string;

      set_description(desc);

      console.log(info.description);
      
    }

    get_info();
  });


  return (<div className="flex px-12">
  <img className="rounded-xl w-[300px] md:w-[400px] lg:w-[500px]" src={img} alt={''}></img>
  <div className="lg:ml-12 ml-8 py-4">
    <p className={`text-4xl md:text-5xl font-bold ${montserrat.className}`}>{comic?.name}</p>
    <div className={`flex mt-1 ml-2 gap-2 ${montserrat.className}`}>
      <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold md:text-lg text-[#10B981]">Ongoing</p>
      <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold md:text-lg text-[#FF5555]">Seinen</p>
      <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold md:text-lg text-[#B380FF]">Shonen</p>
    </div>

    <div className="ml-2 mt-4 bg-nika-secondary hidden xl:block py-4 px-8 rounded-xl w-full">
      <p className={`${montserrat.className} text-xl md:text-2xl font-bold text-center mb-2`}>Description</p>
      <p className="">{description}</p>
    </div>

    <div className="ml-2 mt-4 bg-nika-secondary py-4 px-8 rounded-xl w-full">
      <p className={`${montserrat.className} text-xl md:text-2xl font-bold text-center mb-2`}>Chapter List</p>
    </div>
  </div>


  </div>)
}
