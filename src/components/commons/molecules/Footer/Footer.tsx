import { Link } from "react-router";
import SocialMediaButtons from "../../atoms/SocialMediaButtons/SocialMediaButtons";

type Link = {
  name: string;
  link: string;
};

const links = [
  {
    name: "Kontak",
    link: "/",
  },
  {
    name: "Berita",
    link: "/about",
  },
  {
    name: "FAQs",
    link: "/contact",
  },
  {
    name: "Gallery",
    link: "/gallery",
  },
];

const Footer = () => {
  return (
    <div className="grid grid-cols-2 gap-5 pt-10 bg-[var(--color-surface)] border-t-1 border-[var(--color-border)]">
      <div className="col-span-2 px-5">
        <Link to="/">
          <img
            src="logo/tarhud-logo.png"
            alt=""
            width="150px"
            className="mb-5"
          />
        </Link>
        <p className="text-[var(--color-text-muted)] leading-7 mb-5">
          Jl. Veteran I Kp. Legok Nyenang Desa Pancawati Kec. Caringin Kab.
          Bogor Jawa Barat 16750.
        </p>
        <SocialMediaButtons />
      </div>
      <div className="col-span-2 px-5">
        <h1 className="font-bold text-2xl mb-5 text-[var(--color-gold)]">
          Informasi
        </h1>
        <ul className="flex flex-col gap-2 text-gray-500">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.link}
                className="inline-block transition-all duration-300 ease-in-out text-[var(--color-text-muted)] hover:text-[var(--color-gold-light)] hover:translate-x-2"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-2 flex flex-col gap-3 text-[var(--color-text-muted)] pt-6 pb-4 px-5 text-center bg-linear-to-t from-[#121212] to-[rgba(198, 166, 100, 0.08)] text-xs">
        <small className="">
          Copyright &copy; 2025 Website Resmi Pondok Pesantren Tarbiyatul Huda
        </small>
        <small>
          <a
            href=""
            className="transition-all duration-300 ease-in-out hover:text-[var(--color-gold)]"
          >
            Privacy Policy
          </a>
        </small>
      </div>
    </div>
  );
};

export default Footer;
