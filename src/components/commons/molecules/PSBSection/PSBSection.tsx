import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../atoms/ButtonSecondary/ButtonSecondary";

const PSBSection = () => {
  function handleDownload() {
    const link = document.createElement("a");
    link.href = "file/brosur.pdf";
    link.download = "brosur-tarbiyatul-huda.pdf";
    link.click();
  }

  function handleHref() {
    const link = document.createElement("a");
    link.href = "https://wa.me/6285693415051";
    link.target = "_blank";
    link.click();
  }

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
        <div className="flex gap-3">
          <ButtonPrimary value="Download Brosur" onClick={handleDownload} />
          <ButtonSecondary value="WhatsApp" onClick={handleHref} />
        </div>
      </div>
    </section>
  );
};

export default PSBSection;
