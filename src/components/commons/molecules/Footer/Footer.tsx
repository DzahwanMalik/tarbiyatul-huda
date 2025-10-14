import { Link } from "react-router";
import SocialMediaButtons from "../../atoms/SocialMediaButtons/SocialMediaButtons";

type Link = {
  name: string;
  link: string;
};

const informations: Link[] = [
  {
    name: "Kontak",
    link: "https://wa.me/6285693415051",
  },
  {
    name: "Berita",
    link: "/news",
  },
  {
    name: "FAQs",
    link: "/FAQs",
  },
  {
    name: "Gallery",
    link: "/gallery",
  },
];

const linkTerkait: Link[] = [
  {
    name: "Fighter Gen",
    link: "/fighter",
  },
  {
    name: "Annajmu Tsaqib Gen",
    link: "/annajmu",
  },
  {
    name: "Sulthon Gen",
    link: "https://www.instagram.com/sulthon__generation/",
  },
  {
    name: "Hilyatul Aulia Gen",
    link: "https://www.instagram.com/hilyatulaulia4official/",
  },
  {
    name: "Silmu Kaffah Gen",
    link: "https://www.instagram.com/silmukaffah_05/",
  },
];

const linkTerkait2: Link[] = [
  {
    name: "Siroja Muniro Gen",
    link: "https://www.instagram.com/siroja.muniro_/",
  },
  {
    name: "Jauhar Maknun Gen",
    link: "https://www.instagram.com/jauharmaknun_generation/",
  },
  {
    name: "Mursalatul Urfa Gen",
    link: "https://www.instagram.com/mursalatul_urfa/",
  },
  {
    name: "Dzirwatus Syarofi Gen",
    link: "https://www.instagram.com/dzirwatussyarofi/",
  },
  {
    name: "Musthafainal Akhyar Gen",
    link: "https://www.instagram.com/musyargeneration_/",
  },
];

const Footer = () => {
  return (
    <div className="border-t-1 border-[var(--color-border)]">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-14 py-10 max-w-5xl m-auto px-5 lg:px-0">
        <div className="col-span-4 lg:col-span-1">
          <a href="#">
            <img
              src="logo/tarhud-logo.png"
              alt=""
              width="150px"
              className="mb-5"
            />
          </a>
          <p className="text-[var(--color-text-muted)] leading-7 mb-5 text-xs">
            Jl. Veteran I Kp. Legok Nyenang Desa Pancawati Kec. Caringin Kab.
            Bogor Jawa Barat 16750.
          </p>
          <SocialMediaButtons />
        </div>
        <div className="col-span-4 lg:col-span-1">
          <h1 className="font-bold text-xl mb-2 text-[var(--color-gold)]">
            Informasi
          </h1>
          <div className="flex flex-col gap-2 lg:flex-row lg:gap-30">
            <ul className="flex flex-col gap-2">
              {informations.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link}
                    target="_blank"
                    className="inline-block transition-all duration-300 ease-in-out text-[var(--color-text-muted)] text-xs hover:text-[var(--color-gold-light)] hover:translate-x-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-4 lg:col-span-1">
          <h1 className="font-bold text-xl mb-2 text-[var(--color-gold)]">
            Link Terkait
          </h1>
          <div className="flex flex-col gap-2 lg:flex-row lg:gap-12">
            <ul className="flex flex-col gap-2">
              {linkTerkait.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link}
                    target="_blank"
                    className="inline-block transition-all duration-300 ease-in-out text-[var(--color-text-muted)] text-xs whitespace-nowrap hover:text-[var(--color-gold-light)] hover:translate-x-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2">
              {linkTerkait2.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link}
                    target="_blank"
                    className="inline-block transition-all duration-300 ease-in-out text-[var(--color-text-muted)] text-xs whitespace-nowrap hover:text-[var(--color-gold-light)] hover:translate-x-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-4 lg:col-span-1">
          <h1 className="font-bold text-xl mb-2 text-[var(--color-gold)]">
            Lihat Di Peta
          </h1>
          <div className="rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.4100202331097!2d106.86323117548719!3d-6.719718065701348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ca32c14cd37d%3A0x5c940d4f23452d77!2sPondok%20Pesantren%20Tarbiyatul%20Huda%20Cikereteg!5e0!3m2!1sid!2sid!4v1760336086313!5m2!1sid!2sid"
              width="100%"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="transition-all duration-300 ease-in-out hover:scale-110"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="bg-surface border-t-1 border-[var(--color-border)]">
        <div className="flex flex-col gap-3 lg:flex-row text-[var(--color-text-muted)] pt-6 pb-4 px-5 text-center text-xs max-w-5xl m-auto lg:justify-between lg:text-sm lg:px-0">
          <small className="">
            Copyright &copy; 2025 Website Resmi Pondok Pesantren Tarbiyatul Huda
          </small>
          <small>
            <a
              href="/privacypolicy"
              className="transition-all duration-300 ease-in-out hover:text-[var(--color-gold)]"
            >
              Privacy Policy
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Footer;
