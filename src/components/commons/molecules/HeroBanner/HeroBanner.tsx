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
};

const heroData: Slides[] = [
  {
    id: 1,
    title: "Masa Depanmu Dimulai Dari Sini!",
    description:
      "Pesantren Tarbiyatul Huda Bogor membina generasi berilmu dan berakhlak mulia dengan pendekatan modern dan nilai-nilai Islam.",
    buttonText: "Daftar Sekarang",
    buttonLink: "/psb",
  },
  {
    id: 2,
    title: "Membangun Generasi Qurani",
    description:
      "Kami berkomitmen melahirkan generasi cinta Al-Qur'an yang berdaya guna di masyarakat modern.",
    buttonText: "Pelajari Lebih Lanjut",
    buttonLink: "/tentang",
  },
  {
    id: 3,
    title: "Lingkungan Belajar yang Nyaman dan Islami",
    description:
      "Dukungan suasana pesantren yang asri dan disiplin membentuk karakter santri yang kuat dan mandiri.",
    buttonText: "Kunjungi Kami",
    buttonLink: "/kontak",
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroData.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [currentSlide]);

  const hero = heroData[currentSlide];

  return (
    <div className="relative h-screen bg-[url('https://images.unsplash.com/photo-1710953055333-ae4aaa4cdc6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870')] bg-cover bg-center bg-fixed flex gap-5 flex-col justify-center px-5 min-sm:after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/60 lg:h-[60vh]">
      <div className="max-w-5xl m-auto w-full">
        <div
          key={hero.id}
          className="relative z-10 flex flex-col gap-5"
          data-aos="fade-up"
        >
          <h1 className="font-bold text-4xl text-[var(--color-text)]">
            {hero.title}
          </h1>
          <p>{hero.description}</p>
          <ButtonPrimary value="Pelajari Lebih Lanjut" />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
