import { fetch } from "~~/helpers/api";



import type {Torrent, TorrentInfo } from "~~/types";


export const getTorrentList = (query:string):Promise<TorrentInfo[]> => {
    return fetch(`torrent/search`,{searchTerm:query})
}

export const addTorrent = (magnet:string):Promise<Torrent[]> =>  {
    return fetch(`torrent/torrent/add/${magnet}`)
}

export const removeTorrent = (magnet:string) => {
    return fetch(`torrent/torrent/remove/${magnet}`)
}
