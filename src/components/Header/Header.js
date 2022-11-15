// IMPORTING APIS
import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, Outlet } from "react-router-dom";
// IMPORTING ICONS
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate, NavLink } from "react-router-dom";
import AuthContext from "../../hooks/useAuth";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import indlogo from "../../asset/Group.png";


// LOCAL-STYLING
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(null);
  const handleClicks = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [bgClr, setBgClr] = React.useState([]);
  console.log(auth, "auth")

  const name = auth.name
  console.log(name)


  const Header = ["Home", "Projects", "Admin"];
  const role = auth.role;
  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const logoutHandler = () => {
    auth.logout();
    navigate("/login");
  };


  const AnnualHandler = (e) => {
    setBgClr({ color: "#278EF1", borderTop: "2px solid #278EF1" });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <div className={classes.root}>
      <AppBar elevation={5} style={{ backgroundColor: "#FFFFFF" }}>
        <Toolbar style={{ minHeight: "70px" }}>
          <img src={indlogo} alt="" style={{ width: "2%", height: "2%" }} />
          <h2
            style={{
              float: "left",
              marginLeft: "7px",
              fontSize: "21px",
              paddingTop: "0%",
              color: "black",
            }}
          >
            GameMon
          </h2>

          <div style={{ marginRight: "2rem" }}>

            <Button
              onClick={(e) => AnnualHandler(e)}
              sx={{ paddingTop: 0 }}
              variant="text"
              component={Link}
              to="/Home"
              color="#232323"
            >
              Home
            </Button>
            <Button
              onClick={(e) => AnnualHandler(e)}
              sx={{ paddingTop: 0 }}
              variant="text"
              component={Link}
              to="/Projects"
              color="#232323"
            >
              Projects
            </Button>
            {role === "admin" && (
              <Button
                onClick={(e) => AnnualHandler(e)}
                sx={{ paddingTop: 0 }}
                variant="text"
                component={Link}
                to="/Admin"
                color="#232323"
              >
                Admin
              </Button>
            )}
          </div>



          <p style={{ color: "black", position: "absolute", right: "13%" }}>{name}</p>

          <button
            onClick={logoutHandler}
            style={{
              fontSize: "16px",
              width: "6%",
              border: "none",
              borderRadius: "4px",
              padding: "5px",
              right: "5%",
              zIndex: "10",

              position: "absolute",

              backgroundColor: "#278EF1",
            }}
          >
            Logout
          </button>


        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Header;
