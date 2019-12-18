import React, { useState } from 'react';
import './home.scss';

const Home = () => {
  return (
    <>
      <div className="backgroundContainer" />
      <img id="logoimg" src="/images/visualyze-logo.png" />
      <p id="tagline">all your weather, in one place</p>
      <div class="button" path="/login">
        sign up today
      </div>
    </>
  );
};

export default Home;
