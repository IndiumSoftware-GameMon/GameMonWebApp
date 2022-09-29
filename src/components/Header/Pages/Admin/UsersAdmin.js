import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Grid, Button } from "@material-ui/core";
import FormDialog from "./Dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
// import "./Admin.css"
import axios from '../../../../axios/index';



function App() {
  const [users,SetUsers]= useState([]);
  const initialValue = { name: "", email: "", role: "", dob: "" };
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };
  // const 'url' = `http://localhost:4000/users`;



useEffect(()=> {
  axios.get('http://44.226.139.67:3000/users').then((res)=>{
  console.log(res,"usersdata")
  SetUsers(res.data.data)
  console.log(res.data.name)
  })
},[])



const rowData = users?.map(data => {

  return {
      id: data?.id,
      name: data?.name,
      email:data?.email,
      role: data?.role,
      startuser: data?.user_since,
      licenseuser: data?.license_start_date,
      status: data?.status,
      phonenumber:data?.phone_number,
  }
})


const columnDefs = [
  // { headerName: "ID", field: "id" },
  { headerName: "Name", field: "name" },
  { headerName: "Email", field: "email" },
  { headerName: "Role", field: "role" },
  { headerName: "StartUser", field: "startuser" },
  { headerName: "LicenseUser", field: "licenseuser" },
  { headerName: "Status", field: "status" },
  { headerName: "PhoneNumber", field: "phonenumber" },
  {
    headerName: "Actions",
    field: "id",
    cellRendererFramework: (params) => (
      <div>
        <EditIcon
          variant="outlined"
          color="primary"
          style={{margin:"10px"}}
          onClick={() => handleUpdate(params.data)}
        ></EditIcon>
        <DeleteIcon
          variant="outlined"
          color="secondary"
          style={{margin:"10px"}}
          onClick={() => handleDelete(params.value)}
        ></DeleteIcon>
      </div>
    ),
  },
];


  // //calling getUsers function for first time
  // useEffect(() => {
  //   getUsers();
  // }, []);

  // //fetching user data from server
  // const getUsers = () => {
  //   fetch('url')
  //     .then((resp) => resp.json())
  //     .then((resp) => setTableData(resp));
  // };
  // const onChange = (e) => {
  //   const { value, id } = e.target;
  //   // console.log(value,id)
  //   setFormData({ ...formData, [id]: value });
  // };
  // const onGridReady = (params) => {
  //   setGridApi(params);
  // };

  // //setting update row data to form data and opening pop up window
  // const handleUpdate = (oldData) => {
  //   setFormData(oldData);
  //   handleClickOpen();
  // };
  // //deleting a user
  // const handleDelete = (id) => {
  //   const confirm = window.confirm(
  //     "Are you sure, you want to delete this row",
  //     id
  //   );
  //   if (confirm) {
  //     fetch('url' + `/${id}`, { method: "DELETE" })
  //       .then((resp) => resp.json())
  //       .then((resp) => getUsers());
  //   }
  // };
  // const handleFormSubmit = () => {
  //   if (formData.id) {
  //     //updating a user
  //     const confirm = window.confirm(
  //       "Are you sure, you want to update this row ?"
  //     );
  //     confirm &&
  //       fetch('url' + `/${formData.id}`, {
  //         method: "PUT",
  //         body: JSON.stringify(formData),
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //       })
  //         .then((resp) => resp.json())
  //         .then((resp) => {
  //           handleClose();
  //           getUsers();
  //         });
  //   } else {
  //     // adding new user
  //     fetch('url', {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     })
  //       .then((resp) => resp.json())
  //       .then((resp) => {
  //         handleClose();
  //         getUsers();
  //       });
  //   }
  // };

  // const defaultColDef = {
  //   sortable: true,
  //   flex: 1,
  //   filter: true,
  //   floatingFilter: true,
  // };
  return (
    <>
     <br></br>
     <br></br>
      <Grid align="right">
        <List
          onClick={handleClickOpen}>
          <div
            style={{
              color: "#FFFFFF",
              background: "#278EF1",
              borderRadius: "30px",
              width:"150px",
              marginRight:"1%"
            }}
          >
            <ListItem button>
              <AddIcon/>

              <ListItemText
                primary={
                  <Typography
                    type="body2"
                    style={{
                      color: "white",
                      marginLeft: "15px",
                    }}
                  >
              Add user
                  </Typography>
                }
              ></ListItemText>
            </ListItem>
          </div>
        </List>       
      </Grid>
<br></br>

      <div className="ag-theme-alpine" style={{ height: "300px" , width: "100%"  }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          // defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>

      <FormDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        // onChange={onChange}
        // handleFormSubmit={handleFormSubmit}
      />
    </>
  );
}

export default App;
