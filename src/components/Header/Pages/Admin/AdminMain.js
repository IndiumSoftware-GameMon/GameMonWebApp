import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import UsersAdmin from "./UsersAdmin"


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

}));

export default function AdminMain({ open }) {
  const classes = Styles();

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
