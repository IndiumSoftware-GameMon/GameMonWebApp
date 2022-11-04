import React, { useContext, useState,useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import axios from "../../../../axios/index";
import MetricUsage from "../../Pages/Sessions/MetricUsage";
import AuthContext from "../../../../hooks/useAuth";
import profile from "../../../../asset/profile.png";
import time from "../../../../asset/time.png";
import calender from "../../../../asset/calender.png";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Typography } from "@mui/material";
import downarrowicon1 from "../../../../asset/downarrowicon1.png";
import calender1 from "../../../../asset/calender1.png";
import clock1 from "../../../../asset/clock1.png";
import smartphone1 from "../../../../asset/smartphone1.png";
import "./filter.css";
import "./Home.css";
import { StylesProvider } from "@material-ui/core/styles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArticleIcon from "@mui/icons-material/Article";
import DatelistenForOutsideClick from './listenForOutsideClicks'
import DevicelistenForOutsideClick from './listenForOutsideClicks'
import UserlistenForOutsideClick from './listenForOutsideClicks'
import ApplicationlistenForOutsideClick from './listenForOutsideClicks'
import SessionslistenForOutsideClick from './listenForOutsideClicks'

const drawerWidth = 0;

const Styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 55,
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    height: 615,
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
      marginTop: "10px",
    },
  },
}));

var mapObj = {
  com: " ",
  ".oneplus": " ",
  ".qualcomm": " ",
  ".android": " ",
  ".display": " ",
  ".google": " ",
  ".tools": " ",
  ".internal": " ",
  ".emulation": " ",
  ".network": " ",
  ".dragonfistztamilan": " ",
};

export default function Home(props) {
  const classes = Styles();
  const auth = useContext(AuthContext);
  const role = auth.role;
  const uid = auth.id

  const [Firstsessiondata, SetFirstsessiondata] = React.useState([]);
  const [Secondsessiondata, SetSecondsessiondata] = React.useState([]);
  const [selecteditem, setSelecteditem] = React.useState("yellow");
  const [ApplicationActive, setApplicationActive] = useState(false);
  const [DevicesActive, setDevicesActive] = useState(false);
  const [UserActive, setUserActive] = useState(false);
  const [SessionsActive, setSessionsActive] = useState(false);
  const [DateActive, setDateActive] = useState(false);
  const [User, setUser] = useState(null);
  const [application, setApplication] = useState(null);
  const [device, setDevices] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [date, setDate] = useState("Date");
  const [FirstUserdata, SetFirstUserdata] = React.useState([]);
  const [Firstdevicedata, SetFirstdevicedata] = React.useState([]);
  const [Seconddevicedata, SetSeconddevicedata] = React.useState([]);
  const [selectedUseritem, setSelectedUseritem] = React.useState("yellow");
  const [selectedDeviceitem, setSelectedDeviceitem] = React.useState("yellow");
  const [selectedappitem, setSelectedappitem] = React.useState("yellow");
  const [selectedDevice, setSelectedDevice] = React.useState("");
  const [selectedsessionitem, setSelectedApplicationitem] = React.useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [userId, setUserId] = useState(id)

  // Hide Dropdown on Outside Click
  const DatemenuRef = useRef(null)
  const [Datelistening, setDateListening] = useState(false)
  React.useEffect(DatelistenForOutsideClick(Datelistening, setDateListening, DatemenuRef, setDateActive))

  const DevicemenuRef = useRef(null)
  const [Devicelistening, setDeviceListening] = useState(false)
  useEffect(DevicelistenForOutsideClick(Devicelistening, setDeviceListening, DevicemenuRef, setDevicesActive))

  const UsermenuRef = useRef(null)
  const [Userlistening, setUserListening] = useState(false)
  useEffect(UserlistenForOutsideClick(Userlistening, setUserListening, UsermenuRef, setUserActive))

  const ApplicationmenuRef = useRef(null)
  const [Applicationlistening, setApplicationListening] = useState(false)
  useEffect(ApplicationlistenForOutsideClick(Applicationlistening, setApplicationListening, ApplicationmenuRef, setApplicationActive))

  const SessionsmenuRef = useRef(null)
  const [Sessionslistening, setSessionsListening] = useState(false)
  useEffect(SessionslistenForOutsideClick(Sessionslistening, setSessionsListening, SessionsmenuRef, setSessionsActive))

  React.useEffect(() => {
    let isMount = true;
    axios
      .get("/users", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        if (isMount) {
          SetFirstUserdata(res.data.data);
        }
        // global.device_name = res.data.device_name;
      })
      .catch((err) => {
      });
    return () => {
      isMount = false;
    };
  }, []);

  React.useEffect(() => {
    let isMount = true;
    axios
      .get("/devices", {
        params: {
          userId: uid,
          fromDate: startDate,
          toDate: endDate,
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        if (isMount) {
          SetFirstdevicedata(res.data.data);
        }
        global.device_name = res.data.device_name;
      })
      .catch((err) => {
      });
    return () => {
      isMount = false;
    };
  }, [startDate, endDate]);

  // window.sessionStorage.removeItem("sessiondata",JSON.stringify(valuesToSave))

  function singleUserItem(e, data, id) {
    setSelectedUseritem(id);
    axios
      .get("/users", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
      });
  }

  function singleDeviceItem(e, data, id) {
    setSelectedDeviceitem(id);
    axios
      .get("/applications", {
        params: {
          deviceId: data.device_id,
          userId: uid,
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        SetSeconddevicedata(res.data.data);
      });
  }

  function singleApplicationItem(e, data, id) {
    setSelectedApplicationitem(id);
    axios
      .get("/allSessions", {
        params: {
          DeviceId: data.device_id,
          userId: uid,
          appName: data.app_name,
          fromDate: startDate,
          toDate: endDate,
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        SetFirstsessiondata(res.data.data);
      });
  }

  function singleSessionItem(e, data, id) {
    setSelecteditem(id);
    axios
      .get("/sessionDetails", {
        params: {
          DeviceId: data.device_id,
          appName: data.app_name,
          userId: uid,
          sessionId: data.session_id,
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        SetSecondsessiondata(res.data.data[0]);
        global.sessionname = data.sessionname;
        global.deviceid = data.device_id;
        global.userid = data.user_id;
        global.appname = data.app_name;
        global.sessionid = data.session_id;

        setTimeout(() => {
          setSelectedDevice(Secondsessiondata.sessionname);
        }, 200);
      });
  }

   React.useEffect(() => {
    const sessionData = window.sessionStorage.getItem("sessiondata");
    const savedValues = JSON.parse(sessionData);
    // updateSessionValues(savedValues.Firstdevicedata);
    SetFirstdevicedata(savedValues?.Firstdevicedata);
    SetSeconddevicedata(savedValues?.Seconddevicedata);
    SetFirstsessiondata(savedValues?.Firstsessiondata)
    SetSecondsessiondata(savedValues?.Secondsessiondata)
    setStartDate(savedValues?.startDate)
    setEndDate(savedValues?.endDate)
    setDevices(savedValues?.device)
    setApplication(savedValues?.application)
    setSessions(savedValues?.sessions)
    setUser(savedValues?.User)
  }, []);

  React.useEffect(() => {
    const valuesToSave = { Firstdevicedata, Seconddevicedata, Firstsessiondata, Secondsessiondata,date,device,application,sessions,startDate,endDate,User }
    window.sessionStorage.setItem("sessiondata", JSON.stringify(valuesToSave))

  })

  return (
    <>
      <main className={clsx(classes.content)}>
        <div
          style={{
            display: "flex",
            borderRadius: "14px",
            alignItems: "center",
            marginLeft: "9%",
            marginTop: "5.5%",
          }}
        >
          {role === "admin" && (
            <div
              className="dropdown"
              style={{
                borderRadius: "20px 0 0 20px",
                border: "1px solid white",
              }}
              ref={UsermenuRef}
            >
              <div
                onClick={(e) => {
                  setUserActive(!UserActive);
                }}
                className="dropdown-btn-user"
              >
                <img
                  src={smartphone1}
                  alt="smartphone1"
                  style={{ marginRight: "-25px" }}
                />
                {User ? User : "User"}
                <img
                  src={downarrowicon1}
                  alt="downarrowicon1"
                  style={{ marginRight: "10px" }}
                />
              </div>
              <div
                className="dropdown-content"
                style={{ display: UserActive ? "block" : "none" }}
              >

                {FirstUserdata &&
                  FirstUserdata.map((data, i) => (
                    <div
                      onClick={(e) => {
                        setUser(e.target.textContent);
                        auth.userId(data.id)
                        setUserActive(!UserActive);
                        singleUserItem(e, data, i);
                      }}
                      style={{
                        background: selectedDeviceitem === i ? "#278ef1" : "",
                        color: selectedDeviceitem === i ? "" : "black",
                      }}
                      className="item"
                    >
                      {data.name}
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div
            className="dropdown"
            style={{ borderRadius: "0 20px 20px 0", border: "1px solid white" }}
            ref={DatemenuRef}
          >
            <div
              onClick={(e) => {
                setDateActive(!DateActive);
              }}
              className="dropdown-btn"
              style={{
                borderRadius: "20px 0 0 20px",
                border: "1px solid white",
                fontSize: "15px",
                padding: "0px",
              }}
            >
              <img
                src={calender1}
                alt="calender1"
                style={{ marginRight: "-5px" }}
              />
              {startDate ? (
                <p style={{ fontSize: "13px" }}>
                  {startDate} ↔ {endDate}
                </p>
              ) : (
                <p style={{ fontSize: "13px" }}>{date}</p>
              )}
              <span
                className={DateActive ? "fas fa-caret-up" : "fas fa-caret-down"}
              />
            </div>

            <div
              className="dropdown-content-date"
              style={{ display: DateActive ? "block" : "none" }}
            >
              <div
                onClick={(e) => {
                  setDate(e.target.textContent);
                  setDateActive(!DateActive);
                }}
                className="item"
              >
                {/* {data.device_name} */}
              </div>

              <StylesProvider injectFirst>
                <div className="App">
                  <div style={{ height: 450 }}>
                    <br></br>
                    <TextField
                      id="date"
                      label="From"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        style: {
                          padding: 8.5,
                        },
                      }}
                    />
                    <br></br>
                    <br></br>

                    <TextField
                      id="date"
                      label="To"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        style: {
                          padding: 8.5,
                        },
                      }}
                    />
                  </div>
                </div>
              </StylesProvider>
            </div>
          </div>

          <div
            className="dropdown"
            style={{ borderRadius: "20px 0 0 20px", border: "1px solid white" }}
            ref={DevicemenuRef}
          >
            <div
              onClick={(e) => {
                setDevicesActive(!DevicesActive);
              }}
              className="dropdown-btn"
            >
              <img
                src={smartphone1}
                alt="smartphone1"
                style={{ marginRight: "-25px" }}
              />
              {device ? device : "device"}
              <img
                src={downarrowicon1}
                alt="downarrowicon1"
                style={{ marginRight: "10px" }}
              />
            </div>
            <div
              className="dropdown-content"
              style={{ display: DevicesActive ? "block" : "none" }}
            >
              {Firstdevicedata &&
                Firstdevicedata.map((data, i) => (
                  <div
                    onClick={(e) => {
                      setDevices(e.target.textContent);
                      setDevicesActive(!DevicesActive);
                      singleDeviceItem(e, data, i);
                    }}
                    style={{
                      background: selectedDeviceitem === i ? "#278ef1" : "",
                      color: selectedDeviceitem === i ? "" : "black",
                    }}
                    className="item"
                  >
                    {data.device_name}
                  </div>
                ))}
            </div>
          </div>

          <div className="dropdown"
            ref={ApplicationmenuRef}>
            <div
              onClick={(e) => {
                setApplicationActive(!ApplicationActive);
              }}
              className="dropdown-btn"
            >
              {application ? application : "application"}
              <img
                src={downarrowicon1}
                alt="downarrowicon1"
                style={{ marginRight: "10px" }}
              />
            </div>
            <div
              className="dropdown-content"
              style={{ display: ApplicationActive ? "block" : "none" }}
            >
              {Seconddevicedata?.map((data, i) => (
                <div
                  onClick={(e) => {
                    setApplication(e.target.textContent);
                    setApplicationActive(!ApplicationActive);
                    singleApplicationItem(e, data, i);
                  }}
                  style={{
                    background: selectedappitem === i ? "#278ef1" : "",
                    color: selectedappitem === i ? "" : "black",
                  }}
                  className="item"
                >
                  {data.app_name.replace(
                    /com|.qualcomm|.oneplus|.android|.display|.google|.tools|.internal|.emulation|.dragonfistztamilan|.network/gi,
                    function (matched) {
                      return mapObj[matched];
                    }
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="dropdown" 
            ref={SessionsmenuRef}>
            <div
              onClick={(e) => {
                setSessionsActive(!SessionsActive);
              }}
              className="dropdown-btn"
              style={{
                borderRadius: "0 20px 20px 0",
                border: "1px solid white",
              }}
            >
              <img src={clock1} alt="clock1" style={{ marginRight: "-2px" }} />
              {sessions ? sessions : "sessions"}

              <img
                src={downarrowicon1}
                alt="downarrowicon1"
                style={{ marginRight: "10px" }}
              />
            </div>
            <div
              className="dropdown-content"
              style={{ display: SessionsActive ? "block" : "none" }}
            >
              {Firstsessiondata?.map((data, i) => (
                <div
                  key={i}
                  onClick={(e) => {
                    setSessions(e.target.textContent);
                    setSessionsActive(!SessionsActive);
                    singleSessionItem(e, data, i);
                  }}
                  style={{
                    background: selecteditem === i ? "#278ef1" : "",
                    color: selecteditem === i ? "" : "black",
                  }}
                  className="item"
                >
                  {data.sessionname != null
                    ? data.sessionname
                    : "no session name"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={classes.grids}>
          <div>
            <Grid container spacing={0} direction="column">
              <Grid item xs={10} md={10}>
                <>
                  <div className="device-info-style-list">
                    <List
                      style={{
                        maxHeight: "94%",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      }}
                    >
                      <div
                        style={{
                          color: "#FFFFFF",
                          background: "#278EF1",
                          borderRadius: "8px",
                        }}
                      >
                        <ListItem button>
                          <PhoneAndroidIcon sx={{ fontSize: 55 }} />

                          <ListItemText
                            primary={
                              <Typography
                                type="body2"
                                style={{
                                  color: "white",
                                  marginLeft: "15px",
                                }}
                              >
                                {Secondsessiondata?.sessionname}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                type="body2"
                                style={{
                                  color: "white",
                                  marginLeft: "15px",
                                }}
                              >
                                Session Name
                              </Typography>
                            }
                          ></ListItemText>
                        </ListItem>
                      </div>
                    </List>
                  </div>

                  <div className="device-info-style-list">
                    <List
                      style={{
                        maxHeight: "94%",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      }}
                    >
                      <div
                        style={{
                          color: "#FFFFFF",
                          background: "#278EF1",
                          borderRadius: "8px",
                        }}
                      >
                        <ListItem button>
                          <ArticleIcon sx={{ fontSize: 40 }} />

                          <ListItemText
                            primary={
                              <Typography
                                type="body2"
                                style={{
                                  color: "white",
                                  marginLeft: "15px",
                                }}
                              >
                                {Secondsessiondata?.version_name}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                type="body2"
                                style={{
                                  color: "white",
                                  marginLeft: "15px",
                                }}
                              >
                                Version
                              </Typography>
                            }
                          ></ListItemText>
                        </ListItem>
                      </div>
                    </List>
                  </div>

                  <div className="device-info-style-list">
                    <List
                      style={{
                        maxHeight: "94%",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      }}
                    >
                      <div
                        style={{
                          color: "#FFFFFF",
                          background: "#278EF1",
                          borderRadius: "8px",
                        }}
                      >
                        <ListItem
                          button
                          onClick={() => {
                            if (Secondsessiondata.session_id !== "") {
                              window.open(
                                `http://44.226.139.67:3000/getReport?sessionID=${Secondsessiondata.session_id}`
                              );
                            }
                          }}
                        >
                          <FileDownloadIcon sx={{ fontSize: 30 }} />

                          <ListItemText
                            style={{
                              color: "white",
                              marginLeft: "22px",
                            }}
                          >
                            {" "}
                            Download the report
                          </ListItemText>
                        </ListItem>
                      </div>
                    </List>
                  </div>
                </>
              </Grid>
            </Grid>
          </div>

          <div>
            <Grid container spacing={0} direction="column">
              <Grid item xs={10} md={10}>
                <>
                  <div className="system-information">
                    <div className="app-info-sub">
                      <h2 className="device-para-style">System Information</h2>
                    </div>
                    <Divider />
                    <div className="app-info-sub">
                      <div>
                        <img src={profile} alt=" " className="app-info-image" />
                      </div>
                      <div className="device-info-text">
                        <p
                          style={{
                            marginTop: "-40px",
                            marginLeft: "125px",
                            fontWeight: "lighter",
                          }}
                        >
                          User
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: "300",
                            marginTop: "-8px",
                            marginLeft: "125px",
                            color: "#278EF1",
                          }}
                        >
                          {Secondsessiondata?.email}
                        </p>
                      </div>
                    </div>
                    <Divider />
                    <div className="app-info-sub">
                      <div>
                        <img src={time} alt=" " className="app-info-image" />
                      </div>
                      <div className="device-info-text">
                        <p
                          style={{
                            marginTop: "-40px",
                            marginLeft: "125px",
                            fontWeight: "lighter",
                          }}
                        >
                          Session Duration
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: "300",
                            marginTop: "-8px",
                            marginLeft: "125px",
                            color: "#278EF1",
                          }}
                        >
                          {Secondsessiondata?.total_duration}
                        </p>
                      </div>
                    </div>
                    <Divider />
                    <div className="app-info-sub">
                      <div>
                        <img
                          src={calender}
                          alt=" "
                          className="app-info-image"
                        />
                      </div>
                      <div className="device-info-text">
                        <p
                          style={{
                            marginTop: "-40px",
                            marginLeft: "125px",
                            fontWeight: "lighter",
                          }}
                        >
                          Session Date
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: "300",
                            marginTop: "-8px",
                            marginLeft: "125px",
                            color: "#278EF1",
                          }}
                        >
                          {Secondsessiondata?.created_at}
                        </p>
                      </div>
                    </div>

                    {/* <Divider />
                    <div className="app-info-sub">
                      <div>
                        <img
                          src={location1}
                          alt=" "
                          className="app-info-image"
                        />
                      </div>
                      <div className="device-info-text">
                        <p
                          style={{
                            marginTop: "-40px",
                            marginLeft: "125px",
                            fontWeight: "lighter",
                          }}
                        >
                          Session Name
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: "300",
                            marginTop: "-8px",
                            marginLeft: "125px",
                            color: "#278EF1",
                          }}
                        >
                          {Secondsessiondata.sessionname}
                        </p>
                      </div>
                    </div> */}
                  </div>
                </>
              </Grid>
            </Grid>
          </div>

          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <Grid container spacing={3}>
            <Grid item xs={6} md={6}>
              <Link to="/Sessions/:id/cpu" style={{ textDecoration: "none" }}>
                <MetricUsage
                  value={
                    Secondsessiondata?.cpu_average_usage !== undefined
                      ? Secondsessiondata?.cpu_average_usage
                      : 0
                  }
                  text="CPU Usage"
                  unit="%"
                  max={100}
                />
              </Link>
            </Grid>
            <Grid item xs={6} md={6}>
              <Link to="/Sessions/:id/gpu" style={{ textDecoration: "none" }}>
                <MetricUsage
                  value={
                    Secondsessiondata?.gpu_average_usage !== undefined
                      ? Secondsessiondata?.gpu_average_usage
                      : 0
                  }
                  text="GPU Usage"
                  unit="%"
                  max={100}
                />
              </Link>
            </Grid>
            <Grid item xs={6} md={6}>
              <Link
                to="/Sessions/:id/memory"
                style={{ textDecoration: "none" }}
              >
                <MetricUsage
                  value={
                    Secondsessiondata?.memory_average_usage !== undefined
                      ? Secondsessiondata?.memory_average_usage
                      : 0
                  }
                  text="Average Memory Usage"
                  unit="MB"
                  max={100}
                />
              </Link>
            </Grid>
            <Grid item xs={6} md={6}>
              <Link to="/Sessions/:id/fps" style={{ textDecoration: "none" }}>
                <MetricUsage
                  value={
                    Secondsessiondata?.average_fps_value !== undefined
                      ? Secondsessiondata?.average_fps_value
                      : 0
                  }
                  text="FPS"
                  unit=""
                  max={100}
                />
              </Link>
            </Grid>

            <Grid item xs={6} md={6}>
              <Link
                to="/Sessions/:id/MetricDownloadData"
                style={{ textDecoration: "none" }}
              >
                <MetricUsage
                  value={
                    Secondsessiondata?.download_data_usage_average !== undefined
                      ? Secondsessiondata?.download_data_usage_average
                      : 0
                  }
                  text="Total Data Downloaded"
                  unit="MiB"
                  max={100}
                />
              </Link>
            </Grid>
            <Grid item xs={6} md={6}>
              <Link
                to="/Sessions/:id/MetricUploadData"
                style={{ textDecoration: "none" }}
              >
                <MetricUsage
                  value={
                    Secondsessiondata?.upload_data_usage_average !== undefined
                      ? Secondsessiondata?.upload_data_usage_average
                      : 0
                  }
                  text="Total Data Uploaded"
                  unit="MiB"
                  max={100}
                  width={50}
                />
              </Link>
            </Grid>
            <Grid item xs={6} md={6}>
              {/* <Link to="/Sessions/:id/power" style={{ textDecoration: "none" }}> */}
              <MetricUsage
                value={
                  Secondsessiondata?.peak_memory_value !== undefined
                    ? Secondsessiondata?.peak_memory_value
                    : 0
                }
                text="Average Peak Memory"
                unit="%"
                max={100}
              />
              {/* </Link> */}
            </Grid>
            <Grid item xs={6} md={6}>
              {/* <Link
                to="/Sessions/:id/MetricAppPower"
                style={{ textDecoration: "none" }}
              > */}
              <MetricUsage
                value={
                  Secondsessiondata?.fps_stability !== undefined
                    ? Secondsessiondata?.fps_stability
                    : 0
                }
                text="FPS Stability"
                unit="%"
                max={100}
              />
              {/* </Link> */}
            </Grid>
          </Grid>
        </div>
      </main>
    </>
  );
}