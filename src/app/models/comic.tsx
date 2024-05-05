import { montserrat } from '../ui/fonts'
import { invoke } from '@tauri-apps/api/tauri';

export interface Comic {
    name: string,
    source: string,
    img_source: string,
    id: number,
    source_url: string
}

export default function comic_component(comic: Comic) {
    const regex = new RegExp("([^\/]+$)");
    const matches = regex.exec(comic.img_source)!;
    const req_url = `/img-api/${matches[0]}`;

    let img = <img src=""></img>

    fetch(req_url, { headers: {
        "Referer" : comic.source_url,
    }}).then(async response => {
        const img_url = URL.createObjectURL(await response.blob());
        img = <img src={img_url}></img>    
    });

    return(
        <div className='relative' key={comic.id}>
            <p className='truncate max-w-64'>{comic.name}</p>
            {img}
        </div>
    );
}