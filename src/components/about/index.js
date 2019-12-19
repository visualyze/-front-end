import React, { useState } from 'react';
import './about.scss';

const About = () => {
  return (
    <>
      <div className="aboutSection1">
        <h1>Who We Are</h1>
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
          After signing up, the dashboard automatically saves to your account.
          This allows you to come back whenever to view all the data they want.
          They are able to customize it with dozens of different widgets,
          allowing for thousands of unique layouts. Drag and drop to resize.
          Make your personal dashboard today!
        </p>
        <img src="/images/visualyze-mockup-1.png" />
      </div>
    </>
  );
};

export default About;
