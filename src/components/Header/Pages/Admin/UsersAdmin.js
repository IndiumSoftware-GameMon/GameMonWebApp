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
import AddIcon from "@mui/icons-material/Add";
// import "./Admin.css"
import axios from "../../../../axios/index";
import { ContentPasteSearchOutlined } from "@mui/icons-material";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import './Admin.css'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [users, SetUsers] = useState([]);
  const initialValue = {
   
    name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
    access_end_date: "",
    // days: "",
  };
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [updatedId,setUpdateId] = useState();
  const [formData, setFormData] = useState(initialValue);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };
  const [selectRole, setselectRole] = React.useState("");

  const [openalert, setOpenalert] = React.useState(false);

  const handleClick = () => {
    setOpenalert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenalert(false);
  };

  
  // const 'url' = `http://44.226.139.67:4000/users`;

  useEffect(() => {
    getUsers();
  }, []);

  const rowData = users?.map((data) => {
    return {
      id: data?.id,
      name: data?.name,
      email: data?.email,
      role: data?.role,
      user_since: data?.user_since,
      access_end_date: data?.access_end_date,
      status: data?.status,
      phone_number: data?.phone_number,
      password: data?.password,
      // days: data?.days,
      number_of_days_left: data?.number_of_days_left
    };
  });

  const columnDefs = [
    // { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Role", field: "role" },
    // { headerName: "StartUser", field: "user_since" },
    // { headerName: "access_end_date", field: "access_end_date" },
    { headerName: "number_of_days_left", field: "number_of_days_left" },
    { headerName: "Status", field: "status" },
    { headerName: "PhoneNumber", field: "phone_number" },
    // { headerName: "password", field: "password" },
    // { headerName: "days", field: "days" },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <div>
          <EditIcon
            variant="outlined"
            color="primary"
            style={{ margin: "10px", cursor: "pointer" ,color:"#278EF1"}}
            onClick={() => handleUpdate(params.data,params.data.id)}
          ></EditIcon>
          <DeleteIcon
            variant="outlined"
            color="secondary"
            style={{ margin: "10px", cursor: "pointer" ,color:"#FF3E63"}}
            onClick={() => {
              console.log(params, "delete function");
              handleDelete(params.value);
              handleClick();
            }}
          ></DeleteIcon>
        </div>
      ),
    },
  ];

  //fetching user data from server
  const getUsers = () => {
    axios.get("http://127.0.0.1:3000/users").then((res) => {
      console.log(res, "usersdata");
      SetUsers(res.data.data);
      console.log(res.data.name);
    });
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    // console.log(value,id)
    setFormData({ ...formData, [id]: value });
  };

  const handleChange = (e) => {
    setselectRole(e.target.value);
  };


  const onGridReady = (params) => {
    setGridApi(params);
  };

  //setting update row data to form data and opening pop up window
  const handleUpdate = (oldData,id) => {
    setUpdateId(id)
    console.log(oldData, "olde");
    delete oldData.id;
    delete oldData.number_of_days_left;
    delete oldData.status;
    delete oldData.user_since;
    setFormData(oldData);

    console.log(formData, "updated");
    handleClickOpen();
  };

  //deleting a user
  const handleDelete = (id) => {
    console.log(id, "id");
    axios
      .delete("http://127.0.0.1:3000/user", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res);
        getUsers();
      });
  };



  const handleFormSubmit = () => {
    console.log(formData.id,"formdata with id")
    console.log(formData,"formdata")
    if (updatedId) {
      axios
        .put("http://127.0.0.1:3000/user",formData, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            id: updatedId,
          },
        })
        .then((res) => {
          console.log(res);
          handleClose();
          getUsers();
        });
    } else {
      console.log(formData, "formData");
      const values = JSON.stringify(formData);
      console.log(values, "values");
      axios
        .post("http://127.0.0.1:3000/register", values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res, "reshandle");
          handleClose();
          getUsers();
        });
    }
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };
  return (
    <>
      <br></br>
      <br></br>
      <Grid align="right">
        <List onClick={handleClickOpen}>
          <div
            style={{
              color: "#FFFFFF",
              background: "#278EF1",
              borderRadius: "30px",
              width: "150px",
              marginRight: "1%",
            }}
          >
            <ListItem button>
              <AddIcon />

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
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openalert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          User Deleted Successfully!
        </Alert>
      </Snackbar>
      <div
        className="ag-theme-alpine"
        style={{ height: "300px", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          // defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
           {/* <DataGrid
        rows={rowData}
        columns={columnDefs}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      /> */}
      </div>

      <FormDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
      
    </>
  );
}

export default App;
