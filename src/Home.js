import { useEffect, useState } from "react";
import axios from "axios";
import BoardGameCard from "./BoardGameCard";

const Home = () => {
  const [gameName, setGameName] = useState("");
  const [games, setGames] = useState([]);
  const [doDownload, setDoDownload] = useState(false);

  async function downloadData() {
    try {
      console.log(gameName);
      const { data } = await axios.get(
        `https://api.boardgameatlas.com/api/search?name=${gameName}
         &fields=id,name,image_url&fuzzy_match=true&client_id=nPjnxTDLZk`
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
    } catch (e) {
      console.log(e);
    }
  }

  function setName(event) {
    setGameName(event.target.value);
  }

  useEffect(() => {
    const download = async () => {
      try {
        const { data } = await axios.get(
          `https://api.boardgameatlas.com/api/search?name=${gameName}
           &fields=id,name,image_url&client_id=nPjnxTDLZk`
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
    <div>
      <div>
        <input value={gameName.value} onChange={setName}></input>
        <button onClick={downloadData}>Keresés</button>
      </div>
      <div className="cardDiv">{doDownload && games}</div>
    </div>
  );
};

export default Home;
