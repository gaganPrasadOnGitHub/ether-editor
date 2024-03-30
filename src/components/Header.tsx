import DateTime from './DateTime';
import ThemeToggler from './ThemeToggler';

const Header = () => {
  return (
    <div id="header" className="container flex-default justify-space-between">
      <h2 className="main-color">Ether Editor</h2>
      <div className="flex-default">
        <DateTime />
        <ThemeToggler />
      </div>
    </div>
  );
};

export default Header;
