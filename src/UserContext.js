import React from 'react';

const UserContext = React.createContext({
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {}
});

export default UserContext;

// const UserProvider = UserContext.Provider;
