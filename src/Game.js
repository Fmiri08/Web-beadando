import React, { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

const Game = () => {
  let { id } = useParams();
  const [game, setGame] = useState([]);
  const [doDownload, setDoDownload] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [list, dispatch] = useReducer(reducer, {
    list: localStorage.getItem("favourites")
  });
  const buttonTextContext = React.createContext(modifyButtonText());
  const buttonText = useContext(buttonTextContext);

  function modifyButtonText() {
    if (!favourite) {
      return "Add to favourites";
    } else {
      return "Delete from favourites";
    }
  }

  function reducer(state, action) {
    switch (action) {
      case "add":
        return addFavourite(state.list);
      case "remove":
        return removeFavourite(state.list);
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
    return { list: state };
  }
  function removeFavourite(state) {
    state = state.replace("" + id + ",", "");
    localStorage.setItem("favourites", state);
    isFavourite();
    return { list: state };
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
      <button onClick={click}>{buttonText}</button>
    </div>
  );
};

export default Game;
