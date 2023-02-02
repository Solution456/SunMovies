import {ofetch} from 'ofetch'
import https from 'https';

const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });


const TMDB_API_URL = 'https://api.themoviedb.org/3'

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
    
    try {
        return await ofetch(event.context.params.path,{
            
            baseURL: TMDB_API_URL,
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