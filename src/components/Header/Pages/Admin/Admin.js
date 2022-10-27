import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Routes, Route } from "react-router-dom";
import AdminMain from "./AdminMain.js";
import auth from "../../../../hooks/useAuth";
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
}));

export default function AdminHeader() {
  const classes = Styles();
  const [open, setOpen] = React.useState(false);
  const isMatch = useMediaQuery("(min-width:400px)");
  console.log(auth.token, "sessions page");
  console.log(auth, "auth");



  
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
              <Link to="/Admin/License" style={{ textDecoration: "none" }}>
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
      </Routes>
    </div>
  );
}
