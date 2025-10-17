import ButtonSecondary from "../../atoms/ButtonSecondary/ButtonSecondary";
import { useState } from "react";

type RecentNews = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const recentNews1: RecentNews[] = [
  {
    title: "Peresmian Nama",
    description: "Angkatan ke-13 Pondok Pesantren Tarbiyatul Huda",
    image:
      "https://res.cloudinary.com/dmndt2ffk/image/upload/v1760429570/SaveClip.App_562813250_18330554341232273_6813577850474305758_n_stuxis.jpg",
    link: "https://www.instagram.com/p/DPtmUKukTQe/?utm_source=ig_web_copy_link&igsh=dzdjMHp4aTVoNTQz",
  },
  {
    title: "Maulid Nabi & Haul ke-2",
    description:
      "Alm. Ust. Ridwansyah Pengasuh Pondok Pesantren Tarbiyatul Huda",
    image:
      "https://res.cloudinary.com/dmndt2ffk/image/upload/v1760429569/SaveClip.App_560587579_18329847301232273_3163332914783157146_n_f84g3f.jpg",
    link: "https://www.instagram.com/p/DPhsJKmgd4I/?utm_source=ig_web_copy_link&igsh=OGxtdjRyeDRyOTcz",
  },
  {
    title: "Silaturahmi & Studi Tiru PM UQI",
    description:
      "Silaturahmi & Studi Tiru PM UQI Ke Pondok Pesantren Tarbiyatul Huda",
    image:
      "https://res.cloudinary.com/dmndt2ffk/image/upload/v1760429570/SaveClip.App_545333644_18325553230232273_2559475150593674907_n_zciszc.jpg",
    link: "https://www.instagram.com/p/DOclzVrEe5w/?utm_source=ig_web_copy_link&igsh=ZXBqOXI2MGZpNG9t",
  },
  {
    title: "Hunting Tourist",
    description: "Annual Tourists Hunting Event",
    image:
      "https://res.cloudinary.com/dmndt2ffk/image/upload/v1760429569/SaveClip.App_554416097_18328295077232273_4310461427559715258_n_yzbedg.jpg",
    link: "https://www.instagram.com/p/DPNAvkDkvjj/?utm_source=ig_web_copy_link&igsh=MW1zeThsbzh6OWxkNg==",
  },
];

const recentNews2: RecentNews[] = [
  {
    title: "Selamat & Sukses Nina Nursakinah",
    description: "Peraih Juara 1 Solo Vokal, Edufest Al-Kahfi 2025",
    image:
      "https://res.cloudinary.com/dmndt2ffk/image/upload/v1760429569/SaveClip.App_549826678_18326365429232273_9125685553923124910_n_cctbkv.jpg",
    link: "https://www.instagram.com/p/DOsraacEd9f/?utm_source=ig_web_copy_link&igsh=MWdpaTV6bDU2NG44bw==",
  },
  {
    title: "Selamat & Sukses Sekar Dewi Arum",
    description: "Peraih Juara 3 Kaligrafi, Edufest Al-Kahfi 2025",
    image:
      "https://res.cloudinary.com/dmndt2ffk/image/upload/v1760429569/SaveClip.App_550499605_18326365378232273_3983668927108865577_n_zqjggl.jpg",
    link: "https://www.instagram.com/p/DOsrPhokYnt/?utm_source=ig_web_copy_link",
  },
  {
    title: "Selamat & Sukses Ilfha Dhea Arum",
    description: "Peraih Juara 3 Kaligrafi, Edufest Al-Kahfi 2025",
    image:
      "https://res.cloudinary.com/dmndt2ffk/image/upload/v1760429569/SaveClip.App_549256158_18326365009232273_5010834900294224186_n_dbf35y.jpg",
    link: "https://www.instagram.com/p/DOsq-Z1Ecx3/?utm_source=ig_web_copy_link&igsh=MWp5NGMyZXNzc3V2eQ==",
  },
  {
    title: "Selamat & Sukses Habibullah Az-Zibri",
    description: "Penerima Beasiswa Universitas Al-Azhar, Kairo, Mesir",
    image:
      "https://res.cloudinary.com/dmndt2ffk/image/upload/v1760429570/SaveClip.App_545015754_18325550200232273_455810579565998875_n_mrqbgn.jpg",
    link: "https://www.instagram.com/p/DOcgq1akaQo/?utm_source=ig_web_copy_link&igsh=MTQycHFyZGMyOGowOA==",
  },
];

const RecentNewsSection = () => {
  const [showMore, setShowMore] = useState<boolean>(false);

  function handleClick() {
    setShowMore(!showMore);
  }

  return (
    <section className="lg:py-10" id="news">
      <div className="p-5 py-10 max-w-[var(--my-max-width)] m-auto lg:px-0">
        <h3 className="flex items-center justify-center gap-5 mb-3">
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
          <span className="text-[var(--color-text-muted)] font-bold">
            Postingan Terkini
          </span>
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
        </h3>
        <div className="relative grid grid-cols-2 lg:gap-10 items-center overflow-hidden">
          <ul
            className={`flex flex-col gap-3 col-span-2 transition-all duration-300 ease-in-out lg:col-span-1 mb-5 lg:mb-0`}
          >
            {recentNews1.map((item, index) => (
              <li
                key={index}
                className="p-5 border-b-1 border-[var(--color-border)]"
                data-aos="fade-right"
              >
                <a
                  href={item.link}
                  target="_blank"
                  className="group flex gap-5 items-center"
                >
                  <div
                    className={`${
                      item.image
                        ? "size-20 bg-[var(--color-surface)] rounded-md animate-none overflow-hidden"
                        : "size-20 bg-[var(--color-surface)] rounded-md animate-pulse overflow-hidden"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="object-cover w-full h-full object-center"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <h1 className="group-hover:after:w-full font-bold text-xl text-[var(--color-gold)] relative w-fit after:absolute after:w-0 after:h-px after:bg-[var(--color-gold)] after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out">
                      {item.title}
                    </h1>
                    <p className="text-xs text-[var(--color-text-muted)] font-light">
                      {item.description}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <ul
            className={`col-span-2 transition-all duration-300 ease-in-out lg:col-span-1 lg:mb-0 lg:h-auto ${
              showMore
                ? "flex flex-col gap-3 mb-5 h-[624px]"
                : "mb-5 h-0 lg:flex lg:flex-col lg:gap-3"
            }`}
          >
            {recentNews2.map((item, index) => (
              <li
                key={index}
                className="p-5 border-b-1 border-[var(--color-border)]"
                data-aos="fade-right"
              >
                <a
                  href={item.link}
                  target="_blank"
                  className="group flex gap-5 items-center"
                >
                  <div
                    className={`${
                      item.image
                        ? "size-20 bg-[var(--color-surface)] rounded-md animate-none overflow-hidden"
                        : "size-20 bg-[var(--color-surface)] rounded-md animate-pulse overflow-hidden"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="object-cover w-full h-full object-center"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <h1 className="group-hover:after:w-full font-bold text-xl text-[var(--color-gold)] relative w-fit after:absolute after:w-0 after:h-px after:bg-[var(--color-gold)] after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out">
                      {item.title}
                    </h1>
                    <p className="text-xs text-[var(--color-text-muted)] font-light">
                      {item.description}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:hidden">
          <ButtonSecondary value="Lihat Lebih Banyak" onClick={handleClick} />
        </div>
      </div>
    </section>
  );
};

export default RecentNewsSection;
