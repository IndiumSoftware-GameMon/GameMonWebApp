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



function App() {
  const [users, SetUsers] = useState([]);
  const initialValue = {
    id: "",
    name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
    license_start_date: "",
    days: "",
  };
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
      license_start_date: data?.license_start_date,
      status: data?.status,
      phone_number: data?.phone_number,
      password: data?.password,
      days: data?.days,
    };
  });

  const columnDefs = [
    // { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Role", field: "role" },
    // { headerName: "StartUser", field: "user_since" },
    { headerName: "LicenseUser", field: "license_start_date" },
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
            onClick={() => handleUpdate(params.data)}
          ></EditIcon>
          <DeleteIcon
            variant="outlined"
            color="secondary"
            style={{ margin: "10px", cursor: "pointer" ,color:"#FF3E63"}}
            onClick={() => {
              console.log(params, "delete function");
              handleDelete(params.value);
            }}
          ></DeleteIcon>
        </div>
      ),
    },
  ];

  //fetching user data from server
  const getUsers = () => {
    axios.get("http://localhost:3000/users").then((res) => {
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
  const onGridReady = (params) => {
    setGridApi(params);
  };

  //setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    console.log(oldData, "olde");
    setFormData(oldData);
    console.log(formData, "updated");
    handleClickOpen();
  };

  //deleting a user
  const handleDelete = (id) => {
    console.log(id, "id");
    axios
      .delete("http://localhost:3000/user", {
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
    if (formData.id) {
      axios
        .put("http://localhost:3000/user", {
          params: {
            id: formData.id,
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
        .post("http://localhost:3000/register", values, {
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

      <div
        className="ag-theme-alpine"
        style={{ height: "300px", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          // defaultColDef={defaultColDef}
          // onGridReady={onGridReady}
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
