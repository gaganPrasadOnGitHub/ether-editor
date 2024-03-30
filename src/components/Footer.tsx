import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div id="footer" className="container">
      <small className="flex-default justify-center ">
        <Link className="link" to="/">
          Ether Editor
        </Link>
        <span>|</span>
        <Link
          className="main-color"
          to="https://cssbattle.dev/player/gagan"
          target="_blank"
        >
          {' '}
          GP
        </Link>
      </small>
    </div>
  );
};

export default Footer;
