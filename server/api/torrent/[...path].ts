import { ofetch } from "ofetch";

const API_URL = 'https://sun-movies-api.vercel.app/'


export default defineEventHandler ( async (event) => {
    const query = getQuery(event)


    console.log(
        'FETCHING TORRENT API', {
            url: event.req.url,
            query,
            params:event.context.params
        }
    )


    try {
        return await ofetch(event.context.params.path, {
            baseURL: API_URL,
            params:{
                ...query
            }
        })
    } catch (e: any) {
        const status = e?.response?.status || 500
        event.res.statusCode = status
        console.log(e.message)
    }


   


})