import React, { useState } from 'react';

const Login = () => {
  return (
    <>
      <form>
        <input type="text" placeholder="Username" value="user" />
        <input type="text" placeholder="Password" value="password" />
      </form>
    </>
  );
};

export default Login;
