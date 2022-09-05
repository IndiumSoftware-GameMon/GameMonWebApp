import React, { useContext } from "react";
import Version from "../../../../asset/version.png";
import androidLogo from "../../../../asset/androidlogo.png";
import mini from "../../../../asset/mini.png";
import appVersion from "../../../../asset/appVersion.png";
import charge from "../../../../asset/charge.png";
import p1 from "../../../../asset/p1.png";
import p2 from "../../../../asset/p2.png";
import profile from "../../../../asset/profile.png";
import time from "../../../../asset/time.png";
import calender from "../../../../asset/calender.png";
import tower from "../../../../asset/tower.png";
import { Divider } from "@mui/material";
import { TextField, IconButton, DialogContent } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { useParams, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import axios from "../../../../axios/index";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import AuthContext from "../../../../hooks/useAuth";
import MetricUsage from "../../Pages/Sessions/MetricUsage";


const useStyles = makeStyles({
  input: {
    "& .MuiOutlinedInput-root": {
      position: "relative",
      borderRradius: "15px",
    },
  },
});

function DeviceInfo(props) {
  const classes = useStyles();
  const [Firstsessiondata, SetFirstsessiondata] = React.useState([]);
  const [Secondsessiondata, SetSecondsessiondata] = React.useState([]);
  const location = useLocation();
  const auth = useContext(AuthContext);

  React.useEffect(() => {
    // const searchParams = new URLSearchParams(location.search);
    // console.log(searchParams, "searching");
    // var session_id = searchParams.get("sessionID");
    // console.log(session_id, "session_id");
    axios
      .get("/getHistory", {
        params: {
          fromDate: "2022-03-21",
          toDate: "2022-05-14",
        },
        headers: {
          // Authorization:
          //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidml2ZWtAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjIsImlhdCI6MTY1MjYzNTc5NH0.ZtIBQ0aTTgAH_hVSsctlsH4OrQjZ00SdseDpReP_pUY",
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        SetFirstsessiondata(res.data.data);
      });
  }, []);

  function singleItem(e, data) {
    console.log(e.target, data, "eeeeeee");
    axios
      .get("/getSessions", {
        params: {
          deviceId: data.device_id,
          userId: data.user_id,
          sessionID: data.session_id,
        },
        headers: {
          // Authorization:
          //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidml2ZWtAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjIsImlhdCI6MTY1MjYzNTc5NH0.ZtIBQ0aTTgAH_hVSsctlsH4OrQjZ00SdseDpReP_pUY",
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        console.log(res);

        console.log(res.data, "sescond value");
        console.log(res.data.data, "sescond value data");
        SetSecondsessiondata(res.data.data[0]);
      });
  }

  return (
    <>

      <div className="device-info-style">
        <div className="device-info-sub">
          <div>
            <img src={Version} alt=" " className="device-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "12px", fontWeight: "200" }}>
              {props.androidVersion}
            </p>
            <p style={{ marginTop: "-12px" }}> Version</p>
          </div>
        </div>
      </div>

      <div className="app-info-style">
        <div className="app-info-sub"></div>
        <Grid container justify="center">
          <Button>Search</Button>

          <Link
            to="/Sessions/:id/advancedsearch"
            style={{ textDecoration: "none" }}
          >
            <Button>Advanced Search</Button>
          </Link>
        </Grid>

        <br />
        <div className="app-info-sub">

          <TextField
            id="standard-bare"
            className={classes.input}
            variant="outlined"
            placeholder="Search here"
            style={{ width: "177%" }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchOutlined />
                </IconButton>
              ),
            }}
          />
        </div>
      </div>
      <br />

      <div className="device-info-style-list">
        <div className="device-info-sub">
          <div className="device-info-text">
            <List style={{ maxHeight: "100%", overflow: "auto" }}>


              {console.log(Firstsessiondata)}
              {Firstsessiondata.map((data) => (
                <>


                  <ListItem button onClick={(e) => singleItem(e, data)} sx={{ paddingTop: 0 }}>
                    <ListItemIcon>
                      <Checkbox edge="start" />
                      <ListItemIcon>
                        <PhoneIphoneIcon
                          sx={{ fontSize: 55 }}
                          style={{ color: "white" }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={data.session_id}
                        secondary={data.version_name}
                        style={{ color: "white" }}
                      ></ListItemText>
                    </ListItemIcon>
                  </ListItem>


                </>
              ))}

              {console.log(Secondsessiondata)}


            </List>
          </div>
        </div>
      </div>

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
            <p style={{ fontSize: "12px", fontWeight: "200" }}>{props.user}</p>
            <p style={{ marginTop: "-12px" }}>User</p>
          </div>
        </div>
        <Divider />
        <div className="app-info-sub">
          <div>
            <img src={time} alt=" " className="app-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "12px", fontWeight: "200" }}>
              {props.sessionDuration}
            </p>
            <p style={{ marginTop: "-12px" }}>Session Duration</p>
          </div>
        </div>
        <Divider />
        <div className="app-info-sub">
          <div>
            <img src={calender} alt=" " className="app-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "12px", fontWeight: "200" }}>
              {props.sessionDate}
            </p>
            <p style={{ marginTop: "-12px" }}>Session Date</p>
          </div>
        </div>

        <Divider />
        <div className="app-info-sub">
          <div>
            <img src={calender} alt=" " className="app-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "12px", fontWeight: "200" }}>
              {props.sessionLocation}
            </p>
            <p style={{ marginTop: "-10px" }}>Session Location</p>
          </div>
        </div>
        <Divider />
        <div className="app-info-sub">
          <div>
            <img src={tower} alt=" " className="app-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "12px", fontWeight: "400" }}>
              {props.mobileNetwork}
            </p>
            <p style={{ marginTop: "-10px" }}>Mobile Network</p>
          </div>
        </div>
      </div>

      <h1>{Secondsessiondata.upload_data_usage_average}</h1>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>

          <MetricUsage
            value={Secondsessiondata.cpu_average_usage}
            text="CPU Usage"
            unit="%"
            max={100}
          />
        </Grid>
        <Grid item xs={12} md={6}>

          <MetricUsage
            value={Secondsessiondata.gpu_average_usage}
            text="GPU Usage"
            unit="%"
            max={100}
          />
        </Grid>
        <Grid item xs={12} md={6}>

          <MetricUsage
            value={Secondsessiondata.memory_average_usage}
            text="Average Memory Usage"
            unit="%"
            max={100}
          />
        </Grid>
        <Grid item xs={12} md={6}>

          <MetricUsage
            value={Secondsessiondata.power_average_usage}
            text="Power Memory Usage"
            unit="%"
            max={100}
          />
        </Grid>
        <Grid item xs={12} md={6}>

          <MetricUsage
            value={Secondsessiondata.download_data_usage_average}
            text="Total Data Downloaded"
            unit="%"
            max={100}
          />
        </Grid>
        <Grid item xs={12} md={6}>

          <MetricUsage
            value={Secondsessiondata.upload_data_usage_average}
            text="Total Data Uploaded"
            unit="%"
            max={100}
          />
        </Grid>
      </Grid>


    </>
  );
}

export default DeviceInfo;
