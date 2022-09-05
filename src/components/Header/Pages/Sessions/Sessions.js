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
import MetricPeakMemory from "./MetricPeakMemory.js";
import MetricFps from "./MetricFpsMain.js";
import MetricCpuMain from "./MetricCpuMain.js";
import MetricGpuMain from "./MetricGpuMain.js";
import MetricFpsMain from "./MetricFpsMain.js";
import MetricMemory from "./MetricMemory";
import MetricUploadData from "./MetricUploadData";
import MetricDownloadData from "./MetricDownloadData";
import MetricAppPower from "./MetricAppPower";
import axios from "axios";
import auth from "../../../../hooks/useAuth";
import { Typography } from "@mui/material";
import Grid from "@material-ui/core/Grid";

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

export default function Sessionmain() {
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

  React.useEffect(() => {
    // axios
    //   .get("http://localhost:3000/getHistory", {
    //     params: {
    //       fromDate: "2022-03-21",
    //       toDate: "2022-04-26",
    //     },
    //     headers: {
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidml2ZWtAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjQxLCJpYXQiOjE2NTAyNzg1NDV9.U3RHqVAJIaQdFKLKgJRjeIDi0M4l5CWYE8WAULSnNhE",
    //       //  "Authorization": `Bearer ${auth.token}`
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data);
    //     SetFirstsessiondata(res.data.data);
    //   });
  }, []);

  React.useEffect(() => {
    // axios
    //   .get("http://localhost:3000/getSessions", {
    //     params: {
    //       deviceId: "88f16c59",
    //       userId: "2",
    //       sessionID: "2.7088912555843034",
    //     },
    //     headers: {
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidml2ZWtAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjIsImlhdCI6MTY1MDk3ODgwM30.iNJ7s1Z56dMsJl2rI-v0_xiFNdyD4ieK1X1MzrxQNI0",
    //       //  "Authorization": `Bearer ${auth.token}`
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data);
    //     SetSecondsessiondata(res.data.data);
    //   });
  }, []);

  // React.useEffect(() => {
  //   axios.get("http://35.83.46.51:3000/getHistory", {
  //     params: {
  //       fromDate: "2022-03-21",
  //       toDate: "2022-03-30"
  //     },
  //     headers: {
  //       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicmFodWxAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjI0LCJpYXQiOjE2NDg2MzA1Mzd9.UlQqc3DsAiv8l2_y-LnNTPTHrwb1BcAp75LWlC9Md4c"
  //       //  "Authorization": `Bearer ${auth.token}`
  //     }
  //   }).then((res) => {
  //     console.log(res)
  //     console.log(res.data)
  //     Setsessiondata(res.data.data)
  //   })
  // }, [])

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
      {/* <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: "#278EF1" }}
      >
        <Toolbar>
          {isMatch ? (
            <>
              <Link to="/Sessions/:id/" style={{ textDecoration: "none" }}>
                <h3>
                  <Grid container justify="flex-end">
                    <Button id="composition-button" style={{ color: "#FFFFFF" }}>Summary</Button>
                  </Grid>

                </h3>
              </Link>
              <h3>
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={openMetric ? "composition-menu" : undefined}
                  aria-expanded={openMetric ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  style={{ color: "#FFFFFF" }}
                >
                  Metrices
                </Button>
              </h3>
              <Popper
                open={openMetric}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseMetric}>
                        <MenuList
                          autoFocusItem={openMetric}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          {console.log(params)}
                          <Link
                            to="/Sessions/:id/fps"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem onClick={handleClose}>
                              <LayersIcon sx={{ mr: 2 }} />
                              FPS
                            </MenuItem>
                          </Link>

                          <Link
                            to="/Sessions/:id/power"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem onClick={handleClose}>
                              <BatterySaverIcon sx={{ mr: 2 }} />
                              Power
                            </MenuItem>
                          </Link>

                          <Link
                            to="/Sessions/:id/cpu"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem onClick={handleClose}>
                              <SignalCellularAltIcon sx={{ mr: 2 }} />
                              CPU
                            </MenuItem>
                          </Link>

                          <Link
                            to="/Sessions/:id/gpu"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem onClick={handleClose}>
                              <DeveloperBoardIcon sx={{ mr: 2 }} />
                              GPU
                            </MenuItem>
                          </Link>

                          <Link
                            to="/Sessions/:id/memory"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem onClick={handleClose}>
                              <SignalCellularAltIcon sx={{ mr: 2 }} />
                              Memory
                            </MenuItem>
                          </Link>

                          <Link
                            to="/Sessions/:id/MetricUploadData"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem onClick={handleClose}>
                              <WifiIcon sx={{ mr: 2 }} />
                              Upload
                            </MenuItem>
                          </Link>

                          <Link
                            to="/Sessions/:id/MetricDownloadData"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem onClick={handleClose}>
                              <VibrationIcon sx={{ mr: 2 }} />
                              Download
                            </MenuItem>
                          </Link>
                          <Link
                            to="/Sessions/:id/MetricAppPower"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem onClick={handleClose}>
                              <VibrationIcon sx={{ mr: 2 }} />
                              AppPower
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <h3>
                <Button id="composition-button">All Metrices</Button>
              </h3>
              <Link
                to="/Sessions/:id/markers"
                style={{ textDecoration: "none" }}
              >
                <h3>
                  <Button id="composition-button">Markers</Button>
                </h3>
              </Link>

              <h3>
                <MoreVertIcon />
              </h3>
            </>
          ) : (
            <DrawerComp />
          )}

        </Toolbar>
      </AppBar> */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Grid container justify="center">
            <Button>Search</Button>

            <Link
              to="/Sessions/:id/advancedsearch"
              style={{ textDecoration: "none" }}
            >
              <Button>Advanced Search</Button>
            </Link>
          </Grid>

          {console.log(Firstsessiondata)}
          {Firstsessiondata.map((data) => (
            <>
              <Link to={`/Sessions/:id`} style={{ textDecoration: "none" }}>
                <ListItem button key={data.id} sx={{ paddingTop: 0 }}>
                  <ListItemIcon>
                    <Checkbox edge="start" />
                    <ListItemIcon>
                      <PhoneIphoneIcon sx={{ fontSize: 55 }} />
                    </ListItemIcon>


                    <ListItemText
                      primary={data.session_id}
                      secondary={data.version_name}
                    ></ListItemText>

                  </ListItemIcon>
                </ListItem>
              </Link>
            </>
          ))}

          {console.log(Secondsessiondata)}
          {Secondsessiondata.map((data) => (
            <>
              <Link to={`/Sessions/:id`} style={{ textDecoration: "none" }}>
                <ListItem button key={data.id} sx={{ paddingTop: 0 }}>
                  <ListItemIcon>
                    <Checkbox edge="start" />
                    <ListItemIcon>
                      <PhoneIphoneIcon sx={{ fontSize: 55 }} />
                    </ListItemIcon>

                    <ListItemText
                      primary={data.session_id}
                      secondary={data.version_name}
                    ></ListItemText>

                  </ListItemIcon>
                </ListItem>
              </Link>
            </>
          ))}

          <Divider />
        </List>
      </Drawer>
      <Routes>
        <Route path="/:id/fps" element={[<MetricFpsMain open={open} />]} />
        <Route path="/:id/power" element={[<MetricPeakMemory open={open} />]} />
        <Route path="/:id/cpu" element={[<MetricCpuMain open={open} />]} />
        <Route path="/:id/gpu" element={[<MetricGpuMain open={open} />]} />
        <Route path="/:id/memory" element={[<MetricMemory open={open} />]} />
        <Route path="/:id/MetricUploadData" element={[<MetricUploadData open={open} />]} />
        <Route path="/:id/MetricDownloadData" element={[<MetricDownloadData open={open} />]} />
        <Route path="/:id/MetricAppPower" element={[<MetricAppPower open={open} />]} />
      </Routes>
    </div>
  );
}
