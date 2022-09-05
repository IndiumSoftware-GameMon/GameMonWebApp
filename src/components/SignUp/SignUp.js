import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import axios from "../../axios/index";

import { Formik, Form, Field, useFormik, withFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";

function Copyright(props) {
  return (
    <Typography
      variant="body3"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Grid container justify="center">
        Version: 2.11.2
      </Grid>
    </Typography>
  );
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  "@media all": {
    minHeight: 10,
  },
}));

const SignUp = () => {
  // //   const [error, setError] = useState(null);

  const [userInfo, setUserInfo] = useState("");

  const navigate = useNavigate();
  const paperStyle1 = {
    padding: 20,
    height: "90",
    width: 450,
    margin: "70px auto",
  };
  const paperStyle2 = {
    padding: 20,
    height: "4.8",
    width: 450,
    margin: "5px auto",
  };
  const btnstyle = { margin: "20px 0" };
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone_number: null,
    },

    onSubmit: async (values) => {
      console.log("form data", values);
      let signUpData = {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        password: values.password,
      };

      axios
        .post("/register", signUpData)
        .then((response) => {
          console.log(response);
          setUserInfo(response);
          navigate("/login");
        })
        .catch((error) => {
          // alert(error.response)
          console.error("There was an error!", error);
        });
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required"),
      phone_number: Yup.string()
        .required("Required")
        .min(8, "Must be atleast 8 characters"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
  });

  const buttonTheme = createMuiTheme({
    palette: {
      primary: deepOrange,
    },
  });

  console.log(formik.values);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "Blue" }}>
        <StyledToolbar>
          <Card elevation={20} style={paperStyle1}>
            <Grid align="center">
              <Box
                component="img"
                sx={{
                  height: "auto",
                  width: 310,
                  maxHeight: { xs: 450, md: 450 },
                  maxWidth: { xs: 450, md: 450 },
                }}
                alt="Gamer Bench"
                src="https://web.gamebench.net/assets/images/logos/Logo-Pro.png"
              />
              <Typography variant="h5">
                The smart way to test mobile
                <br></br>
                UX
              </Typography>
            </Grid>

            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ display: "flex", alignItems: "flex-end", ml: 4 }}>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <PersonIcon sx={{ color: "action.active", ml: -3.5 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-textarea"
                      label="name"
                      placeholder="name"
                      name="name"
                      variant="filled"
                      fullWidth
                      value={formik.values.name}
                      helperText={formik.touched.name ? formik.errors.name : ""}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      onChange={(e) => {
                        console.log(e.target.value, "e");
                        formik.handleChange(e);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <br></br>
              <Box sx={{ display: "flex", alignItems: "flex-end", ml: 4 }}>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <PersonIcon sx={{ color: "action.active", ml: -3.5 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-textarea"
                      label="email"
                      placeholder="email"
                      multiline
                      name="email"
                      variant="filled"
                      value={formik.values.email}
                      fullWidth
                      helperText={
                        formik.touched.email ? formik.errors.email : ""
                      }
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>
              <br></br>
              <Box sx={{ display: "flex", alignItems: "flex-end", ml: 4 }}>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <PersonIcon sx={{ color: "action.active", ml: -3.5 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-textarea"
                      label="phone"
                      placeholder="phone"
                      multiline
                      variant="filled"
                      fullWidth
                      name="phone_number"
                      value={formik.values.phone_number}
                      helperText={
                        formik.touched.phone_number
                          ? formik.errors.phone_number
                          : ""
                      }
                      error={
                        formik.touched.phone_number &&
                        Boolean(formik.errors.phone_number)
                      }
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end", ml: 4 }}>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <LockIcon sx={{ color: "action.active", ml: -3.5 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-textarea"
                      label="Password"
                      placeholder="Password"
                      multiline
                      name="password"
                      variant="filled"
                      type="password"
                      value={formik.values.password}
                      fullWidth
                      helperText={
                        formik.touched.password ? formik.errors.password : ""
                      }
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  {/* {error && <div>{error}</div>} */}
                </Grid>
              </Box>
              <br></br>
              <Box sx={{ display: "flex", alignItems: "flex-end", ml: 4 }}>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <LockIcon sx={{ color: "action.active", ml: -3.5 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-textarea"
                      label="confirm Password"
                      placeholder="confirm Password"
                      multiline
                      variant="filled"
                      type="password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      fullWidth
                      helperText={
                        formik.touched.confirmPassword
                          ? formik.errors.confirmPassword
                          : ""
                      }
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  {/* {error && <div>{error}</div>} */}
                </Grid>
              </Box>

              <Grid container justify="center">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                >
                  Register
                </Button>
              </Grid>
            </form>
            <br></br>
            <Typography variant="h7">
              <Grid container justify="center">
                <Link href="#">Forgot password?</Link>
              </Grid>
            </Typography>
          </Card>
        </StyledToolbar>
        <br></br>
        <StyledToolbar>
          <Card elevation={20} style={paperStyle2}>
            <Typography variant="h7">
              <Grid container justify="center">
                Haven't tried GameBench Pro?{" "}
                <Link href="#">Try it out now</Link>
              </Grid>
            </Typography>
          </Card>
        </StyledToolbar>
      </AppBar>
      <br></br>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Box>
  );
};

export default SignUp;
