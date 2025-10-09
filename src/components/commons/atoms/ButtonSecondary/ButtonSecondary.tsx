import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    value: string
};

const ButtonPrimary = (prop: Props) => {
  return (
    <button className="px-5 py-3 rounded-md bg-transparent text-white font-semibold w-fit border-2 border-white">
      {prop.value} <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );
};

export default ButtonPrimary;
