import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  role: "",
  name: "",
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
  userId: () => { },
  compDataHandler: () => { },
  compData: ""
});

export const AuthContextProvider = (props) => {
  const initialToken = sessionStorage.getItem("token");
  const initialRole = sessionStorage.getItem("role");
  const [token, setToken] = useState(initialToken);
  const [userInfo, setUserInfo] = useState({});
  const [role, setRole] = useState(initialRole);
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [compData, setCompData] = useState(null)

  const userIsLoggedIn = !!token;

  const loginHandler = (data) => {
    setUserInfo(data);
    setToken(data.token);
    setRole(data.role)
    setId(data.id)
    setName(data.user_Name)
    sessionStorage.setItem("token", data.token)
    sessionStorage.setItem("role", data.role)

  };

  const compDataHandler = (data) => {
    setCompData(data)
  }
  const userIdHandler = (id) => {
    setId(id)
  }


  const logoutHandler = () => {
    sessionStorage.removeItem("sessiondata")
    setToken(null);
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
    compData: compData,
    login: loginHandler,
    logout: logoutHandler,
    settinguserInfo: usersInfo,
    userId: userIdHandler,
    name: name,
    compDataHandler: compDataHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
