import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    value: string
};

const ButtonPrimary = (prop: Props) => {
  return (
    <button className="px-5 py-3 rounded-md bg-white text-primary font-semibold w-fit border-2 border-white">
      {prop.value} <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );
};

export default ButtonPrimary;
