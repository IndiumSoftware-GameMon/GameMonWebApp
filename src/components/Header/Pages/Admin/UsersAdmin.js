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
import axios from "../../../../axios/index";
import "./Admin.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";

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
  };
  const [gridApi, setGridApi] = useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [updateId, setUpdateId] = useState("");
  const [formData, setFormData] = useState(initialValue);
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
      number_of_days_left: data?.number_of_days_left,
    };
  });

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Role", field: "role" },
    { headerName: "number_of_days_left", field: "number_of_days_left" },
    { headerName: "Status", field: "status" },
    { headerName: "PhoneNumber", field: "phone_number" },
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
              handleUpdate(params.data, params.value);
            }}
          ></EditIcon>
          <DeleteIcon
            variant="outlined"
            color="secondary"
            style={{ margin: "10px", cursor: "pointer", color: "#FF3E63" }}
            onClick={(e) => {
              setUpdateId(params.value);
              handleClickDelOpen();
            }}
          ></DeleteIcon>
        </div>
      ),
    },
  ];

  //fetching user data from server
  const getUsers = () => {
    axios.get("http://44.226.139.67:3000/users").then((res) => {
      SetUsers(res.data.data);
    });
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const onRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };
  const onDateChange = (e) => {
    setFormData({ ...formData, access_end_date: e.target.value });
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  //setting update row data to form data and opening pop up window
  const handleUpdate = (oldData, id) => {
    setUpdateId(id);
    delete oldData.id;
    delete oldData.number_of_days_left;
    delete oldData.status;
    delete oldData.user_since;
    setFormData(oldData);
    handleEditOpen();
  };

  //deleting a user
  const handleDelete = () => {
    handleDelClose();
    axios
      .delete("http://44.226.139.67:3000/user", {
        params: {
          id: updateId,
        },
      })
      .then((res) => {
        getUsers();
      });
  };

  const handleFormAddSubmit = () => {
    const values = JSON.stringify(formData);
    axios
      .post("http://44.226.139.67:3000/register", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        handleAddClose();
        getUsers();
      });
  };

  const handleFormEditSubmit = () => {
    const values = JSON.stringify(formData);
    axios
      .put("http://44.226.139.67:3000/user", values, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          id: updateId,
        },
      })
      .then((res) => {
        handleEditClose();
        getUsers();
      });
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
          onGridReady={onGridReady}
        />

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

      <Dialog
        PaperProps={{
          sx: {
            width: "50%",
            maxHeight: 300,
          },
          style: {
            borderRadius: "25px",
          },
        }}
        open={openDel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle
          style={{ marginLeft: "35%", fontSize: "20px" }}
          id="alert-dialog-title"
        >
          <h3>Delete User</h3>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <h4 style={{ marginLeft: "28%" }}>
            Are you sure you want to delete?
          </h4>
        </DialogContent>
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
                  marginTop: "-4%",
                  fontFamily: "normal normal bold 16px/21px Product Sans",
                }}
                color="secondary"
                variant="outlined"
              >
                Yes
              </ListItem>
            </div>
          </List>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
