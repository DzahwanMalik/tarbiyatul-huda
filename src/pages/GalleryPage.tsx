// Swiper Components
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";

// Swiper Required Modules
import { EffectCards, EffectCoverflow } from "swiper/modules";

// Utils
import { heading, contents, cards1, cards2, cards3 } from "../utils/gallery";

import { useState } from "react";

const GalleryPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const optimizeImg = (url: string, width: number = 800) => {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  };

  return (
    <section className="lg:py-10">
      <div className="p-5 max-w-[var(--my-max-width)] m-auto flex flex-col justify-center items-center gap-10">
        <h3 className="flex items-center justify-center gap-5 my-5">
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
          <span className="text-[var(--color-text-muted)] font-bold">
            Dari Lensa Kita
          </span>
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
        </h3>

        <h2
          className="font-semibold text-xl text-[var(--color-gold)]"
          data-aos="fade-up"
        >
          "Nggak Cuma Foto, Ini Potongan Vibes Terbaik Kita"
        </h2>
        {/* Heading */}
        <div className="pb-10 w-full">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow]}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
            loop={true}
            data-aos="fade-up"
            className="mySwiper flex justify-center items-center h-72"
          >
            {heading.map((item, index) => (
              <SwiperSlide key={index} className="rounded-md overflow-hidden">
                <img
                  src={optimizeImg(item.src, 800)}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out hover:scale-110"
                  style={{
                    filter: isLoaded ? "blur(0)" : "blur(10px)",
                  }}
                  onLoad={() => setIsLoaded(true)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <h2
          className="font-semibold text-xl text-[var(--color-gold)]"
          data-aos="fade-up"
        >
          "Kumpulan Potret Kecil Yang Bikin Senyum Tiap Dilihat"
        </h2>
        {/* Contents */}
        <div className="pb-10 flex gap-3 flex-wrap w-full justify-center items-center">
          {contents.map((item, index) => (
            <div
              className="size-30 rounded-md overflow-hidden lg:size-40"
              key={index}
              data-aos="fade-up"
            >
              <img
                key={index}
                src={optimizeImg(item.src, 800)}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out hover:scale-110"
                style={{
                  filter: isLoaded ? "blur(0)" : "blur(10px)",
                }}
                onLoad={() => setIsLoaded(true)}
              />
            </div>
          ))}
        </div>

        <h2
          className="font-semibold text-xl text-[var(--color-gold)]"
          data-aos="fade-up"
        >
          "Cerita Pagi Sampai Senja, Semua Ada Disini"
        </h2>
        {/* Cards */}
        <div className="pb-10 flex flex-col justify-center items-center gap-10 w-full lg:flex-row lg:justify-evenly overflow-hidden">
          <div className="flex flex-col justify-center items-center gap-5">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper w-[240px] h-[320px] p-5"
              data-aos="fade-up"
            >
              {cards1.map((item, index) => (
                <SwiperSlide key={index} className="rounded-md overflow-hidden">
                  <img
                    src={optimizeImg(item.src, 800)}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center trasntion-all duration-300 ease-in-out hover:scale-110"
                    style={{
                      filter: isLoaded ? "blur(0)" : "blur(10px)",
                    }}
                    onLoad={() => setIsLoaded(true)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper w-[240px] h-[320px] p-5"
              data-aos="fade-up"
            >
              {cards2.map((item, index) => (
                <SwiperSlide key={index} className="rounded-md overflow-hidden">
                  <img
                    src={optimizeImg(item.src, 800)}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out hover:scale-110"
                    style={{
                      filter: isLoaded ? "blur(0)" : "blur(10px)",
                    }}
                    onLoad={() => setIsLoaded(true)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper w-[240px] h-[320px] p-5"
              data-aos="fade-up"
            >
              {cards3.map((item, index) => (
                <SwiperSlide key={index} className="rounded-md overflow-hidden">
                  <img
                    src={optimizeImg(item.src, 800)}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out hover:scale-110"
                    style={{
                      filter: isLoaded ? "blur(0)" : "blur(10px)",
                    }}
                    onLoad={() => setIsLoaded(true)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
