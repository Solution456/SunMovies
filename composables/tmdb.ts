import {fetch} from '~~/helpers/api/index'


import type { FilterQuery, Media, MediaType, PageResult } from "~~/types";



export const getListMedia = (type: MediaType, query:string, page:number): Promise<PageResult<Media>> => {
    return fetch(`tmdb/${type}/${query}`, {page})
}

export const getMedia = (type: MediaType, id: string): Promise<Media>  =>{
    return fetch(`tmdb/${type}/${id}`, {
      append_to_response: 'videos,credits,images,external_ids,release_dates',
      include_image_language: 'en',
    })
  }


export const getGenreList = (media: string): Promise<{ name: string; id: number }[]> =>  {
    return fetch(`tmdb/genre/${media}/list`).then(res => res.genres)
  }


export const getRecommendations = (type: MediaType, id:string, page=1): Promise<PageResult<Media>> => {
  return fetch(`tmdb/${type}/${id}/recommendations`, {page})
}


export const getTrending = (media: string, page = 1): Promise<PageResult<Media>> => {
  return fetch(`tmdb/trending/${media}/week`, { page })
}

export const searchTMDB = (query: string, page = 1):Promise<PageResult<Media>> => {
  return fetch(`tmdb/search/multi`, {query,page})
}

export const getMediaByGenres = (media: string, genres: string, page = 1):Promise<PageResult<Media>> => {
  return fetch(`tmdb/discover/${media}`, {
    with_genres: genres,
    page
  })
}

export const getMediaByFilters = (media: string, query:FilterQuery, page = 1):Promise<PageResult<Media>> => {
  let q = {

  }
  
  return fetch(`tmdb/discover/${media}`, {
    ...query,
    page
  })
}