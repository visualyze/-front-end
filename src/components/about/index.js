import React, { useState } from 'react';
import './about.scss';

const About = () => {
  return (
    <>
      <div className="aboutSection1">
        <h1>Visualyze</h1>
        <p>
          At Visualyze we provide our customers with a way to view data from all
          over the planet, in one spot. We offer full customization for what
          data you want to see and how you want to see it.
        </p>
        <img src="/images/visualyze-mockup-2.png" />
      </div>

      <div className="aboutSection2">
        <h1>The Dashboard</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <img src="/images/visualyze-mockup-1.png" />
      </div>
    </>
  );
};

export default About;
