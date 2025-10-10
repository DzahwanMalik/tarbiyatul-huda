import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import StatisticDetail from "../../atoms/StatisticDetail/StatisticDetail";
import {
  faChalkboard,
  faGraduationCap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

type Statistic = {
  icon: IconProp;
  title: string;
  desc: string;
};

const statistics: Statistic[] = [
  {
    icon: faChalkboard,
    title: "200 + Pengajar",
    desc: "Total Pengajar Berpengalaman",
  },
  {
    icon: faUser,
    title: "1000 + Santri",
    desc: "Total Santri Aktif",
  },
  {
    icon: faGraduationCap,
    title: "800 + Alumni",
    desc: "Total Alumni Tersebar",
  },
];

const StatisticContainer = () => {
  return (
    <section className="">
      <div className="py-10 flex gap-10 justify-center bg-[var(--color-surface)]">
        <ul className="flex flex-col gap-10">
          {statistics.map((statistic) => {
            return (
              <StatisticDetail
                icon={statistic.icon}
                title={statistic.title}
                desc={statistic.desc}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default StatisticContainer;
