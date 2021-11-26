import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [games, setGames] = useState([]);
  const [doDownload, setDoDownload] = useState(false);
  useEffect(() => {
    const download = async () => {
      try {
        const { data } = await axios.get(
          "https://api.boardgameatlas.com/api/search?name=Catan&client_id=nPjnxTDLZk"
        );
        setGames(data);
        setDoDownload(true);
      } catch (e) {
        console.log(e);
      }
    };
    download();
  }, [doDownload]);
  return <div>{doDownload && <div>{games.games[0].id}</div>}</div>;
};

export default Home;
