export default function Home() {
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
          placeholder="Search for news topic..e.g tech, aliens, africa"
          className="w-full max-w-lg bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500
                      focus:outline-none focus:border-blue-500"  
          />
          
          <button className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg transition font-medium">
            Search 🔎
          </button>
        </div>

      </section>

      {/* News Grid */}
      <section className="px-6 pb-10">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Top Stories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map((item)=> (
            <div key={item} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3">
              {/* Placeholder Image */}
              <div className="w-full h-40 bg-gray-800 rounded-lg animate-pulse">
                {/* Category Tag */}
                <span className="text-xs text-blue-400 font-medium uppercase"></span>
                
                {/* Headline */}
                <h4>{item}</h4>
                {/* Description */}
                <p className="text-gray-400 text-sm line-clamp-2">.. </p>
                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800">
                  <span className="text-xs text-gray-500">Your today's news</span>
                  <button className="text-xs bg-blue-600 hover:bg-blue-500 px-4 py-4 rounded-md transition">
                    🤖 Summarise🪄
                  </button>

                </div>

              </div>

            </div>

          ))}
        </div>

      </section>

    </main>
  )
}