import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
  userId: () => { }
});

export const AuthContextProvider = (props) => {
  // const initialToken = sessionStorage.getItem("token")
  const initialToken = sessionStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [userInfo, setUserInfo] = useState({});
  const [role, setRole] = useState([]);
  const [id, setId] = useState(null)

  console.log(userInfo, "auth");
  const userIsLoggedIn = !!token;

  const loginHandler = (data) => {
    setUserInfo(data);
    setToken(data.token);
    setRole(data.role)
    setId(data.id)
    console.log(data, "userInfo")
    console.log(token)
    // sessionStorage.setItem("token", userInfo.token);
    sessionStorage.setItem("token", data.token)

  };
  const userIdHandler = (id) => {
    setId(id)
  }

  console.log(userInfo.token)
  console.log("hello world")

  const logoutHandler = () => {
    setToken(null);
    // sessionStorage.removeItem("token");
    // sessionStorage.removeItem("sessiondata")

    sessionStorage.removeItem("token")

  };
  const usersInfo = (data) => {
    setUserInfo(data);

  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userInfo: userInfo,
    role: role,
    id: id,
    login: loginHandler,
    logout: logoutHandler,
    settinguserInfo: usersInfo,
    userId: userIdHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
