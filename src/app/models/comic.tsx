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

    function on_mouse_out() {
        set_hovering(false);
        document.getElementById(`img-${comic.id}`)?.classList.remove('blur-sm');
    }

    function on_mouse_enter() {
        set_hovering(true);
        document.getElementById(`img-${comic.id}`)?.classList.add('blur-sm');
    }

    var p = hovering ? <motion.div style={{backdropFilter: "blur(200px)", zIndex: 1}} className='h-full backdrop-blur-md bg-gray-400/30 text-center absolute top-0 p-3 w-full'>
            <p className='font-semibold'>{comic.name}</p>

        </motion.div> : null;
    
        return(
        <motion.div onMouseLeave={() => on_mouse_out()} onMouseEnter={() => on_mouse_enter()} whileHover={{ scale: 1.1}} className='relative rounded-xl border border-2 border-gray-100' key={comic.id}>
            <motion.img style={{zIndex: 0}} id={`img-${comic.id}`} src={`${img}`} className='h-64 w-60' height={40} alt={''} />
            {p}
        </motion.div>
    );
}