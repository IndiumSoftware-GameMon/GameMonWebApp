import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import axios from "../../../../axios/index";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import AuthContext from "../../../../hooks/useAuth";
import Version from "../../../../asset/version.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { StylesProvider } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";


const drawerWidth = 0;
const Plot = createPlotlyComponent(Plotly);
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
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: -drawerWidth,
    // [theme.breakpoints.down("md")]: {
    //   transition: "none",
    // },
  },
  // contentShift: {
  //   transition: theme.transitions.create("margin", {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginLeft: 0,
  //   [theme.breakpoints.down("md")]: {
  //     marginLeft: -drawerWidth,
  //   },
  // },
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
    // marginTop: 20,
    color: theme.palette.text.secondary,
    // height: 130,
    height: 130,
    width: 200,
    padding: 50,
    marginTop: 23,
    marginLeft: -91,
    marginRight: 80,
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
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
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
  const navigate = useNavigate();

  const location = useLocation();
  const auth = useContext(AuthContext);
  const [openForm, setOpenForm] = React.useState(false);
  const [openMetric, setOpenMetric] = React.useState(false);
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(openMetric);
  const [Firstsessiondata, SetFirstsessiondata] = React.useState([]);
  const [Secondsessiondata, SetSecondsessiondata] = React.useState([]);
  const [selecteditem, setSelecteditem] = React.useState("yellow");
  const [rot, setRot] = React.useState(0);
  const [selectionModel, setSelectionModel] = React.useState([1]);
  console.log("DataTable", selectionModel);

  function rotateLeftfunc() {
    setRot(rot - 90);
  }
  function rotateRightfunc() {
    setRot(rot + 90);
  }

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);

  React.useEffect(() => {
    if (prevOpen.current === true && openMetric === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openMetric;
  }, [openMetric]);

  React.useEffect(() => {
    axios
      .get("/sessionDetails", {
        params: {
          userId: 2,
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
        console.log(global.deviceid);
        console.log(global.sessionid);
        console.log(global.userid);
        console.log(global.appname);
      });
  }, []);

  console.log(global.deviceid);
  console.log(global.sessionid);
  console.log(global.userid);
  console.log(global.appname);

  const handleClose = () => {
    setOpenForm(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, "firstName") || ""} ${params.getValue(params.id, "lastName") || ""
        }`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  function backButton() {
    navigate("/")
  }

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
              marginTop: "-5%",
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

          <div style={{ marginTop: "25px" }}>
            <Plot
              data={[
                {
                  x: Secondsessiondata.cpu_usage_time,
                  y: Secondsessiondata.cpu_app_usage,
                  hovertemplate: "<b>%{text}</b>",
                  text: Secondsessiondata.ap_ppower_app_deviation,
                  showlegend: false,
                  type: "scatter",
                  mode: "line",
                  type: "scatter",
                  mode: "line",

                  marker: { enabled: false },
                  line: { shape: "spline", smoothing: 0.8 },
                  marker: { color: "#87CEEB", size: "0" },
                },
              ]}
              layout={{
                X: 0,
                xanchor: "left",
                title: "Total CPU Usage",
                width: 800,
                height: 310,
                margin: { l: 90, r: 40, b: 95, t: 40, pad: 15 },
                title: false,
                xref: 450,

                text: "CpuUsage",
                borderRadius: 20,
                xaxis: {
                  autorange: true,
                  title: {
                    text: "Time",

                    font: {
                      family:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
                      size: 16,
                    },
                  },
                },

                yaxis: {
                  title: {
                    text: "Total CPU Usage",
                    font: {
                      family:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
                      size: 16,
                    },
                  },
                },

                plot_bgcolor: "#F5F5F5",

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
