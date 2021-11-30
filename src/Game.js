import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

const Game = () => {
  const [game, setGame] = useState([]);
  const [doDownload, setDoDownload] = useState(false);
  const [favourite, setFavourite] = useState(false);
  let { id } = useParams();

  function isFavourite() {
    let list = localStorage.getItem("favourites");
    setFavourite(list !== "null" && list.includes(id + ","));
  }
  function addFavourite() {
    let list = localStorage.getItem("favourites");
    if (list === "null" || list === null) {
      list = "";
    }
    list = list + " " + id + ",";
    localStorage.setItem("favourites", list);
    isFavourite();
  }
  function removeFavourite() {
    let list = localStorage.getItem("favourites");
    list = list.replace(" " + id + ",", "");
    localStorage.setItem("favourites", list);
    isFavourite();
  }

  function click() {
    if (!favourite) {
      addFavourite();
    } else {
      removeFavourite();
    }
  }

  useEffect(() => {
    setFavourite(isFavourite);
    const download = async () => {
      try {
        const { data } = await axios.get(
          `https://api.boardgameatlas.com/api/search?ids=${id}&client_id=nPjnxTDLZk`
        );
        setGame(data.games[0]);
        setDoDownload(true);
      } catch (e) {
        console.log(e);
      }
    };
    download();
  }, [doDownload]);
  return (
    <div>
      <img className="image" alt="" src={game.image_url}></img>
      <div>{doDownload && game.name}</div>
      <div>{doDownload && parse(game.description.toString())}</div>
      <button onClick={click}>
        {favourite ? "Törlés kedvencek közül" : "Hozzáadás kedvencekhez"}
      </button>
    </div>
  );
};

export default Game;
