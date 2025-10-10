import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  icon: IconProp
  title: string;
  desc: string;
};

const StatisticDetail = (prop: Props) => {
  return (
    <div className="grow text-center flex flex-col gap-7 items-center">
      <div className="relative rounded-full">
        <FontAwesomeIcon icon={prop.icon} className="absolute top-1/2 left-1/2 -translate-1/2 text-3xl text-[var(--color-gold)]" />
      </div>
      <div className="">
        <h1 className="text-xl font-semibold text-[var(--color-text)]">
          {prop.title}
        </h1>
        <p className="text-xs text-[var(--color-text-muted)]">
          {prop.desc}
        </p>
      </div>
    </div>
  );
};

export default StatisticDetail;
