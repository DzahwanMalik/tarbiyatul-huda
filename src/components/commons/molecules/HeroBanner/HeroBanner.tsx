import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type Slides = {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  img: string;
};

const heroData: Slides[] = [
  {
    id: 1,
    title: "Masa Depanmu Dimulai Dari Sini!",
    description:
      "Pesantren Tarbiyatul Huda Bogor membina generasi berilmu dan berakhlak mulia dengan pendekatan modern dan nilai-nilai Islam.",
    buttonText: "Daftar Sekarang",
    buttonLink: "https://tarhud.smartsystem.co.id/#/signin/",
    img: "https://res.cloudinary.com/dmndt2ffk/image/upload/v1760431857/WhatsApp_Image_2025-10-14_at_15.45.44_0d12ab6e_djb2wd.jpg",
  },
  {
    id: 2,
    title: "Membangun Generasi Qurani",
    description:
      "Kami berkomitmen melahirkan generasi cinta Al-Qur'an yang berdaya guna di masyarakat modern.",
    buttonText: "Pelajari Lebih Lanjut",
    buttonLink: "/about",
    img: "https://res.cloudinary.com/dmndt2ffk/image/upload/v1760431864/WhatsApp_Image_2025-10-14_at_15.49.14_b2478322_t3ojwz.jpg",
  },
  {
    id: 3,
    title: "Lingkungan Belajar yang Nyaman dan Islami",
    description:
      "Dukungan suasana pesantren yang asri dan disiplin membentuk karakter santri yang kuat dan mandiri.",
    buttonText: "Kunjungi Kami",
    buttonLink: "/about",
    img: "https://res.cloudinary.com/dmndt2ffk/image/upload/v1760433054/WhatsApp_Image_2025-10-14_at_16.05.16_b6fc7b37_mfnaoe.jpg",
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [currentSlide]);

  const hero = heroData[currentSlide];

  return (
    <div className="relative h-screen before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-cover before:bg-center before:bg-fixed before:animate-heroBanner flex gap-5 flex-col justify-center px-5 min-sm:after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/60 lg:h-[60vh] overflow-hidden" style={{"--hero-bg": `url(${hero.img})`} as React.CSSProperties} id="heroBanner">
      <div className="max-w-5xl m-auto w-full">
        <div
          key={hero.id}
          className="relative z-10 flex flex-col gap-5 lg:max-w-[70%]"
          data-aos="fade-up"
        >
          <h1 className="font-bold text-4xl text-[var(--color-text)]">
            {hero.title}
          </h1>
          <p>{hero.description}</p>
          <ButtonPrimary value={hero.buttonText} link={hero.buttonLink} />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
