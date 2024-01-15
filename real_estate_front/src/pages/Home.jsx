import React from 'react';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import AdvantageSection from '../components/AdvantageSection';
import Footer from '../components/Footer';
import Copyright from '../components/Copyright';

function Home() {
  return (
    <>
      <Hero />
      <FeatureSection />
      <AdvantageSection />
      <div id="footer-root">
        <Footer />
      </div>
      <Copyright />
    </>
  );
}

export default Home;
