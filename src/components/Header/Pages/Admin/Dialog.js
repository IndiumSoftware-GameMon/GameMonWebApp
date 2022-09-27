import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,name,email,phone,dob}=data

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"Update user":"Create new user"}</DialogTitle>
        <DialogContent>
         <form>
             <TextField id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" variant="outlined" margin="dense" fullWidth />
             <TextField id="email" value={email} onChange={e=>onChange(e)} placeholder="Enter email" label="Email" variant="outlined" margin="dense" fullWidth />
             <TextField id="phone" value={phone} onChange={e=>onChange(e)} placeholder="Enter phone number" label="Phone Number" variant="outlined" margin="dense" fullWidth />
             <TextField id="dob" value={dob} onChange={e=>onChange(e)} placeholder="Enter Date of birth" label="Date of Birth" variant="outlined" margin="dense" fullWidth />
         </form>
        </DialogContent>
        <DialogActions>
        <List
          onClick={handleClose}>
          <div
            style={{
              color: "#FFFFFF",
              background: "#278EF1",
              borderRadius: "8px",
            }}
          >
            <ListItem button onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </ListItem>
          </div>
        </List>

        <List
      onClick={()=>handleFormSubmit()}>
          <div
            style={{
              color: "#FFFFFF",
              background: "#278EF1",
              borderRadius: "8px",
            }}
          >
            <ListItem button onClick={handleClose} color="secondary" variant="outlined">
            {id?"Update":"Submit"}
             
            </ListItem>
          </div>
        </List>
        </DialogActions>
      </Dialog>
    </div>
  );
}
