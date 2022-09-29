import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Paper from "@material-ui/core/Paper";
import { useParams, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Checkbox from "@mui/material/Checkbox";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import BatterySaverIcon from "@mui/icons-material/BatterySaver";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import LayersIcon from "@mui/icons-material/Layers";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import VibrationIcon from "@mui/icons-material/Vibration";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Routes, Route } from "react-router-dom";
import AdminMain from "./AdminMain.js";
// import MetricPower from "./metricPower.js";
// import MetricFps from "./MetricFpsMain.js";
// import MetricCpuMain from "./MetricCpuMain.js";
// import MetricGpuMain from "./MetricGpuMain.js";
// import MetricFpsMain from "./MetricFpsMain.js";
// import MetricMemory from "./MetricMemory";
// import MetricNetwork from "./MetricNetwork";
// import MetricLatency from "./MetricLatency";
// import DrawerComp from "./DrawerComp";
// import Markers from "./Markers.js";
import axios from "axios";
import auth from "../../../../hooks/useAuth";
import { Typography } from "@mui/material";
import Grid from "@material-ui/core/Grid";
// import AdvancedSearch from "./AdvancedSearch.js";

const drawerWidth = 0;

const Styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 55,
  },
  appBar: {
    marginTop: 55,
    backgroundColor: "white",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appNav: {
    display: "flex",
    color: "black",
    marginLeft: "auto",
    "& h3": {
      marginRight: 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    marginTop: 55,
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  emailicon: {
    display: "flex",
    alignItems: "left",
    flexWrap: "wrap",
    width: "50%",
  },
  userInfo: {
    display: "grid",
    gridTemplateColumns: "auto auto",
  },
  paper1: {
    padding: theme.spacing(2),
    marginTop: 20,
    color: theme.palette.text.secondary,
    height: 200,
  },
  paper2: {
    padding: theme.spacing(2),
    marginTop: 20,
    color: theme.palette.text.secondary,
    height: 130,
  },
  paper3: {
    padding: theme.spacing(2),
    marginTop: 20,
    color: theme.palette.text.secondary,
    height: 500,
  },
  paper4: {
    padding: theme.spacing(2),
    marginTop: 20,
    color: theme.palette.text.secondary,
    height: 150,
  },

  grids: {
    display: "flex",
    flexGrow: 1,
    "& div": {
      width: "100%",
    },
  },
  dialog: {
    width: 800,
    height: 900,
  },
}));

export default function AdminHeader() {
  let params = useParams();
  const classes = Styles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [openMetric, setOpenMetric] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [Firstsessiondata, SetFirstsessiondata] = React.useState([]);
  const [Secondsessiondata, SetSecondsessiondata] = React.useState([]);
  const isMatch = useMediaQuery("(min-width:400px)");
  console.log(auth.token, "sessions page");
  console.log(auth, "auth");
  const handleToggle = () => {
    setOpenMetric((prevOpen) => !prevOpen);
  };

  const handleCloseMetric = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMetric(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMetric(false);
    } else if (event.key === "Escape") {
      setOpenMetric(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openMetric);
  React.useEffect(() => {
    if (prevOpen.current === true && openMetric === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openMetric;
  }, [openMetric]);



 

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: "#278EF1" }}
      >
        <Toolbar>
          {isMatch ? (
            <>
              <Link to="/Admin" style={{ textDecoration: "none" }}>
                <h3>
                  <Grid>
                    <Button id="composition-button" style={{ color: "#FFFFFF",width:"86px" }}>User</Button>
                  </Grid>

                </h3>
              </Link>
              <Link to="/Admin/Project" style={{ textDecoration: "none" }}>
                <h3>
                  <Grid>
                    <Button id="composition-button" style={{ color: "#FFFFFF",width:"86px" }}>Project</Button>
                  </Grid>

                </h3>
              </Link>
              <Link to="/Admin" style={{ textDecoration: "none" }}>
                <h3>
                  <Grid>
                    <Button id="composition-button" style={{ color: "#FFFFFF",width:"86px" }}>License</Button>
                  </Grid>

                </h3>
              </Link>
            </>
          ) : (
            <></>
          )}

        </Toolbar>
      </AppBar>
    
      <Routes>
        <Route path="/" element={[<AdminMain open={open} />]} />
        {/* <Route
          path="/:id/advancedsearch"
          element={[<AdvancedSearch open={open} />]}
        />
        <Route path="/:id/fps" element={[<MetricFpsMain open={open} />]} />
        <Route path="/:id/power" element={[<MetricPower open={open} />]} />
        <Route path="/:id/cpu" element={[<MetricCpuMain open={open} />]} />
        <Route path="/:id/gpu" element={[<MetricGpuMain open={open} />]} />
        <Route path="/:id/memory" element={[<MetricMemory open={open} />]} />
        <Route path="/:id/network" element={[<MetricNetwork open={open} />]} />
        <Route path="/:id/latency" element={[<MetricLatency open={open} />]} />
        <Route path="/:id/markers" element={[<Markers open={open} />]} /> */}
      </Routes>
    </div>
  );
}
