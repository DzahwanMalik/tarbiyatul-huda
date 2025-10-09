import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faLinkedinIn, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

type Icon = {
    name: string
    link: string
    icon: IconProp
}

const icons: Icon[] = [
    {
        name: "Linkedin",
        link: "",
        icon: faLinkedinIn
    },
    {
        name: "YouTube",
        link: "",
        icon: faYoutube
    },
    {
        name: "Instagram",
        link: "",
        icon: faInstagram
    },
    {
        name: "Tiktok",
        link: "",
        icon: faTiktok
    },
    {
        name: "Facebook",
        link: "",
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
              <a href={icon.link} className="relative inline-block size-7 rounded-full bg-gray-300 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white">
                <FontAwesomeIcon icon={icon.icon} className="absolute top-1/2 left-1/2 -translate-1/2" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SocialMediaButtons;
