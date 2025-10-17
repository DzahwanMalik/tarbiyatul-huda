import ButtonSecondary from "../../atoms/ButtonSecondary/ButtonSecondary";

const AboutSection = () => {
  const profil =
    "https://www.youtube.com/embed/pKBs8bsW1cg?si=L_Q2T4dD9UzDWwEL";

    function handleHref() {
      const link = document.createElement("a");
      link.href = "/about";
      link.click();
    }

  return (
    <section className="lg:py-10" id="about">
      <h3 className="flex items-center justify-center gap-5 my-5">
        <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
        <span className="text-[var(--color-text-muted)] font-bold">
          Tentang Pesantren
        </span>
        <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
      </h3>
      <div className="p-5 max-w-5xl m-auto flex flex-col gap-5 lg:px-0 lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center">
        <div className={`${profil ? "rounded-md overflow-hidden bg-surface animate-none" : "rounded-md overflow-hidden bg-surface animate-pulse"}`} data-aos="fade-up">
          <iframe
            className="aspect-video"
            src={profil}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        <div className="flex flex-col gap-5" data-aos="fade-up">
          <h2 className="font-bold text-3xl text-[var(--color-gold)]">
            Masa Depanmu Dimulai Dari Sini!
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] font-light">
            Pesantren Tarbiyatul Huda Bogor hadir sebagai lembaga pendidikan
            Islam yang berkomitmen membentuk generasi berilmu, berakhlak, dan
            berdaya saing tinggi. Berlokasi di lingkungan yang asri dan sejuk di
            Pancawati, Cikereteg, pesantren ini memadukan nilai-nilai keislaman
            dengan pendidikan modern, menumbuhkan semangat belajar,
            kedisiplinan, serta kepedulian sosial. Di sinilah tempat para santri
            ditempa menjadi insan yang beriman, cerdas, dan siap menghadapi masa
            depan dengan cahaya ilmu dan keikhlasan.
          </p>
          <ButtonSecondary value="Pelajari Lebih Lanjut" onClick={handleHref} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
