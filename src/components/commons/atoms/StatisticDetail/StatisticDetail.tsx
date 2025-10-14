import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";

type Props = {
  icon: IconProp;
  title: string;
  desc: string;
  target: number;
};

const StatisticDetail = forwardRef<HTMLHeadingElement, Props>(
  (prop: Props, ref) => {
    return (
      <div className="grow text-center flex flex-col gap-7 items-center">
        <div className="relative rounded-full">
          <FontAwesomeIcon
            icon={prop.icon}
            className="absolute top-1/2 left-1/2 -translate-1/2 text-3xl text-[var(--color-gold)]"
          />
        </div>
        <div className="text-center">
          <div className="flex justify-center">
            <h1
              className="text-xl font-semibold text-[var(--color-text)]"
              ref={ref}
            >
              0
            </h1>
            <span className="text-xl font-semibold text-[var(--color-text)]">{prop.title}</span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">{prop.desc}</p>
        </div>
      </div>
    );
  }
);

export default StatisticDetail;
