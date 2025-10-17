import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import StatisticDetail from "../../atoms/StatisticDetail/StatisticDetail";
import {
  faChalkboard,
  faGraduationCap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef, useState } from "react";

type Statistic = {
  icon: IconProp;
  title: string;
  desc: string;
  target: number;
};

const statistics: Statistic[] = [
  {
    icon: faChalkboard,
    title: "+ Pengajar",
    desc: "Total Pengajar Berpengalaman",
    target: 200,
  },
  {
    icon: faUser,
    title: "+ Santri",
    desc: "Total Santri Aktif",
    target: 1000,
  },
  {
    icon: faGraduationCap,
    title: "+ Alumni",
    desc: "Total Alumni Tersebar",
    target: 800,
  },
];

const StatisticContainer = () => {
  const refs = useRef<HTMLHeadingElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<boolean>(false);

  window.addEventListener("scroll", () => {
    const refPosition = sectionRef.current?.getBoundingClientRect().top;

    if (refPosition && refPosition < (window.innerHeight * 50) / 100) {
      setCount(true);
    }
  });

  useEffect(() => {
    if (count) {
      initCountUp();
    }
  });

  async function initCountUp() {
    const { CountUp } = await import("countup.js");
    refs.current.forEach((ref, index) => {
      if (ref) {
        const countUp = new CountUp(ref, statistics[index].target);
        if (!countUp.error) countUp.start();
        else console.error(countUp.error);
      }
    });
  }

  return (
    <section className="lg:py-10">
      <div
        className="px-10 py-14 flex gap-10 justify-center bg-[var(--color-surface)] max-w-[var(--my-max-width)] m-auto lg:rounded-2xl overflow-hidden"
        ref={sectionRef}
      >
        <ul className="flex flex-col gap-10 lg:flex-row lg:gap-20 w-full" data-aos="fade-up">
          {statistics.map((statistic, index) => {
            return (
              <StatisticDetail
                icon={statistic.icon}
                title={statistic.title}
                desc={statistic.desc}
                key={statistic.title}
                target={statistic.target}
                ref={(el) => {
                  refs.current[index] = el!;
                }}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default StatisticContainer;
