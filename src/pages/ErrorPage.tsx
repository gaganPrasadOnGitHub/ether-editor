import logo from '../assets/image/logo.svg';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex-default justify-center flex-column">
      <Header />

      <img className="logo" src={logo} alt="logo" />
      <h1 className="main-heading">Page Not found</h1>
      <Link className="link mt-16" to="/">
        <button className="primary-btn">Back to home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
