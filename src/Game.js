import React, { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser"; //html parser

const Game = () => {
  //a paraméternek kapott játék id
  let { id } = useParams();
  //a visszakapott játék object
  const [game, setGame] = useState([]);
  //ez a változó jelzi az effectnek, hogy leállhat
  const [doDownload, setDoDownload] = useState(false);
  //kedvenc-e a játék vagy sem
  const [favourite, setFavourite] = useState(false);
  //a kedvenc lista
  const [list, dispatch] = useReducer(reducer, {
    list: localStorage.getItem("favourites")
  });
  //a kedvenc gomb szövege
  const buttonTextContext = React.createContext(modifyButtonText());
  const buttonText = useContext(buttonTextContext);

  //a kedvenc gomb szövegét határozza meg
  function modifyButtonText() {
    if (!favourite) {
      return "Add to favourites";
    } else {
      return "Delete from favourites";
    }
  }
  //reducer, ez határozza meg, hogy milyen akció hajtódjon végre
  //ha megnyomják a kedvenc gombot
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
  /* Az oldal megynitásakor fut le, működési elve megegyezik a Home-ban találhatóéval */

  useEffect(() => {
    setFavourite(isFavourite);
    const download = async () => {
      /* itt történik a letöltés 
       ids=${id}: egy id tömböt kell megadni, és az adott id-jű
       játékok kerülnek visszaadásra */
      try {
        const { data } = await axios.get(
          `https://api.boardgameatlas.com/api/search?ids=${id}&client_id=nPjnxTDLZk`
        );
        setGame(data.games[0]);
        if (game !== undefined) {
          setDoDownload(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    download();
  }, [doDownload]);
  return (
    <div className="game">
      <img className="image" alt="" src={game.image_url}></img>
      <div className="gameName">{doDownload && game.name}</div>
      <div className="gameDesc">
        {/* a parse a html-parser függvénye,
         a leírás html tageket tartalmaz */}
        {doDownload && parse(game.description.toString())}
      </div>
      <button onClick={click}>{buttonText}</button>
    </div>
  );
};

export default Game;
