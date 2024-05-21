'use client'
import { useEffect, useState } from 'react';
import { Body, ResponseType, fetch } from '@tauri-apps/api/http';
import { montserrat } from '../ui/fonts'
import { convertFileSrc, invoke } from '@tauri-apps/api/tauri';
import { BaseDirectory, exists, writeBinaryFile } from '@tauri-apps/api/fs';
import { tempdir } from '@tauri-apps/api/os';
import path from 'path';

export interface Comic {
    name: string,
    source: string
    poster_url: string,
    id: number,
}

export default function ComicComponent({name, source, poster_url, id} : Comic) {  
    const [img, set_img] = useState('');
    const regex = new RegExp("^.+?[^\/:](?=[?\/]|$)");
    let referer = regex.exec(source)![0];
    const headers = {'Referer' : referer};

    useEffect(() => {
        async function fetch_data() {
            const dir = await tempdir();
            const response = await fetch(poster_url, {
                method: 'GET',
                headers: headers,
                responseType: ResponseType.Binary,  
            });

            const data = Buffer.from(response.data as string, 'base64');
            const fname = name.replaceAll(' ', '_') + '.jpeg';
            const fpath = path.join("posters", fname);

            const full_path = path.join(dir, fpath);

            if (!await exists(fpath, { dir: BaseDirectory.Temp })) {
                await writeBinaryFile(full_path, new Uint8Array(data));
            }

            let src = convertFileSrc(full_path);
            // console.log(`${name} -> ${src}`);
            set_img(src);
        }
        fetch_data();
    }, []);
    
    return(
        <div className='relative' key={id}>
            <p className='truncate max-w-64'>{name}</p>
            <img src={`${img}`} width={196} />
        </div>
    );
}