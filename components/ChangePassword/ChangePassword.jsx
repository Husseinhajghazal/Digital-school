import React, { useEffect, useState } from "react";
import "../../style/style.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaLock, FaUnlock, FaLockOpen } from "react-icons/fa";
import {
  Box,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChangePassword = () => {
  const [backendMessage, setBackendMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [errorTextPass, setErrorTextPass] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword((e) => !e);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [passwordValue2, setPasswordValue2] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);
  const [validPass2, setValidPass2] = useState(false);
  const [errorTextPass2, setErrorTextPass2] = useState("");

  const handleClickShowPassword2 = () => {
    setShowPassword2((e) => !e);
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const [passwordValue3, setPasswordValue3] = useState("");
  const [showPassword3, setShowPassword3] = useState(false);
  const [validPass3, setValidPass3] = useState(false);
  const [errorTextPass3, setErrorTextPass3] = useState("");

  const handleClickShowPassword3 = () => {
    setShowPassword3((e) => !e);
  };

  const handleMouseDownPassword3 = (event) => {
    event.preventDefault();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // first input

    if (passwordValue.trim().length === 0) {
      setErrorTextPass("This field should not be empty");
      setValidPass(true);
      setOpen(true);
      return;
    }

    if (passwordValue.trim().length < 8 || passwordValue.trim().length > 16) {
      setErrorTextPass("This field should between 8 and 16");
      setValidPass(true);
      setOpen(true);
      return;
    }

    // seconde input

    if (passwordValue2.trim().length === 0) {
      setErrorTextPass2("This field should not be empty");
      setValidPass2(true);
      setOpen(true);
      return;
    }

    if (passwordValue2.trim().length < 8 || passwordValue2.trim().length > 16) {
      setErrorTextPass2("This field should between 8 and 16");
      setValidPass2(true);
      setOpen(true);
      return;
    }

    if (!passwordValue2.trim().match(/(?=.*?[A-Z])/g)) {
      setErrorTextPass2("This field should contain 1 big letter");
      setValidPass2(true);
      setOpen(true);
      return;
    }

    if (!passwordValue2.trim().match(/(?=.*?[0-9])/g)) {
      setErrorTextPass2("This field should contain 1 digit");
      setValidPass2(true);
      setOpen(true);
      return;
    }

    if (!passwordValue2.trim().match(/(?=.*?[a-z])/g)) {
      setErrorTextPass2("This field should contain 1 small letter");
      setValidPass2(true);
      setOpen(true);
      return;
    }

    // same content

    if (passwordValue3 !== passwordValue2) {
      setErrorTextPass3("This field should match the new password");
      setValidPass3(true);
      setOpen(true);
      return;
    }

    fetch("https://e-school-syr.herokuapp.com/edit-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        oldPassword: passwordValue,
        newPassword: passwordValue2,
      }),
    }).then((res) => {
      if (res.ok) {
        setPasswordValue("");
        setPasswordValue2("");
        setPasswordValue3("");
        return res.json().then((resData) => {
          setBackendMessage(resData.message);
          setSeverity("success");
          setOpen(true);
        });
      } else {
        return res.json().then((resData) => {
          console.log(resData);
          setSeverity("error");
          setBackendMessage(resData.message);
          setValidPass(true);
          setValidPass2(true);
          setValidPass3(true);
          setOpen(true);
        });
      }
    });
  };

  useEffect(() => {
    setErrorTextPass("");
    setValidPass(false);
    setOpen(false);
  }, [passwordValue]);

  useEffect(() => {
    setErrorTextPass2("");
    setValidPass2(false);
    setOpen(false);
  }, [passwordValue2]);

  useEffect(() => {
    setErrorTextPass3("");
    setValidPass3(false);
    setOpen(false);
  }, [passwordValue3]);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <form onSubmit={submitHandler} className="text-center pass-form ms-md-5">
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
          className="mb-2"
        >
          <FaLock className="me-2 mb-4" size=" 1.5rem" color="#145DA0" />
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel htmlFor="standard-adornment-password">
              Old Password / Reset Token
            </InputLabel>
            <Input
              error={validPass}
              id="standard-adornment-password first"
              type={showPassword ? "text" : "password"}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <p className="errorMessage">
              <span className="block">`</span>
              {errorTextPass}
            </p>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
          className="mb-2"
        >
          <FaUnlock className="me-2 mb-4" size=" 1.5rem" color="#145DA0" />
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel htmlFor="standard-adornment-password">
              New Password
            </InputLabel>
            <Input
              error={validPass2}
              id="standard-adornment-password seconde"
              type={showPassword2 ? "text" : "password"}
              value={passwordValue2}
              onChange={(e) => setPasswordValue2(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                  >
                    {showPassword2 ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <p className="errorMessage">
              <span className="block">`</span>
              {errorTextPass2}
            </p>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
          className="mb-2"
        >
          <FaLockOpen className="me-2 mb-4" size=" 1.5rem" color="#145DA0" />
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel htmlFor="standard-adornment-password">
              Confirm New Password
            </InputLabel>
            <Input
              error={validPass3}
              id="standard-adornment-password third"
              type={showPassword3 ? "text" : "password"}
              value={passwordValue3}
              onChange={(e) => setPasswordValue3(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword3}
                    onMouseDown={handleMouseDownPassword3}
                  >
                    {showPassword3 ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <p className="errorMessage">
              <span className="block">`</span>
              {errorTextPass3}
            </p>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained">
          Change Password
        </Button>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {errorTextPass ||
              errorTextPass2 ||
              errorTextPass3 ||
              backendMessage}
          </Alert>
        </Snackbar>
      </form>
    </>
  );
};

export default ChangePassword;
