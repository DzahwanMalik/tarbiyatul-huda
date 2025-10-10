const AboutSection = () => {
  return (
    <section>
      <div className="p-5">
        <h3 className="flex items-center justify-center gap-5 mb-5">
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
          <span className="text-[var(--color-text-muted)] font-bold">Tentang Pesantren</span>
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
        </h3>
        <h2 className="font-bold text-3xl mb-5 text-[var(--color-gold)]">
          Masa Depanmu Dimulai Dari Sini!
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] font-light">
          Pesantren Tarbiyatul Huda Bogor hadir sebagai lembaga pendidikan Islam
          yang berkomitmen membentuk generasi berilmu, berakhlak, dan berdaya
          saing tinggi. Berlokasi di lingkungan yang asri dan sejuk di
          Pancawati, Cikereteg, pesantren ini memadukan nilai-nilai keislaman
          dengan pendidikan modern, menumbuhkan semangat belajar, kedisiplinan,
          serta kepedulian sosial. Di sinilah tempat para santri ditempa menjadi
          insan yang beriman, cerdas, dan siap menghadapi masa depan dengan
          cahaya ilmu dan keikhlasan.
        </p>
        <div className="my-5 rounded-md overflow-hidden">
          <iframe
            className="aspect-video"
            src="https://www.youtube.com/embed/pKBs8bsW1cg?si=L_Q2T4dD9UzDWwEL"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
