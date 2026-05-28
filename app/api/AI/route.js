import { NextResponse } from "next/server";

// cache the AI summarys

const SumCache = {}
const CACHE_DURATION = 30 * 60 * 1000;

export async function POST(request){
    const { title, description, content, url } = await request.json();


    const cached = SumCache[url];
    const now = Date.now();

    if (cached && now - cached.timestamp < CACHE_DURATION){
        console.log("Summary cached: ", url)

        return NextResponse.json({
            summary: cached.summary, fromCache: true
        });
    }

    const prompt = `
        You're a news summarizer, Summarise the following news article in 3 clear bullet points.
        Be concise, factual, and easy to understand based on the article's main topic.

        Title: ${title}
        Description: ${description}
        Content: ${content || description}
        
        Format your response as exaxtly 3 brief but not short bullet points starting with 🎯

    `
    try{
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // or 'mixtral-8x7b-32768'
        messages: [
            { role: 'system', content: 'You are a news summarizer. Summarize in 3 bullet points starting with 🎯.' },
            { role: 'user', content: `Title: ${title}\nDescription: ${description}\nContent: ${content || description}` }
        ],
        temperature: 0.3,
        max_tokens: 256
    })
});

const data = await res.json();
const summary = data.choices?.[0]?.message?.content;

        if(!summary) {
            return NextResponse.json({ error: 'No summarize content' }, { status: 500 });
        }

        //saving the cache
        SumCache[url] = {
            summary,
            timestamp: now

        }
        return NextResponse.json({ summary, fromCache: false })
    }
    catch(error){
        return NextResponse.json({ error: 'Failed to summarize' }, { status: 500 })
    }
}