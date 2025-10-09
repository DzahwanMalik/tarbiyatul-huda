import { Link } from "react-router";
import SocialMediaButtons from "../../atoms/SocialMediaButtons/SocialMediaButtons";

const Footer = () => {
  return (
    <div className="grid grid-cols-3 gap-5 px-3 py-12">
      <div className="col-span-3">
        <Link to="/">
          <img
            src="../../../../public/logo/tarhud-logo.png"
            alt=""
            width="150px"
            className="mb-5"
          />
        </Link>
        <p className="text-gray-500 leading-7 mb-5">
          Jl. Veteran I Kp. Legok Nyenang Desa Pancawati Kec. Caringin Kab.
          Bogor Jawa Barat 16750.
        </p>
        <SocialMediaButtons />
      </div>
      <div className="col-span-3">
        <h1 className="font-bold text-2xl mb-5">Informasi</h1>
        <ul className="flex flex-col gap-2 text-gray-500">
          <li>
            <Link to="/">Kontak</Link>
          </li>
          <li>
            <Link to="/about">Berita</Link>
          </li>
          <li>
            <Link to="/contact">FAQs</Link>
          </li>
          <li>
            <Link to="/gallery-foto">Galeri Foto</Link>
          </li>
          <li>
            <Link to="/gallery-video">Galeri Video</Link>
          </li>
        </ul>
      </div>
      <div className="col-span-3">
        <h1 className="font-bold text-2xl mb-5">Akreditasi</h1>
        <img
          src="../../../../../public/img/akreditasi.png"
          alt=""
          width="200px"
        />
      </div>
      <div className="col-span-3 flex flex-col gap-5">
        <p className="text-gray-500">Copyright &copy; 2025 Website Resmi Pondok Pesantren Tarbiyatul Huda</p>
        <a href="" className="text-gray-500">Privacy Policy</a>
      </div>
    </div>
  );
};

export default Footer;
