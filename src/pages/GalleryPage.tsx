// Swiper Components
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";

// Swiper Required Modules
import { EffectCards, EffectCoverflow, Pagination } from "swiper/modules";

import { heading, contents, cards } from "../utils/gallery";

const GalleryPage = () => {
  return (
    <section className="lg:py-10">
      <div className="p-5 max-w-5xl m-auto flex flex-col justify-center items-center gap-10">
        <h3 className="flex items-center justify-center gap-5 my-5">
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
          <span className="text-[var(--color-text-muted)] font-bold">
            Dari Lensa Kita
          </span>
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
        </h3>

        {/* Heading */}
        <div className="py-10 w-full">
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
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper flex justify-center items-center h-52"
          >
            {heading.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={item.src}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Contents */}
        <div className="flex gap-3 flex-wrap w-full justify-center items-center">
          {contents.map((item, index) => (
            <div className="size-40" key={index}>
              <img
                key={index}
                src={item.src}
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="flex flex-col justify-center items-center gap-10 w-full lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center items-center gap-5">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper w-[240px] h-[320px] p-5"
            >
              {cards.map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={item.src}
                    alt=""
                    className="w-full h-full object-cover object-center"
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
