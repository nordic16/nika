import { useEffect, useState } from 'react';
import { Body, ResponseType, fetch } from '@tauri-apps/api/http';
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
    const regex = new RegExp("^.+?[^\/:](?=[?\/]|$)");
    let referer = regex.exec(comic.source)![0];
    const headers = {'Referer' : referer};

    useEffect(() => {
        async function fetch_data() {
            const response = await fetch(comic.poster_url, {
                method: 'GET',
                headers: headers,
                responseType: ResponseType.Binary,  
            });

            const data = Buffer.from(response.data as string, 'base64');
            

            set_img(data.toString());
        }
        fetch_data();
    }, []);
    
    return(
        <div className='relative' key={comic.id}>
            <p className='truncate max-w-64'>{comic.name}</p>
            <img src={img} />
        </div>
    );
}