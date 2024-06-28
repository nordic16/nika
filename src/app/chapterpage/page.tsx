'use client'

import { useSearchParams } from "next/navigation"
import { Chapter } from "../comicpage/chapter";
import { montserrat } from "../ui/fonts";

export default function ChapterPage() {

    const params = useSearchParams();
    const chapter = JSON.parse(params.get("chapter")!) as Chapter;

    return (
        <div>
            <p className={`text-5xl text-center ${montserrat.className} font-bold`}>{chapter.name}</p>
            <div className="w-full h-full bg-red-500 mt-2">
                
            </div>
        </div>
    )
}