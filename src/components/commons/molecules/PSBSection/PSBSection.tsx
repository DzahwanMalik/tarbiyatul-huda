import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";

const PSBSection = () => {
  return (
    <section className="lg:py-10" id="psb">
      <div className="p-5 bg-[var(--color-surface)] max-w-5xl m-auto lg:rounded-2xl lg:p-10">
        <h2 className="font-bold text-3xl mb-5 text-[var(--color-gold)]">
          Informasi PSB Tahun Ajaran 2025-2026
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] font-light mb-5">
          Penerimaan Santri Baru Tahun 2025-2026 telah dibuka! Saatnya bergabung
          bersama Pesantren Tarbiyatul Huda Bogor untuk menapaki jalan ilmu,
          iman, dan akhlak mulia menuju masa depan yang gemilang.
        </p>
        <ButtonPrimary value="WhatsApp" link="https://wa.me/6285693415051" target="_blank" />
      </div>
    </section>
  );
};

export default PSBSection;
