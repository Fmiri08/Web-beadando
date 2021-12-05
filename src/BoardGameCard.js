import { Link } from "react-router-dom";

//a listákban megtalálható elemeket kirajzoló függvény
const BoardGameCard = ({ id, name, image_url }) => {
  return (
    <Link to={`/id/${id}`}>
      <div className="gamecard">
        <div>
          <img src={image_url} alt="" className="image" />
        </div>
        {name}
      </div>
    </Link>
  );
};

export default BoardGameCard;
