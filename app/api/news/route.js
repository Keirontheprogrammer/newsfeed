import { NextResponse } from 'next/server'

//cache results period (30 mins)
const CACHE_DURATION = 30 * 60 * 1000;

const cache = {};

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic') || 'world';

    //check if cached
    const cached = cache[topic];
    const now = Date.now();

    if (cached && now - cached.fetchedAT < CACHE_DURATION) {
        console.log(`Cache for: ${topic}`)
        return NextResponse.json({articles:cached.data, fromCache: true});

    }

    try{
        const url = `https://gnews.io/api/v4/search?q=${topic}&lang=en&max=9&apikey=${process.env.GNEWS_API_KEY}`
        const res = await fetch(url)
        const data = await res.json()

        if(!data.articles) {
            return NextResponse.json({error: 'No articles found'}, {status: 404})

        }

        // caching
        cache[topic] = {
            data: data.articles,
            fetchedAT: now
        }

        console.log(`Fetched data for: ${topic}`)
        return NextResponse.json({articles: data.articles,fromCache: false})
    }
    catch(error){
        return NextResponse.json({error: 'Failed to fetch news'}, {status: 500});
    }
}
