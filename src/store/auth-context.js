import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, expirationTime) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const intialExpirationTime = localStorage.getItem('expirationTime')
  const [token, setToken] = useState(initialToken);
  const[expirationTime, setExpirationTime]=useState(intialExpirationTime)

  const userIsLoggedIn = !!token;

  useEffect (()=> {
    if (token && expirationTime){
      const remainingTime = new Date(expirationTime) - new Date();
      if(remainingTime<=0) {
        logoutHandler();
      }else{
        const logoutTimer = setTimeout(logoutHandler, remainingTime);
        return () => clearTimeout(logoutTimer);
      }
    }
  },[token, expirationTime]);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);

    if(expirationTime) {
      setExpirationTime(expirationTime);
      localStorage.setItem("expirationTime", expirationTime);
    }
  };

  const logoutHandler = () => { 
    setToken(null);
    setExpirationTime(null)
    localStorage.removeItem('token');
    localStorage.removeItem("expirationTime");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
