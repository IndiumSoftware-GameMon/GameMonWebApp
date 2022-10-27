import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/index";
import {
  Grid,
  TextField,
} from "@material-ui/core";
import * as Yup from "yup";
import { useFormik } from "formik";
import AuthContext from "../../hooks/useAuth";
import "./Login.css";
import image from "../../asset/img.png";
import indlogo from "../../asset/Group.png";
import mail from "../../asset/mail.png";
import eye from "../../asset/eye.png";
import { Icon } from "@material-ui/core";



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
          auth.login(response.data);
          console.log(userInfo, "userInfo");
          console.log(response.data.token, "token");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.toJSON());
          if (error.toJSON().status === 400) {
            setError("Incorrect Password");
          }
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
            GameMon
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
                <h2 className="left-top">GameMon</h2>
                <img src={image} alt="" className="login_image" />
                <h4 className="left_bottom"> Smart way to test Game App </h4>
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
                        <Icon style={{ fontSize: "2.6rem" }}>
                          <img src={mail} alt="main icon" />
                        </Icon>
                      </div>
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
                            <img src={eye} alt="eye icon"/>
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
