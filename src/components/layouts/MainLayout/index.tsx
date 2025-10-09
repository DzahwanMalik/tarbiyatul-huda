import { Outlet } from "react-router";
import ButtonPrimary from "../../commons/atoms/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../commons/atoms/ButtonSecondary/ButtonSecondary";
import NavigationBar from "../../commons/molecules/NavigationBar/NavigationBar";
import Footer from "../../commons/molecules/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <header>
        <NavigationBar />
      </header>
      <main className="pt-40">
        <Outlet />
        <section className="px-3 py-12 bg-primary text-white flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">
              Siap Bergabung Dengan Tarbiyatul Huda
            </h1>
            <p>
              Daftarkan dirimu sekarang dan mulailah perjalanan akademik bersama
              Tarbiyatul Huda. Masa depan cemerlang ada di depan mata!
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <ButtonPrimary value="Mau Konsultasi Dulu" />
            <ButtonSecondary value="Langsung Akses PSB" />
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
