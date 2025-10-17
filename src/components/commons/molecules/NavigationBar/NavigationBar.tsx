import HamburgerMenu from "../../atoms/HamburgerMenu/HamburgerMenu";
import { Link } from "react-router";
import { useState } from "react";

type Link = {
  name: string;
  link: string;
};

const links: Link[] = [
  {
    name: "Beranda",
    link: "/",
  },
  {
    name: "Tentang Kami",
    link: "/about",
  },
  {
    name: "PSB",
    link: "https://tarhud.smartsystem.co.id/#/signin/",
  },
  {
    name: "Berita",
    link: "/news",
  },
  {
    name: "Gallery",
    link: "/gallery",
  },
];

const NavigationBar = () => {
  const [isShowed, setIsShowed] = useState(false);

  function handleClick() {
    setIsShowed(!isShowed);
    console.log(isShowed);
  }

  return (
    <nav className="fixed z-20 top-0 w-full lg:sticky" data-aos="fade-down">
      <div className="shadow-xl relative z-20 bg-[var(--color-bg)]">
        <div className="relative z-10 max-w-5xl m-auto flex justify-between items-center p-5">
          <a href={links[0].link}>
            <img src="logo/tarhud-logo.png" alt="" width="150px" />
          </a>
          <div className="lg:hidden">
            <HamburgerMenu onClick={handleClick} />
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
      </div>
      <div className={isShowed ? "absolute bottom-0 translate-y-full left-0 w-full p-5 bg-surface shadow-xl transition-all duration-300 ease-in-out lg:hidden" : "absolute bottom-0 left-0 w-full p-5 bg-surface shadow-xl transition-all duration-300 ease-in-out lg:hidden"}>
        <ul className="flex flex-col">
          {links.map((link, index) => (
            <li
              key={index}
              className="text-[var(--color-text)] transition-all duration-300 ease-in-out hover:text-[var(--color-gold-light)] flex"
            >
              <a href={link.link} className="py-5 w-full">{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
