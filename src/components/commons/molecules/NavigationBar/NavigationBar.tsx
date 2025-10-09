import HamburgerMenu from "../../atoms/HamburgerMenu/HamburgerMenu";
import { Link } from "react-router";

const NavigationBar = () => {
  return (
    <nav className="flex justify-between items-center p-5 shadow-xl fixed top-0 w-full bg-white">
      <Link to={"/"}>
        <img
          src="../../../../public/logo/tarhud-logo.png"
          alt=""
          width="150px"
        />
      </Link>
      <HamburgerMenu />
    </nav>
  );
};

export default NavigationBar;
