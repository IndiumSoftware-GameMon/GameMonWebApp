import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/index";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import AuthContext from "../../hooks/useAuth";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import background from "../../asset/pc-game.jpg";
import image from "../../asset/img.png";
import indlogo from "../../asset/Group.png";
import { grey } from "@mui/material/colors";
import mail from "../../asset/mail.png";
import eye from "../../asset/eye.png";
import { Icon } from "@material-ui/core";


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  "@media all": {
    minHeight: 10,
  },
}));

const paperStyle1 = {
  padding: 20,
  height: "60",
  width: 450,
  margin: "70px auto",
};

const paperStyle2 = {
  padding: 20,
  height: "4.8",
  width: 450,
  margin: "5px auto",
};
const errorStyle = {
  marginTop: 15,
};
const btnstyle = { margin: "20px 0" };
const buttonTheme = createMuiTheme({
  palette: {
    primary: deepOrange,
  },
});

const Login = () => {
  const [userInfo, setUserInfo] = useState("");
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);

      var loginData = {
        email: values.email,
        password: values.password,
      };
      axios
        .post("/login", loginData)
        .then((response) => {
          console.log(response.data);
          auth.settinguserInfo(response.data);
          auth.login();
          console.log(userInfo, "userInfo");
          console.log(response.data.token, "token");
          navigate("/");

          // console.log(token, "setingtoken");
        })
        .catch((error) => {
          console.log(error.toJSON());
          if (error.toJSON().status === 400) {
            setError("Incorrect Password");
          }
          // setError(error.data);
          console.error("There was an error!", error);
        });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Enter a  email "),
      password: Yup.string()
        .required("Required")
        .min(6, "Password must be atleast 6 characters"),
    }),
  });

  return (
    <>
      <div className="log">
        <div>
          <img
            src={indlogo}
            alt=""
            style={{ float: "left", width: "15%", height: "15%" }}
          />
          <h4
            style={{
              float: "right",
              marginRight: "10%",
              fontSize: "25px",
              marginTop: "1.5%",
              marginLeft: "0.7%",
            }}
          >
            GameOn
          </h4>
          <img
            src={indlogo}
            alt=" "
            style={{ width: "5%", height: "5%", float: "right" }}
          />
        </div>
        <div className="box-container">
          <div className="box">
            <div className="left-side">
              <Grid align="center">
                <h2 className="left-top">GameOn</h2>
                <img src={image} alt="" className="login_image" />
                <h4 className="left_bottom"> Smart way to test Game App </h4>

                {/* {state.result && <Link to="/select-page"></Link>} */}
              </Grid>
            </div>

            <div className="right-side">
              <div className="contents">
                <form onSubmit={formik.handleSubmit}>
                  <h1
                    style={{
                      textAlign: "left",
                      marginTop: "2%",
                      marginBottom: "10%",
                    }}
                  >
                    Login
                  </h1>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div>
                        <TextField
                          id="filled-textarea"
                          label="Email-Address"
                          placeholder="email"
                          multiline
                          style={{ width: "85%" }}
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          helperText={
                            formik.touched.email ? formik.errors.email : ""
                          }
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                        />
                        {/* <i
                            className="bi bi-envelope "
                            style={{
                              fontSize: "26px",
                              color: "#FEA14A",
                              position: "relative",
                              marginLeft: "75%",
                            }}
                          ></i> */}
                        <Icon style={{ fontSize: "2.6rem" }}>
                          <img src={mail} />
                        </Icon>
                      </div>
                      {/* <div
                    className={
                      state.email.length > 0
                        ? "form-group inputPhone"
                        : "form-group"
                    }
                  ></div> */}
                      <div>
                        <div>
                          <TextField
                            id="filled-password-input"
                            label="Password"
                            placeholder="Password"
                            style={{ width: "85%" }}
                            name="password"
                            type="password"
                            value={formik.values.password}
                            helperText={
                              formik.touched.password
                                ? formik.errors.password
                                : ""
                            }
                            error={
                              formik.touched.password &&
                              Boolean(formik.errors.password)
                            }
                            onChange={formik.handleChange}
                          />
                          <Icon style={{ fontSize: "2.7rem" }}>
                            <img src={eye} />
                          </Icon>
                          <button
                            style={{
                              background: "none",
                              color: "#FEA14A",
                              border: "none",
                              cursor: "pointer",
                              postion: "relative",
                              marginTop: "-2%",
                              bottom: 1500,
                              marginLeft: "75%",
                              display: "inline",
                            }}
                          ></button>
                        </div>
                      </div>
                      <div style={{ marginTop: "1%" }}>
                        <div class="myTest custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            class="custom-control-label"
                            for="customCheck1"
                            style={{ fontWeight: "9px" }}
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <input
                        type="submit"
                        value="Login"
                        style={{
                          marginTop: "8%",
                          background: "#278EF1",
                          borderRadius: "20px",
                          width: "84%",
                          height: "9%",
                          padding: "3px",
                          color: "white",
                          fontSize: "18px"
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <br></br>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
