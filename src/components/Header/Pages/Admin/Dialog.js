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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,name,email,password,phone_number,role,license_start_date,days}=data
 const [age, setAge] = React.useState("");
 const handleChange = (event) => {
  setAge(event.target.value);
};
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CloseIcon onClick={handleClose} style={{marginLeft:"93%",marginTop:"2%",cursor:"pointer"}}/>
        <DialogTitle style={{marginLeft:"5%"}} id="alert-dialog-title">{id?"Update User":"Add User"}</DialogTitle>
        <Divider />
        <DialogContent>
         <form>
             <TextField id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" variant="outlined" style={{marginLeft:"5%"}} margin="dense"/>
             <TextField id="email" value={email} onChange={e=>onChange(e)} placeholder="Enter email" label="Email" variant="outlined" style={{marginLeft:"10%"}} margin="dense"/>
             {!id&& <TextField id="password" value={password} onChange={e=>onChange(e)} placeholder="Enter password" label="password" variant="outlined" style={{marginLeft:"5%"}} margin="dense"/> }  
             <TextField id="phone_number" value={phone_number} onChange={e=>onChange(e)} placeholder="Enter phone_number " label="phone_number" style={{marginLeft:"10%"}} variant="outlined" margin="dense"/>
             <TextField id="role" value={role} onChange={e=>onChange(e)} placeholder="Enter Role " label="Role " variant="outlined" style={{marginLeft:"5%"}} margin="dense"/>
             <TextField id="license_start_date" value={license_start_date} onChange={e=>onChange(e)} placeholder="Enter license_start_date " label="license_start_date " variant="outlined" style={{marginLeft:"10%"}} margin="dense"/>
          {!id&& <TextField id="days" value={days} onChange={e=>onChange(e)} placeholder="Enter days " label="days " variant="outlined" style={{marginLeft:"5%"}} margin="dense"/> }   
         </form>
        </DialogContent>
        <Divider />
        <DialogActions style={{marginLeft:"5%",display: "flex",justifyContent: "flex-start"}}>
     
        <List
      onClick={()=>handleFormSubmit()}>
          <div
            style={{
              color: "#FFFFFF",
              background: "#278EF1",
              borderRadius: "20px",
            }}
          >
            <ListItem button onClick={handleClose} color="secondary" variant="outlined">
            {id?"Save":"Add"}
             
            </ListItem>
          </div>
        </List>

        <List
          onClick={handleClose}>
          <div
            style={{
              color: "#FFFFFF",
              background: "#278EF1",
              borderRadius: "20px",
            }}
          >
            <ListItem button onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </ListItem>
          </div>
        </List>

        </DialogActions>
      </Dialog>
    </div>
  );
}





      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select value={age} label="Age" onChange={handleChange}>
          <MenuItem value={10}>Manager</MenuItem>
          <MenuItem value={10}>Tester</MenuItem>
        </Select>
      </FormControl> */}