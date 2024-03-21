import React, { useState, useRef } from "react";
import { TextField, Alert, Button , FormLabel} from "@mui/material";
import "@fontsource/roboto/300.css";
import Typography from "@mui/material/Typography";
import axios from "axios";
export const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [isUserClick, setIsUserClick] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");
  const callAPI = useRef(false);
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLogin({ ...userLogin, [name]: value });
    setIsUserClick(false);
    setLoginSuccessMessage(false)
  };

  const fetchResponse = () => {
    console.log("Call");
    const data = {
      email: userLogin.email,
      password: userLogin.password,
    };
    axios
      .post("http://localhost:3001/posts", data)
      .then((res) => {
        setLoginSuccessMessage(res);
        console.log("Response", res);
      })
  };

  // validate email and password
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Users Crediential : ", userLogin);

    //validation for email
    const regexEmail =
    /^[^.\-_*](|.-)(?!.*(?:"\.\.))[A-Za-z]{0,}[_.-]{0,1}[A-Za-z0-9]*[A-Za-z]{1}[A-Za-z0-9]*()[^-.]@[A-Za-z-]{3,}[.]{1}[A-Za-z]{2,}$/gm;
    const checkEmail = regexEmail.test(userLogin.email);
    checkEmail ? setEmailValid(true) : setEmailValid(false);

    // validation for password
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]).{8,32}$/gm;
    const checkPassword = regexPassword.test(userLogin.password);
    checkPassword ? setPasswordValid(true) : setPasswordValid(false);

    setIsUserClick(true);
    callAPI.current = true;
  };
  // if email and password both are correct then call our api
  callAPI.current && emailValid && passwordValid && fetchResponse();
  callAPI.current = false;
  console.log("SuccessMessage : ", loginSuccessMessage);

  return (
    <>
      <Typography variant="h2" style={{ marginBottom: "60px" }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <FormLabel htmlFor="email">Email:</FormLabel> */}
          <TextField
            onChange={handleInput}
            value={userLogin.name}
            id="outlined-input"
            label="email"
            name="email"
            inputProps={{ "data-testid": "email" }}
            placeholder="Email"
            type="email"
            style={{ marginBottom: "10px" }}
          />
          {isUserClick && !emailValid && userLogin.email && (
            <Alert severity="error">Incorrect Email</Alert>
          )}
          {isUserClick && !userLogin.email && (
            <Alert severity="error">Empty Email</Alert>
          )}
        </div>
        <div>
          {/* <FormLabel htmlFor="password">Password:</FormLabel> */}
          <TextField
            type="password"
            onChange={handleInput}
            value={userLogin.name}
            inputProps={{ "data-testid": "password" }}
            id="outlined-input"
            label="Password"
            name="password"
            placeholder="Password"
            style={{ marginBottom: "10px", marginTop: "10px" }}
          />
          {isUserClick && !passwordValid && userLogin.password && (
            <Alert severity="error">Incorrect Password</Alert>
          )}
          {isUserClick && !userLogin.password && (
            <Alert severity="error">Empty Password</Alert>
          )}
          {isUserClick && loginSuccessMessage && (
            <Alert
              severity="success"
              id="showSuccessMessage"
              data-testid="showSuccessMessage"
            >
              loginSuccessMessage
            </Alert>
          )}
        </div>

        <TextField
          style={{ marginTop: "10px", width: "100px" }}
          name="loginIn"
          inputProps={{ "data-testid": "input" }}
          type="submit"
          value="Login"
        />
      </form>
    </>
  );
};
