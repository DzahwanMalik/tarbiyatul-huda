const AboutPage = () => {
  return (
    <>
      <section className="lg:py-10">
        <div className="p-5 max-w-[var(--my-max-width)] m-auto">
          <h3 className="flex items-center justify-center gap-5 my-5">
            <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
            <span className="text-[var(--color-text-muted)] font-bold">
              Tentang Pesantren
            </span>
            <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
          </h3>
          <div className="flex flex-col gap-5" data-aos="fade-up">
            <h2 className="font-bold text-3xl text-[var(--color-gold)] lg:text-center">
              Selayang Pandang
            </h2>
            <p className="text-justify text-sm text-[var(--color-text-muted)]">
              Pondok Pesantren Tarbiyatul Huda adalah pesantren yang telah
              didirikan pada tahun 1982 oleh Seorang Ulama lulusan PP. Sunanul
              Huda, Cikaroya Sukabumi dan saat ini diasuh oleh putra-putri Pendiri.
            </p>
            <p className="text-justify text-sm text-[var(--color-text-muted)]">
              Secara formal Pondok Pesantren Tarbiyatul Huda mengelola jenjang pendidikan mulai dari tingkat dasar (MI) hingga tingkat menengah (MTs, MA). Seluruh lembaga dikelola secara profesional oleh Dewan Asatidz yang berasal dari berbagai latar belakang pendidikan., diantara mereka adalah Alumni dari:
              <ul className="list-disc ms-10 my-5">
                <li>Al-Azhar Mesir</li>
                <li>University of Melbourne Australia</li>
                <li>Universitas Ibn Khaldun Bogor</li>
                <li>Universitas Pakuan Bogor</li>
                <li>UIN Sunan Gunung Djati Bandung</li>
                <li>UIN Wali Songo Semarang</li>
                <li>Ma'had Daarul Qur'an Maroko</li>
                <li>UNJ</li>
                <li>UT</li>
                <li>Insitut Madani Nusantara</li>
                <li>Institut Kesatuan Bogor</li>
                <li>Universitas Djuanda Bogor</li>
                <li>Institut Ummul Quro Al Islami</li>
                <li>Salafiyah Tarbiyatul Huda</li>
                <li>Salafiyah Bahrul Ulum</li>
                <li>Tahfidz Ummul Quro Bogor</li>
                <li>Lembaga Lainnya.</li>
              </ul>
            </p>
            <p className="text-justify text-sm text-[var(--color-text-muted)]">
              Mulai Tahun 2010, Pondok Pesantren Tarbiyatul Huda membuka Program TMI (Tarbiyatul Mu'allimien wal Mu'allimaat Al Islamiyah) dengan masa belajar 6 dan 4 Tahun.
            </p>
            <p className="text-justify text-sm text-[var(--color-text-muted)]">
              Di Pondok Pesantren Tarbiyatul Huda, para santri dibina secara intensif agar memiliki ilmu yang seimbang antara pengetahuan agama dan umum dan dibimbing secara ekstra dalam latihan hidup beragama dan bermasyarakat sehingga selepas dari pesantren akan memiliki kesiapan untuk terjun ke masyarakat dalam berbagai bidang profesi.
            </p>
            <p className="text-justify text-sm text-[var(--color-text-muted)]">
              Pondok Pesantren Tarbiyatul Huda menggunakan Kurikulum Terpadu (Integrated Curicullum) yaitu kurikulum yang memadukan antara Studi Agama dan Umum (Kurikulum Pesantren Salafy, Pesantren Modern, Kementrian Agama, dan Kementrian Pendidikan dan Kebudayaan) dalam satu sistem yang terpadu secara integral.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
