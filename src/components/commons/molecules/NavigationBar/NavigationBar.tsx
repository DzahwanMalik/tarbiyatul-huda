import HamburgerMenu from "../../atoms/HamburgerMenu/HamburgerMenu";
import { Link } from "react-router";

type Link = {
  name: string;
  link: string;
};

const links: Link[] = [
  {
    name: "Beranda",
    link: "#",
  },
  {
    name: "Tentang Kami",
    link: "#about",
  },
  {
    name: "PSB",
    link: "#psb",
  },
  {
    name: "Berita",
    link: "#news",
  },
  {
    name: "Gallery",
    link: "/gallery",
  },
];

const NavigationBar = () => {
  return (
    <nav className="shadow-xl sticky z-50 top-0 w-full bg-[var(--color-bg)]">
      <div className="max-w-5xl m-auto flex justify-between items-center p-5">
        <a href={links[0].link}>
          <img src="logo/tarhud-logo.png" alt="" width="150px" />
        </a>
        <div className="lg:hidden">
          <HamburgerMenu />
        </div>
        <ul className="hidden gap-12 text-sm lg:flex">
          {links.map((link, index) => (
            <li
              key={index}
              className="text-[var(--color-text)] cursor-pointer"
            >
              <a
                href={link.link}
                className="py-2 transition-all duration-300 ease-in-out relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-[var(--color-gold)] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:text-[var(--color-gold-light)]"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
