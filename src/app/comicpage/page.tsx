'use client'

import { useSearchParams } from "next/navigation";
import { Comic } from "../models/comic";
import { montserrat } from '../ui/fonts'; 
import { useEffect, useState } from "react";


export default function ComicPage() {
  const params = useSearchParams();
  const [description, get_description] = useState(String);

  useEffect(() => {
    async function get_description() {
      
    }

    get_description();
  });

  const comic = JSON.parse(params.get('comic')!) as Comic;
  const img = params.get('img_path')!;

  return (<div className="flex px-12">
  <img className="rounded-xl" src={img} width={550} alt={''}></img>
  <div className="ml-12 py-4">
    <p className={`text-5xl font-bold ${montserrat.className}`}>{comic.name}</p>
    <div className={`flex mt-1 ml-2 gap-2 ${montserrat.className}`}>
      <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold text-lg text-[#10B981]">Ongoing</p>
      <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold text-lg text-[#FF5555]">Seinen</p>
      <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold text-lg text-[#B380FF]">Shonen</p>
    </div>

    <div className="ml-2 mt-4 bg-nika-secondary py-4 px-8 rounded-xl">
      <p className={`${montserrat.className} text-2xl font-bold text-center mb-2`}>Description</p>
      <p className="">{description}</p>
    </div>

    <div className="ml-2 mt-4 bg-nika-secondary py-4 px-8 rounded-xl">
      <p className={`${montserrat.className} text-2xl font-bold text-center mb-2`}>Chapter List</p>
    </div>
  </div>


  </div>)
}
