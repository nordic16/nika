import Link from "next/link";

export interface Chapter {
    name: String,
    source: String,
}

export default function ChapterComponent({chapter: ch} : {chapter : Chapter}) {
    return (
    <div className="p-1 mx-1">
        <Link href={{pathname: '/chapterpage/', query: {chapter: JSON.stringify(ch)}}} className="font-semibold truncate transition ease-in-out hover:text-nika-blue-primary">{ch.name}</Link>
    </div>
    )
}
