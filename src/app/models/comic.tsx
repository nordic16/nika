import { useEffect, useState } from 'react';
import { Body, ResponseType, fetch } from '@tauri-apps/api/http';
import { montserrat } from '../ui/fonts'
import { convertFileSrc, invoke } from '@tauri-apps/api/tauri';
import { BaseDirectory, exists, writeBinaryFile } from '@tauri-apps/api/fs';
import { tempdir } from '@tauri-apps/api/os';
import path from 'path';
import Image from 'next/image';

export interface Comic {
    name: string,
    source: string
    poster_url: string,
    id: number,
}

export default function ComicComponent({comic} : {comic : Comic}) {  
    const [img, set_img] = useState('');

    useEffect(() => {
        async function fetch_data() {
            let path = await invoke('download_poster', { comic: comic, source_name: "Mangapill" }) as string;
            let source = convertFileSrc(path)
            set_img(source);
        }
        fetch_data();
    }, []);
    
    return(
        <div className='relative' key={comic.id}>
            <p className='truncate max-w-64'>{comic.name}</p>
            <img src={`${img}`} width={196} height={196} alt={''} />
        </div>
    );
}