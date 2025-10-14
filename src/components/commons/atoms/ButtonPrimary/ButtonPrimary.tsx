import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  value?: string;
  onClick?: () => void;
};

const ButtonPrimary = (prop: Props) => {
  return (
    <button
      onClick={prop.onClick}
      className="px-5 py-3 rounded-md font-semibold w-fit bg-[var(--color-gold)] text-[var(--color-bg)] transition-all duration-300 ease-in-out text-xs hover:bg-[var(--color-gold-light)] cursor-pointer"
    >
      {prop.value} <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );
};

export default ButtonPrimary;
