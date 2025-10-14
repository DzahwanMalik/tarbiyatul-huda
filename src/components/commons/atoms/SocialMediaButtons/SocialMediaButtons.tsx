import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedinIn, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

type Icon = {
    name: string
    link: string
    icon: IconProp
}

const icons: Icon[] = [
    {
        name: "YouTube",
        link: "https://www.youtube.com/@tarhudchannel",
        icon: faYoutube
    },
    {
        name: "Instagram",
        link: "https://www.instagram.com/tarhud_official/",
        icon: faInstagram
    },
    {
        name: "Tiktok",
        link: "https://www.tiktok.com/@tarhud.story?lang=id-ID",
        icon: faTiktok
    },
    {
        name: "Facebook",
        link: "https://www.facebook.com/tarhud?locale=id_ID",
        icon: faFacebook
    },
]

const SocialMediaButtons = () => {
  return (
    <div>
      <ul className="flex gap-3">
        {icons.map((icon) => {
          return (
            <li key={icon.name} className="flex">
              <a href={icon.link} target="_blank" className="text-[var(--color-text)] transition-all duration-300 ease-in-out text-xl">
                <FontAwesomeIcon icon={icon.icon} />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SocialMediaButtons;
