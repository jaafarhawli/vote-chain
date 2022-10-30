import React from 'react';
import LandingFeatures from '../../components/LandingFeatures';
import LandingHero from '../../components/LandingHero';
import LandingSignup from '../../components/LandingSignup';
import LandingSteps from '../../components/LandingSteps';

const Landing = () => {
  return (
    <div>
      <LandingHero />
      <LandingSteps />
      <LandingFeatures />
      <LandingSignup />
    </div>
  );
}

export default Landing;
