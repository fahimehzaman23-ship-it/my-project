import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import FeaturedProperties from '../components/sections/FeaturedProperties';
import Services from '../components/sections/Services';
import WhyChoose from '../components/sections/WhyChoose';
import Team from '../components/sections/Team';
import CtaBanner from '../components/sections/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProperties />
      <Services />
      <WhyChoose />
      <Team />
      <CtaBanner />
    </>
  );
}
