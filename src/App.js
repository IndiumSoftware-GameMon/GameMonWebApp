import Header from "./components/Header/Header";
import Home from "./components/Header/Pages/Home/Home";
import Admin from "./components/Header/Pages/Admin/Admin";
import Projects from "./components/Header/Pages/Projects/Projects";
import Sessionmain from "./components/Header/Pages/Sessions/Sessions";
import Analysis from "./components/Header/Pages/Analysis/Analysis";
import SignUp from "./components/SignUp/SignUp";
import { useContext } from "react";
import AuthContext from "./hooks/useAuth.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";


function App() {
  const auth = useContext(AuthContext);
  const isLoggedIn = auth.isLoggedIn;
  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/login" element={[<Login />]} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </>
        )}
        {!isLoggedIn && <Route path="/SignUp" element={[<SignUp />]} />}
        {isLoggedIn && (
          <Route path="/" element={[<Header />]}>
            <Route exact path="/Home" element={<Home />} />
            <Route path="/" element={<Navigate replace to="/Home" />} />
            <Route exact path="/Admin" element={<Admin />} />
            <Route exact path="/Projects" element={<Projects />} />
            <Route path="/Admin/*" element={[<Admin />]} />
            <Route path="/sessions/*" element={[<Sessionmain />]} />
            <Route exact path="/Analysis" element={<Analysis />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;