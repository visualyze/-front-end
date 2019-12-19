import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { When } from '../conditionals.js';
import './navbar.scss';
import { AppContext } from '../../appContext';

const Navbar = () => {
  const [state, setState] = useContext(AppContext);
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <nav id="navbar">
        <ul>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <When condition={!state.user}>
              <Link className="link" to="/login">
                Login
              </Link>
            </When>
            <When condition={state.user}>
              <Link className="link" to="/login">
                Logout
              </Link>
            </When>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
