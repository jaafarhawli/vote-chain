import React from 'react';
import LandingFeatures from './LandingFeatures';
import LandingFooter from './LandingFooter';
import LandingHero from './LandingHero';
import LandingSignup from './LandingSignup';
import LandingSteps from './LandingSteps';

const Landing = () => {
  return (
    <div>
      <LandingHero />
      <LandingSteps />
      <LandingFeatures />
      <LandingSignup />
      <LandingFooter />
    </div>
  );
}

export default Landing;
