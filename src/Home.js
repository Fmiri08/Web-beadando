import { useEffect, useState } from "react";
import axios from "axios";
import BoardGameCard from "./BoardGameCard";

const Home = () => {
  //a játék nevének State-je, ezt használja a keresés
  const [gameName, setGameName] = useState("");
  //a lekért játékok változója
  const [games, setGames] = useState([]);
  //ez a változó jelzi az effectnek, hogy leállhat
  const [doDownload, setDoDownload] = useState(false);

  /* ez a függvény akkor hívódik meg, ha keresni akarunk egy adott játékra,
  működése ugyanaz, mint a useEffect download függvénye, csak nem kell
  a doDownload State */
  async function downloadData() {
    try {
      /*itt történik a letöltés, a name=${gameName} adja meg azt, 
      hogy milyen szöveget tartalmazzon a játék neve*/
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
  /* Az oldal megynitásakor fut le */
  useEffect(() => {
    const download = async () => {
      try {
        /* itt történik a letöltés 
        fields=id,name,image_url : ez adja meg, hogy milyen
        mezőket szeretnénk megkapni a játék objektumból*/
        const { data } = await axios.get(
          `https://api.boardgameatlas.com/api/search?
           &fields=id,name,image_url&client_id=nPjnxTDLZk`
        );
        /*itt hozza létre a program a megjelenített társasjáték listát */
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
        /* első futásra valamiért undefined jön vissza,
         ha már nem undefined az érték, akkor leállhat a useEffect */
        if (games !== undefined) {
          setDoDownload(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    download();
  }, [doDownload]);

  return (
    <div>
      <div className="searchField">
        <input
          value={gameName.value}
          onChange={setName}
          className="input"
        ></input>
        <button onClick={downloadData} className="button">
          Search
        </button>
      </div>
      <div className="cardDiv">{doDownload && games}</div>
    </div>
  );
};

export default Home;
