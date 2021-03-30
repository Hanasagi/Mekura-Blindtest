import React,{useEffect} from 'react';
import axios from 'axios'
import FetchMusic from '../Services/FetchMusic'
import MusicService from '../Services/MusicService'

export interface SongInfo{
	artist: string;
	title: string;
}

export interface Song{
	song: {
		[key:number]: SongInfo
	};
	source:string;
	uid:string;
}


function MusicList() {
  return (
    <div>
       <button type="button" onClick={(e:any)=>handleClick()}>Click motherfucker</button>
    </div>
  )
}

async function handleClick(){
	let entry = await fetch()
	for(let i=0;i<entry.data.length;i++){
		if(i%500===0) delay(1000)
		let type=entry.data[i].uid.match(/^[A-Za-z]{6,8}/g)![0]
		let link="https://openings.moe/?video="+entry.data[i].uid
		MusicService.createEntry({"source":entry.data[i].source,"link":link,"type":type,"uid":entry.data[i].uid})
	}
}

function fetch(){
	return FetchMusic.initialFetch().then((r:any)=>{
		return r
	});
}
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export default MusicList