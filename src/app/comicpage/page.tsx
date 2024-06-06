'use client'

import { useSearchParams } from "next/navigation";
import { Comic } from "../models/comic";
import { montserrat } from '../ui/fonts'; 


export default function ComicPage() {
  const params = useSearchParams();

  const comic = JSON.parse(params.get('comic')!) as Comic;
  const img = params.get('img_path')!;

  return (<div className="flex px-12">
  <img className="rounded-xl" src={img} width={850} alt={''}></img>
  <div className="ml-12 py-4">
    <p className={`text-5xl font-bold ${montserrat.className}`}>{comic.name}</p>
    <div className={`flex mt-1 ml-2 gap-2 ${montserrat.className}`}>
      <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold text-lg text-[#10B981]">Ongoing</p>
      <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold text-lg text-[#FF5555]">Seinen</p>
      <p className="py-2 px-4 bg-nika-secondary rounded-xl font-semibold text-lg text-[#B380FF]">Shonen</p>
    </div>

    <div className="ml-2 mt-4 bg-nika-secondary py-4 px-8 rounded-xl">
      <p className={`${montserrat.className} text-2xl font-bold text-center mb-2`}>Description</p>
      <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, molestiae ipsum. Odio adipisci deserunt doloribus quam! Dolorum autem dolorem nihil iste, totam modi, minima voluptas facilis provident, sapiente consequuntur adipisci.</p>
    </div>

    <div className="ml-2 mt-4 bg-nika-secondary py-4 px-8 rounded-xl">
      <p className={`${montserrat.className} text-2xl font-bold text-center mb-2`}>Chapter List</p>
    </div>
  </div>


  </div>)
}
