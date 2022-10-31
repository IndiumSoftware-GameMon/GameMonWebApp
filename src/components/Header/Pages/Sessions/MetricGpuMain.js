import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import axios from "../../../../axios/index";
import AuthContext from "../../../../hooks/useAuth";
import Version from "../../../../asset/version.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



const Plot = createPlotlyComponent(Plotly);
const Styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 55,
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
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },


  grids: {
    display: "flex",
    flexGrow: 1,
    "& div": {
      width: "100%",
    },
  },
}));

export default function SessionsMaincomp(props) {
  const classes = Styles();
  const auth = useContext(AuthContext);
  const [Secondsessiondata, SetSecondsessiondata] = React.useState([]);
  const uid = auth.id;



  React.useEffect(() => {
    axios
      .get("/sessionDetails", {
        params: {
          userId: uid,
          DeviceId: global.deviceid,
          appName: global.appname,
          sessionId: global.sessionid,
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
        console.log(global.deviceid)
        console.log(global.sessionid)
        console.log(global.userid)
        console.log(global.appname)
      });
  },);

  return (
    <>
      <main className={clsx(classes.content)}>
        <div className={classes.drawerHeader} />
        <div>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            style={{
              marginLeft: "92%",
              marginTop: "2%",
              color: "#FFFFFF",
              background: "#278EF1",
              borderRadius: "10px",
            }}
            startIcon={<ArrowBackIosNewIcon />}
          >
            Back
          </Button>
        </div>
        <div className={classes.grids} style={{ padding: "50px" }}>
          <div>
            <Grid container spacing={4} direction="column">
              <Grid item xs={9} md={9}>
                <>
                  <div
                    className="device-info-style"
                    style={{ marginTop: "25px" }}
                  >
                    <div className="device-info-sub">
                      <div>
                        <img
                          src={Version}
                          alt=" "
                          className="device-info-image"
                        />
                      </div>
                      <div className="device-info-text">
                        <p style={{ fontSize: "12px", fontWeight: "200" }}>
                          {props.androidVersion}
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: "300",
                            marginTop: "-70px",
                            marginLeft: "75px",
                          }}
                        >
                          {Secondsessiondata.version_name}
                        </p>
                        <p style={{ marginTop: "-9px", marginLeft: "75px" }}>
                          {" "}
                          Version
                        </p>
                      </div>
                    </div>
                  </div>

                  <br />

                  <br></br>

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
                                  color: "white", marginLeft: "20px"
                                }}
                              >
                                {global.sessionname}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                type="body2"
                                style={{
                                  color: "white", marginLeft: "20px"
                                }}
                              >
                                {global.appname}
                              </Typography>
                            }
                          ></ListItemText>
                        </ListItem>
                      </div>

                      {console.log(Secondsessiondata)}
                    </List>
                  </div>
                </>
              </Grid>
            </Grid>
          </div>
          <div style={{ marginTop: "25px" }}>  <Plot

            data={[
              {
                x: Secondsessiondata.gpu_usage_time,
                y: Secondsessiondata.avg_gpu_usage,
                hovertemplate:

                  '<b>%{text}</b>',
                text: Secondsessiondata.gpu_deviation,
                showlegend: false,
                type: "scatter",
                mode: "line",
                line: { shape: "spline", smoothing: 0.8 },
                marker: { color: "#87CEEB", size: "0" },
              },
            ]}
            layout={{
              X: 0,
              xanchor: "left",
              title: "Total GPU Usage",
              width: 800,
              height: 310,
              margin: { l: 90, r: 40, b: 95, t: 40, pad: 15 },
              xref: 450,

              text: "GPU Usage",
              borderRadius: 20,
              xaxis: {
                autorange: true,
                title: {
                  text: "Time",
                  font: {
                    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
                    size: 16,
                  },
                },

              },

              yaxis: {
                title: {
                  text: "Total GPU Usage",
                  font: {
                    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
                    size: 16,
                  },
                },
              },

              plot_bgcolor: "#F5F5F5",
              // paper_bgcolor: "",

              plot_height: 300,
            }}
            config={{ displayModeBar: false }}
          />


          </div>
        </div>
      </main>
    </>
  );
}
