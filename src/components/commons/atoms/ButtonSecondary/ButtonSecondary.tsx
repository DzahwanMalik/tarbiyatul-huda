import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    value?: string
    link?: string
    target?: string
    onClick?: () => void;
};

const ButtonSecondary = (prop: Props) => {
  return (
    <a href={prop.link} target={prop.target} className="px-5 py-3 rounded-md font-semibold w-fit bg-transparent border-1 border-[var(--color-gold)] text-[var(--color-gold)] transition-all duration-300 ease-in-out text-xs hover:bg-[var(--color-surface)] cursor-pointer">
      {prop.value} <FontAwesomeIcon icon={faArrowRight} />
    </a>
  );
};

export default ButtonSecondary;
