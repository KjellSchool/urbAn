import { Link } from "react-router";
import { Map } from "../components/map";

const Home = () => {
  return (
    <>
    <div className="game">
      <div className="game__map">
        <Map />
      </div>
      <div className="game__social">
        <Link className="social__nearby button--social">👤</Link>
        <Link className="social__profile button--social" to={`/profile`}>👋🏼</Link>
      </div>
      <div className="game__navigation">
        <Link className="navigation__routes button--navigation">🚏</Link>
      </div>
    </div>
    </>
  )
};

export default Home;