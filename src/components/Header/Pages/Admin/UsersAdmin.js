import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Grid } from "@material-ui/core";
import FormEditDialog from "./Dialog";
import FormAddDialog from "./DialogAdd";

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
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [users, SetUsers] = useState([]);
  const [openDel, setOpenDel] = React.useState(false);

  const initialValue = {

    name: "",
    email: "",
    password: null,
    phone_number: "",
    role: "",
    access_end_date: "",
    // days: "",
  };
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [updateId, setUpdateId] = useState("");
  const [formData, setFormData] = useState(initialValue);
  const [del, setDel] = useState(false)
  const handleClickOpen = () => {
    setOpenAdd(true);
  };
  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleAddClose = () => {
    setOpenAdd(false);
    setFormData(initialValue);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
    setFormData(initialValue);
  };

  const handleClickDelOpen = () => {
    setOpenDel(true);
  };

  const handleDelClose = () => {
    setOpenDel(false);
  };

  
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
            style={{ margin: "10px", cursor: "pointer", color: "#278EF1" }}
            onClick={() => {
              console.log(params, "params")
              handleUpdate(params.data, params.value)
            }
            }
          ></EditIcon>
          <DeleteIcon
            variant="outlined"
            color="secondary"
            style={{ margin: "10px", cursor: "pointer", color: "#FF3E63" }}
            onClick={(e) => {
              setUpdateId(params.value)
              handleClickDelOpen()
            }}
          ></DeleteIcon>
        </div>
      ),
    },
  ];

  //fetching user data from server
  const getUsers = () => {
    axios.get("http://44.226.139.67:3000/users").then((res) => {
      console.log(res, "usersdata");
      SetUsers(res.data.data);
      console.log(res.data.name);
    });
  };

  const onChange = (e) => {
    console.log(e, "input")
    const { value, id } = e.target;
    // console.log(value,id)
    setFormData({ ...formData, [id]: value });
  };
  const onRoleChange = (e) => {
    console.log(e, "role change")
    setFormData({ ...formData, role: e.target.value });

  }
  const onDateChange = (e) => {
    console.log(e, "role change")
    setFormData({ ...formData, access_end_date: e.target.value });

  }

  // const handleChange = (e) => {
  //   setselectRole(e.target.value);
  // };


  const onGridReady = (params) => {
    setGridApi(params);
  };

  //setting update row data to form data and opening pop up window
  const handleUpdate = (oldData, id) => {
    console.log(id, "handle up id")
    setUpdateId(id)
    console.log(oldData, "olde");
    delete oldData.id;
    delete oldData.number_of_days_left;
    delete oldData.status;
    delete oldData.user_since;
    setFormData(oldData);

    console.log(formData, "updated");
    handleEditOpen();
  };

  //deleting a user
  const handleDelete = () => {
    console.log(updateId,"updateid")
    handleDelClose();
    axios
      .delete("http://44.226.139.67:3000/user", {
        params: {
          id: updateId,
        },
      })
      .then((res) => {
        console.log(res);
        getUsers();
      });
  };



  const handleFormAddSubmit = () => {
    // console.log(formData.id, "formdata with id")
    // console.log(updateId)
    // console.log(formData, "formdata")
    // if (updateId) {
    //   axios
    //     .put("http://44.226.139.67:3000/user", formData, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       params: {
    //         id: updateId,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       // handleClose();
    //       getUsers();
    //     });
    // } else {
    console.log(formData, "formData");
    const values = JSON.stringify(formData);
    console.log(values, "values");
    axios
      .post("http://44.226.139.67:3000/register", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res, "reshandle");
        handleAddClose();
        getUsers();
      });
    // }
  };

  const handleFormEditSubmit = () => {
    console.log(formData, "edit form")
    const values = JSON.stringify(formData);
    axios.put("http://44.226.139.67:3000/user", values, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        id: updateId,
      },
    })
      .then((res) => {
        console.log(res);
        handleEditClose();
        getUsers();
      });
  }

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

      <FormEditDialog
        open={openEdit}
        handleClose={handleEditClose}
        data={formData}
        onChange={onChange}
        onRoleChange={onRoleChange}
        onDateChange={onDateChange}
        updateId={updateId}
        handleFormSubmit={handleFormEditSubmit}
      />
      <FormAddDialog
        open={openAdd}
        handleClose={handleAddClose}
        data={formData}
        onChange={onChange}
        onRoleChange={onRoleChange}
        onDateChange={onDateChange}

        updateId={updateId}
        handleFormSubmit={handleFormAddSubmit}
      />


      {/* <Dialog
        open={openDel}
        onClose={handleDelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >


        Are you sure You want to Delete?





        <ListItem onClick={handleDelete}>Agree</ListItem>


      </Dialog> */}

<Dialog
     PaperProps={{
      sx: {
        width: "50%",
        maxHeight: 300
      },
      style: {
        borderRadius:"25px"
      }
    }}
  open={openDel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <CloseIcon
          onClose={handleDelClose}
          style={{ marginLeft: "93%", marginTop: "2%", cursor: "pointer" }}
        /> */}
        <DialogTitle  style={{ marginLeft: "35%", fontSize:"20px" }} id="alert-dialog-title">
        <h3>Delete User</h3>
        </DialogTitle>
        <Divider />
        <DialogContent>

         <h4 style={{ marginLeft: "28%" }}>Are you sure you want to delete?</h4>
        </DialogContent>
        {/* <Divider /> */}
        <DialogActions
          style={{
            marginLeft: "40%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <List onClick={handleDelete}>
            <div
              style={{
                color: "#FFFFFF",
                marginTop: "8%",
                background: "#278EF1",
                borderRadius: "25px",
                width: "70px",
                height: "30px",
                padding: "3px",
                fontSize: "15px",
              }}
            >
              <ListItem
                button
                onClick={handleDelete}
                style={{
                  paddingLeft: "33%",
                  fontFamily: "normal normal bold 16px/21px Product Sans",
                }}
                color="secondary"
                variant="outlined"
              >
              Yes
              </ListItem>
            </div>
          </List>
          {/* <Snackbar
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
      </Snackbar> */}
          {/* <List   onClose={handleDelClose}>
            <div
              style={{
                color: "#278EF1",
                marginTop: "8%",
                border: "2px solid #278EF1",
                boxShadow: "white",
                borderRadius: "25px",
                width: "120px",
                height: "31px",
                padding: "3px",
                fontSize: "15px",
              }}
            >
              <ListItem
                button
                onClose={handleDelClose}
                style={{
                  paddingLeft: "33%",
                  fontFamily: "normal normal bold 16px/21px Product Sans",
                }}
                color="secondary"
                variant="outlined"
              >
               No
              </ListItem>
            </div>
          </List> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
