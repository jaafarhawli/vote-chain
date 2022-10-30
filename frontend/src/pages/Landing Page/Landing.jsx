import React from 'react';
import LandingFeatures from '../../components/LandingFeatures';
import LandingHero from '../../components/LandingHero';
import LandingSteps from '../../components/LandingSteps';

const Landing = () => {
  return (
    <div>
      <LandingHero />
      <LandingSteps />
      <LandingFeatures />
    </div>
  );
}

export default Landing;
