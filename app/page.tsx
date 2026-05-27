'use client'
import { useState, useEffect } from "react"

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState('world');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchNews(topic)
  }, [topic])

  async function fetchNews(searchTopic){
    setLoading(true)
    try {
      const res = await fetch(`/api/news?topic=${searchTopic}`)
      const data = await res.json()
      setArticles(data.articles || [])
    }
    catch (err){
      console.error('Failed to fetch news:', err);
    }
    setLoading(false);
  }

  function handleSearch(){
    if(searchInput.trim()){
      setTopic(searchInput.trim())
    }
  }

  //handling the enter key
  function handleKeyDown(e) {
    if (e.key == 'Enter'){
      handleSearch();
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* NavBar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-400">📰THE NEWSFEED🗞️</h1>
        <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm py-2 rounded-lg transition">
          Sign In🫡
        </button>
      </nav>

      {/* Hero & Search */}
      <section className="px-6 py-10 text-center">
        <h2 className="text-3xl font-bold mb-2">Your Daily NewsFeed, Summarized by AI</h2>
        <p className="text-gray-400 mb-6">Search and get latest news topics instantly...</p>

        <div className="flex justify-center gap-2">
          <input 
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for news topic..e.g tech, aliens, africa"
          className="w-full max-w-lg bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500
                      focus:outline-none focus:border-blue-500"  
          />
          
          <button
            onClick={handleSearch} 
            className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg transition font-medium">
            Search 🔎
          </button>
        </div>

        {/* pills, shortcutt searches */}

        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {['world', 'technology', 'science', 'business', 'africa', 'aliens'].map((t)=>(
            <button
              key={t}
              onClick={()=> setTopic(t)}
              className={`text-xs px-3 py-1 rounded-full border transition capitalize 
                ${topic === t ? 'bg-blue-600 border-blue-600 text white' : 'border-gray-700 text-gray-400 hover:border-blue-500 hover:text-white'}`}
            >
              {t}
            </button>
          ))}

        </div>

      </section>

      {/* News Grid */}
      <section className="px-6 pb-10">
        <h3 className="text-lg font-semibold text-gray-300 mb-4 capitalize">
          {loading ? 'Loading...' : `Today's Top Stories -- ${topic}`}
          </h3>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map((i)=>(
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3">
                <div className="w-full h-40 bg-gray-800 rounded-lg animate-pulse" />
                <div className="h-4 bg-gray-800 rounded animate-pulse w-1/3" />
                <div className="h-4 bg-gray-800 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-800 rounded animate-pulse w-2/3" />
              </div>
              ))}

            </div>

          ) : (
            // articles

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article,index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3">
                {/* article image */}
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}
                 {/* source & time */}
                <span className="text-xs text-blue-400 font-medium uppercase">
                  {article.source?.name}
                </span>
                
                {/* Headline */}
                <h4 className="text-white font-semibold leading-snug">{article.title}</h4>
                {/* Description */}
                <p className="text-gray-400 text-sm line-clamp-2">{article.description}</p>
                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800">
                  <span className="text-xs text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      
                       <a
                       href={article.url}
                      target="_blank"
                      className="text-xs border border-gray-700 hover:border-gray-500 px-3 py-1 rounded-md transition"
                       >Read </a>
                       <button className="text-xs bg-blue-600 hover:bg-blue-500 px-4 py-4 rounded-md transition">
                    🤖 Summarise🪄
                  </button>

                    </div>
               
              </div>

                  

                </div>

            

          

          ))}
        </div>

          )}

        

      </section>

    </main>
  )
}