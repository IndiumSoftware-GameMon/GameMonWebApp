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
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { purple } from "@mui/material/colors";
// IMPORTING ICONS
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate, NavLink } from "react-router-dom";
import AuthContext from "../../hooks/useAuth";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import { grey } from "@material-ui/core/colors";
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
  const [anchor, setAnchor] = React.useState(null)
  const handleClicks = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = React.useState([]);
  const [bgClr, setBgClr] = React.useState([]);
  // const Header = ["Home", "Projects", "Apps", "Devices", "Sessions", "Analysis"];

  const Header = ["Home", "Projects"];

  // const Header = ["Home", "Sessions"];

  console.log(Header)
  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const logoutHandler = () => {
    auth.logout();
    navigate("/login");
  };

  const buttonTheme = createMuiTheme({
    palette: {
      primary: {
        main: purple[50],
      },
    },
  });

  const AnnualHandler = (e, data, id) => {
    setBgClr({ color: "#278EF1", borderTop: "2px solid #278EF1" });
    setSelectedPage(id)
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <div className={classes.root}>


      <AppBar elevation={5} style={{ backgroundColor: "#FFFFFF" }}>
        <Toolbar style={{ minHeight: "70px" }}>

          <img
            src={indlogo}
            alt=""
            style={{ width: "2%", height: "2%" }}
          />
          <h2
            style={{
              float: "left",
              marginLeft: "7px",
              fontSize: "21px",
              paddingTop: "0%",
              color: "black"
            }}
          >
            GameMon
          </h2>
          {isMobile ? (
            <>
              <IconButton
                color="#232323"
                className={classes.menuButton}
                edge="start"
                aria-label="menu"
                onClick={handleMenu}
                float="left"
              >
                <MenuIcon style={{ color: "white" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchor}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                KeepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
              >
                <MenuItem
                  onClick={() => setAnchor(null)}
                  component={Link}
                  to="/Home"
                >
                  <Typography> Home</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => setAnchor(null)}
                  component={Link}
                  to="/Projects"
                >
                  <Typography variant="h6"> Projects </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => setAnchor(null)}
                  component={Link}
                  to="/Apps/:id"
                >
                  <Typography variant="h6"> Apps</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => setAnchor(null)}
                  component={NavLink}
                  to="/getdevices"
                >
                  <Typography variant="h6"> Devices </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => setAnchor(null)}
                  component={Link}
                  to="/Sessions"
                >
                  <Typography variant="h6"> Sessions </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => setAnchor(null)}
                  component={Link}
                  to="/Analysis"
                >
                  <Typography variant="h6"> Analysis </Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div style={{ marginRight: "2rem" }}>

              {Header.map((data, i) => {
                return (
                  <Button key={i} onClick={(e) => AnnualHandler(e, data, i)} sx={{ paddingTop: 0 }} style={{ color: selectedPage === i ? "#278ef1" : "", borderTop: selectedPage === i ? "2px solid #278ef1" : "", borderRadius: "0px" }}
                    variant="text"
                    component={Link}
                    to={`${data}`}
                    color="#232323"
                  // onClick={AnnualHandler} style={bgClr}
                  >
                    {data}
                  </Button>)
              }
                // {console.log(data, "working")}



                // <Button
                //   variant="text"
                //   component={Link}
                //   to="/Home"
                //   color="#232323"
                //   onClick={AnnualHandler} style={bgClr}
                // >
                //   {data}
                // </Button>


              )

              }

              {/* <ThemeProvider theme={buttonTheme}>
                <Button
                  variant="text"
                  component={Link}
                  to="/Projects"
                  color="#232323"
                  style={{ fontSize: "16px" }}
                >
                  Projects
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={buttonTheme}>
                <Button
                  variant="text"
                  component={Link}
                  to="/Apps"
                  color="#232323"
                  style={{ fontSize: "16px" }}
                >
                  Apps
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={buttonTheme}>
                <Button
                  variant="text"
                  component={Link}
                  to="/getdevices"
                  color="#232323"
                  style={{ fontSize: "16px" }}
                >
                  Devices
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={buttonTheme}>
                <Button
                  variant="text"
                  component={Link}
                  to="/Sessions"
                  color="#232323"
                  style={{ fontSize: "16px" }}
                >
                  Sessions
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={buttonTheme}>
                <Button
                  variant="text"
                  component={Link}
                  to="/Analysis"
                  color="#232323"
                  style={{ fontSize: "16px" }}
                >
                  Analysis
                </Button>
              </ThemeProvider> */}


            </div>
          )
          }

          <Typography
            variant="h7"
            component="p"
            color="indigo"
            className={classes.title}
          >
            <IconButton
              onMouseEnter={handleClicks}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ bgcolor: blue[500], ml: 158 }}></Avatar>
            </IconButton>
            <button
              onClick={logoutHandler}
              style={{ fontSize: "16px", width: "86px", marginRight: "-13px", marginTop: "-33px", border: "none", cursor: "pointer",backgroundColor:"transparent" }}
            >
              Logout
            </button>
          </Typography>





        </Toolbar >
      </AppBar >


      <Outlet />
    </div >
  );
};

export default Header;
