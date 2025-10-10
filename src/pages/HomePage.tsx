import AboutSection from "../components/commons/molecules/AboutSection/AboutSection";
import PSBSection from "../components/commons/molecules/PSBSection/PSBSection";
import RecentNewsSection from "../components/commons/molecules/RecentNewsSection/RecentNewsSection";
import StatisticContainer from "../components/commons/molecules/StatisticContainer/StatisticContainer";

const HomePage = () => {
  return (
    <>
      <StatisticContainer />
      <AboutSection />
      <PSBSection />
      <RecentNewsSection />
    </>
  );
};

export default HomePage;
