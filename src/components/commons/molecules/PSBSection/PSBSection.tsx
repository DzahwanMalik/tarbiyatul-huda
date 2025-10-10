import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";

const PSBSection = () => {
  return (
    <section>
      <div className="p-5 bg-[var(--color-surface)]">
        <h2 className="font-bold text-3xl mb-5 text-[var(--color-gold)]">
          Informasi PSB Tahun Ajaran 2025-2026
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] font-light mb-5">
          Penerimaan Santri Baru Tahun 2025-2026 telah dibuka! Saatnya bergabung
          bersama Pesantren Tarbiyatul Huda Bogor untuk menapaki jalan ilmu,
          iman, dan akhlak mulia menuju masa depan yang gemilang.
        </p>
        <ButtonPrimary value="WhatsApp" />
      </div>
    </section>
  );
};

export default PSBSection;
