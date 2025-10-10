import { Outlet } from "react-router";
import { useEffect } from "react";
import HeroBanner from "../../commons/molecules/HeroBanner/HeroBanner";
import ButtonPrimary from "../../commons/atoms/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../commons/atoms/ButtonSecondary/ButtonSecondary";
import NavigationBar from "../../commons/molecules/NavigationBar/NavigationBar";
import Footer from "../../commons/molecules/Footer/Footer";

import "aos/dist/aos.css";
import AOS from "aos";

const MainLayout = () => {
  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: true,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      duration: 2000,
      easing: "ease-in-sine",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
    console.log('ready');
  }, []);

  return (
    <>
      <NavigationBar />
      <header>
        <HeroBanner />
      </header>
      <main>
        <Outlet />
        <section className="px-3 py-12 flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold text-[var(--color-gold)]">
              Siap Bergabung Dengan Tarbiyatul Huda?
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] font-light">
              Daftarkan dirimu sekarang dan mulailah perjalanan akademik bersama
              Tarbiyatul Huda. Masa depan cemerlang ada di depan mata!
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <ButtonPrimary value="Langsung Akses PSB" />
            <ButtonSecondary value="Mau Konsultasi Dulu" />
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
