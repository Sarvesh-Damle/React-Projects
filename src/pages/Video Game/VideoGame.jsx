import React, { useState } from "react";
import useSWR from "swr"
import Swal from 'sweetalert2'
import BackButton from "../../components/BackButton";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const VideoGame = () => {
  const [gametitle, setGametitle] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const {data} = useSWR('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3', fetcher)
  
  const searchGame = () => {
    if (gametitle === '') {
      Swal.fire({
        icon: "error",
        title: "Search title is empty!",
      });
      return;
    }
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gametitle}&limit=3`)
      .then((response) => response.json())
      .then((data) => {
        setSearchedGames(data);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans relative">
      <BackButton />
      <div className="bg-slate-800 rounded-2xl shadow-xl w-full max-w-5xl p-8 mb-16 flex flex-col items-center">
        <h1 className="text-4xl text-white font-extrabold mb-8 text-center">Search for a Game</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl justify-center mb-8">
          <input
            type="text"
            placeholder="Counter-Strike..."
            value={gametitle}
            onChange={(e) => setGametitle(e.target.value)}
            className="flex-grow p-4 rounded-lg border-0 focus:ring-4 focus:ring-blue-500/50 outline-none text-gray-800 shadow-inner"
          />
          <button 
            onClick={searchGame}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg active:scale-95 whitespace-nowrap"
          >
            Search Title
          </button>
        </div>

        {searchedGames.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {searchedGames.map((game, key) => (
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col items-center text-center" key={key}>
                <h3 className="font-bold text-lg mb-4 text-gray-800">{game.external}</h3>
                <img src={game.thumb} alt={game.external} className="w-full h-32 object-cover rounded-md mb-4 shadow-sm" />
                <span className="inline-block bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full">
                  ${game.cheapest}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-6xl flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 flex items-center gap-2">
          Latest Deals
          <span role="img" aria-label="fire-emoji" className="animate-bounce">
            🔥
          </span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {data && data.map((game, key) => (
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-xl flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 relative overflow-hidden group" key={key}>
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md z-10">
                -{parseFloat(game.savings).toFixed(0)}%
              </div>
              
              <h2 className="text-xl font-bold mb-4 underline decoration-blue-400 underline-offset-4 line-clamp-1 group-hover:line-clamp-none transition-all">
                {game.title}
              </h2>
              
              <div className="space-y-2 mb-4 w-full">
                <div className="flex justify-between items-center w-full px-4 text-blue-100">
                  <span>Normal:</span>
                  <span className="line-through">${game.normalPrice}</span>
                </div>
                <div className="flex justify-between items-center w-full px-4 font-bold text-xl">
                  <span>Deal:</span>
                  <span className="text-yellow-300">${game.salePrice}</span>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-blue-500/50 w-full">
                <p className="text-sm opacity-90">
                  Steam Rating: <span className={`font-bold ${game.steamRatingText === 'Overwhelmingly Positive' ? 'text-green-300' : 'text-white'}`}>{game.steamRatingText}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGame;
