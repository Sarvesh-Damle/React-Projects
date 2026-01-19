import React from "react";
import useSWR from "swr";

const SpaceNews = () => {
  const fetcher = (...args) => fetch(...args).then(response => response.json());

  const { data, isLoading } = useSWR('https://api.spaceflightnewsapi.net/v4/articles', fetcher)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Space News</h1>
        <p className="mt-2 text-lg text-gray-600">Latest updates from the universe</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {data && data?.results?.length > 0 ? (data?.results?.map((article) =>
        (
          <div 
            key={article?.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full group border border-gray-100"
            onClick={() => { window.location.href = article?.url }} 
          >
            <div className="relative h-56 overflow-hidden">
               {article.image_url ? (
                 <img 
                   src={article?.image_url} 
                   alt="article_image" 
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                 />
               ) : (
                 <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
               )}
               <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                 {article?.news_site}
               </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                {article?.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                {article?.summary}
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 font-medium">
                <span>{new Date(article?.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                <span className="text-blue-500 group-hover:underline">Read more &rarr;</span>
              </div>
            </div>
          </div>
        )
        )) : (
          <p className="text-center col-span-full text-gray-500 text-lg">No articles found.</p>
        )}
      </div>)}
    </div>
  );
};

export default SpaceNews;
