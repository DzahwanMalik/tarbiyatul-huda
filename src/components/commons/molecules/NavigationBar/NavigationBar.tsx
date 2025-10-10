import HamburgerMenu from "../../atoms/HamburgerMenu/HamburgerMenu";
import { Link } from "react-router";

const NavigationBar = () => {
  return (
    <nav className="flex justify-between items-center p-5 shadow-xl fixed z-50 top-0 w-full bg-[var(--color-bg)]">
      <Link to={"/"}>
        <img
          src="logo/tarhud-logo.png"
          alt=""
          width="150px"
        />
      </Link>
      <HamburgerMenu />
    </nav>
  );
};

export default NavigationBar;
