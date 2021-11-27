import { useParams } from "react-router-dom";

const Game = () => {
  let { id } = useParams();
  console.log(id);
  return <div>{id}</div>;
};

export default Game;
