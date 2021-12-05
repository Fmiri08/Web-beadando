import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

const Game = () => {
  let { id } = useParams();
  const [game, setGame] = useState([]);
  const [doDownload, setDoDownload] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    list: localStorage.getItem("favourites")
  });

  function reducer(state, action) {
    console.log(state);
    switch (action) {
      case "add":
        addFavourite(state.list);
        break;
      case "remove":
        removeFavourite(state.list);
        break;
      default:
        throw new Error();
    }
  }

  function isFavourite() {
    let list = localStorage.getItem("favourites");
    setFavourite(list !== "null" && list.includes(id + ","));
  }
  function addFavourite(state) {
    if (state === "null" || state === null) {
      state = "";
    }
    state = state + id + ",";
    localStorage.setItem("favourites", state);
    isFavourite();
  }
  function removeFavourite(state) {
    state = state.replace("" + id + ",", "");
    localStorage.setItem("favourites", state);
    isFavourite();
  }

  function click() {
    favourite ? dispatch("remove") : dispatch("add");
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
        {favourite ? "Delete from favourites" : "Add to favourites"}
      </button>
    </div>
  );
};

export default Game;
