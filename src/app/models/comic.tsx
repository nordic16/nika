
import { useEffect, useState } from 'react';
import { convertFileSrc, invoke } from '@tauri-apps/api/tauri';
import Image from 'next/image';
import { motion } from "framer-motion";
import Link from 'next/link';

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
        document.getElementById(`img-${comic.id}`)?.classList.remove('blur-md');
    }

    function on_mouse_enter() {
        set_hovering(true);
        document.getElementById(`img-${comic.id}`)?.classList.add('blur-md');
    }

    var div = hovering ? <div className='h-full bg-gray-400/30 text-center absolute top-0 p-3 w-full'>
            <p className='font-semibold text-lg'>{comic.name}</p>

            <div className='mt-2 flex gap-4 justify-center'>
                <button><Image src={'/images/plus_button.png'} width={30} height={30} alt={''} /></button>
                {/* Might not be a good idea to do this lmfao */}
                <Link href={{pathname: "/comicpage/", query: {comic: JSON.stringify(comic), img_path: img}}}><Image src={'/images/info_button.png'} width={30} height={30} alt={''} /></Link>

            </div>

        </div> : null;
    
        return(
        <motion.div onMouseLeave={() => on_mouse_out()} onMouseEnter={() => on_mouse_enter()} whileHover={{ scale: 1.1}} className='relative rounded-xl border border-2 border-gray-100' key={comic.id}>
            <img id={`img-${comic.id}`} src={`${img}`} className='h-64 w-60' height={40} alt={''} />
            {div}
        </motion.div>
    );
}
