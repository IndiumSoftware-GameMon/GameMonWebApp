import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
});

export const AuthContextProvider = (props) => {
  // const initialToken = sessionStorage.getItem("token")
  const initialToken = sessionStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [userInfo, setUserInfo] = useState("");

  console.log(userInfo, "auth");
  const userIsLoggedIn = !!token;

  const loginHandler = () => {
    setToken(userInfo.token);
    console.log(token)
    // sessionStorage.setItem("token", userInfo.token);
    sessionStorage.setItem("token", userInfo.token)
  };

  console.log(userInfo.token)
  console.log("hello world")

  const logoutHandler = () => {
    setToken(null);
    // sessionStorage.removeItem("token");
    sessionStorage.removeItem("token")
  };
  const usersInfo = (data) => {
    setUserInfo(data);

  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userInfo: userInfo,
    login: loginHandler,
    logout: logoutHandler,
    settinguserInfo: usersInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
