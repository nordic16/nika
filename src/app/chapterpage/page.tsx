'use client'

import { useSearchParams } from "next/navigation"
import { Chapter } from "../comicpage/chapter";

export default function ChapterPage() {

    const params = useSearchParams();
    const chapter = JSON.parse(params.get("chapter")!) as Chapter;

    return (
        <div>
            <p className="text-5xl">{chapter.name}</p>
        </div>
    )
}