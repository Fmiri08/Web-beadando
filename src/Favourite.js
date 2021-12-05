import axios from "axios";
import { useEffect, useState } from "react";
import BoardGameCard from "./BoardGameCard";

const Favourite = () => {
  const [games, setGames] = useState([]);
  const [doDownload, setDoDownload] = useState(false);
  let ids = localStorage.getItem("favourites");
  if (ids === "") {
    ids = " ";
  }
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
