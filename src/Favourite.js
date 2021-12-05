import axios from "axios";
import { useEffect, useState } from "react";
import BoardGameCard from "./BoardGameCard";

const Favourite = () => {
  //visszakapott játékok
  const [games, setGames] = useState([]);
  //ez a változó jelzi az effectnek, hogy leállhat
  const [doDownload, setDoDownload] = useState(false);
  //localStorageban tároljuk a kedvencnek jelölt játékokat
  let ids = localStorage.getItem("favourites");
  //ha üresStringgel kérjük le a játékokat, akkor azt adja vissza,
  //mint amikor megnyitjuk a Home oldalt, ezért egy szóközt
  //teszünk bele
  if (ids === "") {
    ids = " ";
  }
  /* Az oldal megynitásakor fut le, működési elve megegyezik a Home-ban találhatóéval */
  useEffect(() => {
    const download = async () => {
      try {
        const { data } = await axios.get(
          `https://api.boardgameatlas.com/api/search?ids=${ids}&client_id=nPjnxTDLZk`
        );
        setGames(
          data.games.map((game) => (
            <BoardGameCard
              key={game.id}
              id={game.id}
              name={game.name}
              image_url={game.image_url}
            />
          ))
        );
        setDoDownload(true);
      } catch (e) {
        console.log(e);
      }
    };
    download();
  }, [doDownload]);

  return (
    <div className="cards">
      <div className="cardDiv">{doDownload && games}</div>
    </div>
  );
};

export default Favourite;
