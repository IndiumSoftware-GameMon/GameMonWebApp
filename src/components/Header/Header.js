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
                  to="/Admin/:id"
                >
                  <Typography variant="h6"> Admin</Typography>
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
          )}

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
              <Avatar sx={{ bgcolor: blue[500], ml: 220 }}></Avatar>
            </IconButton>
            <button
              onClick={logoutHandler}
              style={{
                fontSize: "16px",
                width: "86px",
                marginRight: "-13px",
                marginTop: "-33px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
            >
              Logout
            </button>
          </Typography>
        </Toolbar>
      </AppBar>

      <Outlet />
    </div>
  );
};

export default Header;
