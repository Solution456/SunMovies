import {ofetch} from 'ofetch'
import https, { Agent } from 'https';
import HttpsProxyAgent from 'https-proxy-agent'

const isDev = process.env.NODE_ENV === 'development'

const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });


const TMDB_API_URL = 'https://api.themoviedb.org/3'
const TMDB_PROX = 'http://apitmdb.cub.watch/3/'

const api = isDev? TMDB_PROX : TMDB_API_URL

const TEST_API = 'https://official-joke-api.appspot.com'

export default defineEventHandler( async (event) => {
    const query = getQuery(event)

    console.log(
        'FETCHING TMDB API',{
            url: event.req.url,
            query,
            params:event.context.params
        }
    )

    
    
    const config = useRuntimeConfig()
    
    

    const optionsFetch = {
        
        method:'GET',
    }

    

    try {

        return await  ofetch(event.context.params.path,{
            baseURL: TMDB_PROX,
            params: {
                api_key: config.apiKey,
                ...query
            }
            
        })
    } 
    catch (e: any) {
        const status = e?.response?.status || 500
        event.res.statusCode = status
        console.log(e.message)
        return e.message?.replace(config.apiKey, '***')
    }
} 
)