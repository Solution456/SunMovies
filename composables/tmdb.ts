import { ofetch } from "ofetch";
import LRU from 'lru-cache'
import { hash as ohash } from 'ohash'


import type { Media, MediaType, PageResult } from "~~/types";

const apiBaseUrl = 'http://localhost:3000/api'


const cache = new LRU({
  max: 500,
  ttl: 2000 * 60 * 60, // 2 hour
})

const _fetchTMDB = (url:string, params: Record<string, string | number | undefined> = {}) => {
    return ofetch(url, {
        baseURL:`${apiBaseUrl}/tmdb`,
        params
    })
}



export const fetchTMDB = (url:string, params: Record<string, string | number | undefined> = {}):Promise<any> => {
  
  const hash = ohash([url, params])
  if(!cache.has(hash)){
    cache.set(
      hash,
      _fetchTMDB(url,params)
      .catch((error) => {
        cache.delete(hash)
        throw error
      }),
    )
  }
    

  return cache.get(hash)!
}

export const getListMedia = (type: MediaType, query:string, page:number): Promise<PageResult<Media>> => {
    return fetchTMDB(`${type}/${query}`, {page})
}

export const getMedia = (type: MediaType, id: string): Promise<Media>  =>{
    return fetchTMDB(`${type}/${id}`, {
      append_to_response: 'videos,credits,images,external_ids,release_dates',
      include_image_language: 'en',
    })
  }


export const getGenreList = (media: string): Promise<{ name: string; id: number }[]> =>  {
    return fetchTMDB(`genre/${media}/list`).then(res => res.genres)
  }


export const getRecommendations = (type: MediaType, id:string, page=1): Promise<PageResult<Media>> => {
  return fetchTMDB(`${type}/${id}/recommendations`, {page})
}


export const getTrending = (media: string, page = 1): Promise<PageResult<Media>> => {
  return fetchTMDB(`trending/${media}/week`, { page })
}

export const searchTMDB = (query: string, page = 1):Promise<PageResult<Media>> => {
  return fetchTMDB(`search/multi`, {query,page})
}