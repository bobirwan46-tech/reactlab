import HeroSection from "../components/sections/HeroSection";
import LearningRoadmap from "../components/sections/LearningRoadmap";
import FeaturedLessons from "../components/sections/FeaturedLessons";
import ContactFormSection from "../components/sections/ContactFormSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LearningRoadmap />
      <FeaturedLessons />
      <ContactFormSection />
    </>
  );
}