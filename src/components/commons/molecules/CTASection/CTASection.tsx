import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../atoms/ButtonSecondary/ButtonSecondary";

const CTASection = () => {
  function handleHref(target: string) {
    const link = document.createElement("a");
    link.href = target;
    link.target = "_blank";
    link.click();
  }

  return (
    <section className="bg-surface overflow-hidden">
      <div className="px-5 py-20 flex flex-col gap-5 max-w-5xl m-auto lg:px-0 lg:flex-row lg:items-center" data-aos="fade-up">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-semibold text-[var(--color-gold)]">
            Siap Bergabung Dengan Tarbiyatul Huda?
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] font-light">
            Daftarkan dirimu sekarang dan mulailah perjalanan akademik bersama
            Tarbiyatul Huda. Masa depan cemerlang ada di depan mata!
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row">
          <ButtonPrimary
            value="Langsung Akses PSB"
            onClick={() => {
              handleHref("https://tarhud.smartsystem.co.id/");
            }}
          />
          <ButtonSecondary
            value="Mau Konsultasi Dulu"
            onClick={() => {
              handleHref("https://wa.me/6285693415051");
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
