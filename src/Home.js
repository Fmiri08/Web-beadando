import { useEffect, useState } from "react";
import axios from "axios";
import BoardGameCard from "./BoardGameCard";

const Home = () => {
  const [games, setGames] = useState([]);
  const [doDownload, setDoDownload] = useState(false);
  useEffect(() => {
    const download = async () => {
      try {
        const { data } = await axios.get(
          "https://api.boardgameatlas.com/api/search?name=Catan&client_id=nPjnxTDLZk"
        );

        setGames(
          data.games.map((game) => <BoardGameCard key={game.id} id={game.id} />)
        );
        setDoDownload(true);
      } catch (e) {
        console.log(e);
      }
    };
    download();
  }, [doDownload]);

  return <div className="cardDiv">{doDownload && games}</div>;
};

export default Home;
