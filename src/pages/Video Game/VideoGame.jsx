import React, { useState } from "react";
import "./VideoGame.css";
import useSWR from "swr"
import Swal from 'sweetalert2'

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
        console.log(data);
      });
  };

  return (
    <div className="VideoGameContainer">
      <div className="searchSection">
        <h1>Search for a Game</h1>
        <input
          type="text"
          placeholder="Counter-Strike..."
          value={gametitle}
          onChange={(e) => setGametitle(e.target.value)}
        />
        <button onClick={searchGame}>Search Game Title</button>
        <div className="games">
          {searchedGames.map((game, key) => {
            return (
              <div className="game" key={key}>
                {game.external}
                <img src={game.thumb} alt="game_image" />${game.cheapest}
              </div>
            );
          })}
        </div>
      </div>
      <div className="dealsSection">
        <h1>
          Latest Deals
          <span role="img" aria-label="fire-emoji">
            🔥
          </span>
        </h1>
        <div className="games">
          {data && data.map((game, key) => {
            return (
              <div className="game" id="deals" key={key}>
                <h2><strong>{game.title}</strong> </h2>
                <p><strong> Normal Price: </strong>${game.normalPrice}</p>
                <p><strong> Deal Price: </strong>${game.salePrice}</p>
                <h4>You Save {game.savings.substr(0,5)}%</h4>
                <p><strong> Steam Rating: </strong>{game.steamRatingText}</p>
              </div>
            );   // true && expression = expression and false && expression = false
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoGame;
