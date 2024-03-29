import { ofetch } from 'ofetch';
import LRU from 'lru-cache';
import { hash as ohash } from 'ohash';
const isDev = process.env.NODE_ENV === 'development'
const apiBaseUrl = isDev? 'http://localhost:3000/api' :'https://sun-movie.netlify.app/api';

const cache = new LRU({
  max: 500,
  ttl: 2000 * 60 * 60 // 2 hour
});


const _fetch = (url:string, params: Record<string, string | number | undefined> = {}) => {
    return ofetch(url, {
        baseURL:`${apiBaseUrl}`,
        params
    })
}


export const fetch = (url:string, params: Record<string, string | number | undefined> = {}):Promise<any> => {
  
    const hash = ohash([url, params])
    if(!cache.has(hash)){
      cache.set(
        hash,
        _fetch(url,params)
        .catch((error) => {
          cache.delete(hash)
          throw error
        }),
      )
    }
      
  
    return cache.get(hash)!
  }