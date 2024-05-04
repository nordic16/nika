'use client'
import { montserrat } from '../ui/fonts'
import { invoke } from '@tauri-apps/api/tauri';

export interface Comic {
    name: string,
    source: string,
    img_source: string,
    id: number
}

export default function comic_component(comic: Comic) {
    return(
        <div className='relative' key={comic.id}>
            { /*<img src={comic.img_source}></img> */ }
            <p className='truncate max-w-64'>{comic.name}</p>
        </div>
    )
}