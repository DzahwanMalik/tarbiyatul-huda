import { Outlet } from "react-router";
import { useEffect } from "react";
import HeroBanner from "../../commons/molecules/HeroBanner/HeroBanner";
import NavigationBar from "../../commons/molecules/NavigationBar/NavigationBar";
import Footer from "../../commons/molecules/Footer/Footer";

import "aos/dist/aos.css";
import AOS from "aos";
import CTASection from "../../commons/molecules/CTASection/CTASection";
import WAButton from "../../commons/atoms/WAButton/WAButton";

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
  }, []);

  return (
    <>
      <NavigationBar />
      <header>
        <HeroBanner />
      </header>
      <main>
        <Outlet />
        <CTASection />
      </main>
      <footer>
        <Footer />
      </footer>
      <WAButton />
    </>
  );
};

export default MainLayout;
