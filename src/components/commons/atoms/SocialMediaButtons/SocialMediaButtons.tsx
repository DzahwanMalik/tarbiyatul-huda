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
              <a href={icon.link} className="text-[var(--color-text)] transition-all duration-300 ease-in-out text-xl">
                <FontAwesomeIcon icon={icon.icon} className="" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SocialMediaButtons;
