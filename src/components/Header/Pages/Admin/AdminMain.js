import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "../../../../axios/index";
import auth from "../../../../hooks/useAuth";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import AuthContext from "../../../../hooks/useAuth";
import UsersAdmin from "./UsersAdmin"

const drawerWidth = 350;

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
      width: "75%",
    },
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  dialog: {
    width: 800,
    height: 900,
  },
}));

export default function AdminMain({ open }) {
  const classes = Styles();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [openForm, setOpenForm] = React.useState(false);
  const [openMetric, setOpenMetric] = React.useState(false);
  const anchorRef = React.useRef(null);
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openMetric);



  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

  
       <UsersAdmin></UsersAdmin>

      </main>
    </>
  );
}
