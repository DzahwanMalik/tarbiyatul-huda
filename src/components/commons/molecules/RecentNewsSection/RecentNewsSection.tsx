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
    title: "Judul Berita",
    description: "Description",
    image: "",
    link: "",
  },
  {
    title: "Judul Berita",
    description: "Description",
    image: "",
    link: "",
  },
  {
    title: "Judul Berita",
    description: "Description",
    image: "",
    link: "",
  },
  {
    title: "Judul Berita",
    description: "Description",
    image: "",
    link: "",
  },
];

const recentNews2: RecentNews[] = [
  {
    title: "Judul Berita",
    description: "Description",
    image: "",
    link: "",
  },
  {
    title: "Judul Berita",
    description: "Description",
    image: "",
    link: "",
  },
  {
    title: "Judul Berita",
    description: "Description",
    image: "",
    link: "",
  },
  {
    title: "Judul Berita",
    description: "Description",
    image: "",
    link: "",
  },
];

const RecentNewsSection = () => {
  const [showMore, setShowMore] = useState(false);

  function handleClick() {
    setShowMore(!showMore);
  }

  return (
    <section>
      <div className="p-5">
        <h3 className="flex items-center justify-center gap-5 mb-3">
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
          <span className="text-[var(--color-text-muted)] font-bold">
            Postingan Terkini
          </span>
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
        </h3>
        <ul className={`${showMore ? "flex flex-col gap-3" : "flex flex-col gap-3 mb-5"}`}>
          {recentNews1.map((item, index) => (
            <li
              key={index}
              className="p-5 border-b-1 border-[var(--color-border)]"
            >
              <a href="" className="flex gap-5 items-center">
                <div className="size-20 bg-[var(--color-surface)] rounded-md animate-pulse">
                  <img src="" alt="" />
                </div>
                <div className="">
                  <h1 className="font-bold text-xl text-[var(--color-gold)]">
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
        <ul className={`${showMore ? "flex flex-col gap-3 mb-5" : "hidden"}`}>
          {recentNews2.map((item, index) => (
            <li
              key={index}
              className="p-5 border-b-1 border-[var(--color-border)]"
            >
              <a href="" className="flex gap-5 items-center">
                <div className="size-20 bg-[var(--color-surface)] rounded-md animate-pulse">
                  <img src="" alt="" />
                </div>
                <div className="">
                  <h1 className="font-bold text-xl text-[var(--color-gold)]">
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
        <ButtonSecondary value="Lihat Lebih Banyak" onClick={handleClick} />
      </div>
    </section>
  );
};

export default RecentNewsSection;
