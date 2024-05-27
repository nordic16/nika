import { useEffect, useState } from 'react';
import { Body, ResponseType, fetch } from '@tauri-apps/api/http';
import { montserrat } from '../ui/fonts'
import { convertFileSrc, invoke } from '@tauri-apps/api/tauri';
import { BaseDirectory, exists, writeBinaryFile } from '@tauri-apps/api/fs';
import { tempdir } from '@tauri-apps/api/os';
import path from 'path';
import Image from 'next/image';
import { motion } from "framer-motion";

export interface Comic {
    name: string,
    source: string
    poster_url: string,
    id: number,
}

export default function ComicComponent({comic} : {comic : Comic}) {  
    const [img, set_img] = useState('');
    const [hovering, set_hovering] = useState(false);
    
    useEffect(() => {
        async function fetch_data() {
            let path = await invoke('download_poster', { comic: comic, source_name: "Mangapill" })
                .catch(e => console.log(e)) as string;
            
            let source = convertFileSrc(path)
            set_img(source);           
        }
        fetch_data();
    });

    var p = hovering ? <motion.p whileFocus={{ scale: 1 }} className='truncate text-center absolute bottom-0 p-3 bg-nika-secondary font-semibold w-full'>{comic.name}</motion.p>
        : null;
    
        return(
        <motion.div onMouseOut={() => set_hovering(false)} onMouseEnter={() => set_hovering(true)} whileHover={{ scale: 1.1 }} className='relative border border-2 border-gray-100' key={comic.id}>
            <img src={`${img}`} width={340} alt={''} />
            {p}
        </motion.div>
    );
}