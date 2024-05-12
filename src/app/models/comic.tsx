import { useEffect, useState } from 'react';
import { montserrat } from '../ui/fonts'
import { invoke } from '@tauri-apps/api/tauri';

export interface Comic {
    name: string,
    source: string
    poster_url: string,
    id: number,
    poster_path: string,
}

export default function ComicComponent({comic}) {  
    const [img, set_img] = useState('');
    useEffect(() => {
        async function fetch_data() {
            const regex = new RegExp("^.+?[^\/:](?=[?\/]|$)");
            let referer = regex.exec(comic.source)![0];
            console.log(referer);

            const headers = {'headers' : {'Referer' : referer}}
            const response = await fetch(comic.poster_url, headers);
            const img = URL.createObjectURL(await response.blob());

            set_img(img);
        }
        fetch_data();
    }, []);
    
    return(
        <div className='relative' key={comic.id}>
            <p className='truncate max-w-64'>{comic.name}</p>
            <img src={img}></img>
        </div>
    );
}