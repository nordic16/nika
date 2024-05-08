import { useEffect, useState } from 'react';
import { montserrat } from '../ui/fonts'
import { invoke } from '@tauri-apps/api/tauri';

export interface Comic {
    name: string,
    source_url: string,
    poster_url: string,
    id: number,
    
}

export default function comic_component(comic: Comic) {
    const headers = { headers: { "Referer" : comic.source_url }};
    
    return(
        <div className='relative' key={comic.id}>
            <p className='truncate max-w-64'>{comic.name}</p>
        </div>
    );
}