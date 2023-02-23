import { Link } from "react-router-dom";
import "./DevMenu.css";

const DevMenu = () => {
  return (
    <>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/recover">Recover</Link>
            </li>
            <li>
              <Link to="/offers">Offers</Link>
            </li>
            <li>
              <Link to="/config">Config</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DevMenu;
