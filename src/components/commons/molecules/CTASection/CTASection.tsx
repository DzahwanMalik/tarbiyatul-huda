import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../atoms/ButtonSecondary/ButtonSecondary";

const CTASection = () => {
  return (
    <section className="bg-surface">
      <div className="px-5 py-20 flex flex-col gap-5 max-w-5xl m-auto lg:px-0 lg:flex-row lg:items-center">
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
          <ButtonPrimary value="Langsung Akses PSB" link="https://tarhud.smartsystem.co.id/#/signin/" target="_blank" />
          <ButtonSecondary value="Mau Konsultasi Dulu" link="https://wa.me/6285693415051" target="_blank" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
