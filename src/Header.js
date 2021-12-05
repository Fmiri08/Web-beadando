import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="headerButton">
        Home
      </Link>
      <Link to="/favourite" className="headerButton">
        Favourites
      </Link>
    </div>
  );
};

export default Header;
