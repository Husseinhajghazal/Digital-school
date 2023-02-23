import React, { useEffect, useState } from "react";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import "../style/style.css";
import { Container, Row, Col } from "reactstrap";
import loginImage from "../assets/images/Login-image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BiUserCircle, BiLockAlt } from "react-icons/bi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  TextField,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [backendMessage, setBackendMessage] = useState("");

  const navigate = useNavigate();

  const [idValue, setIdValue] = useState("");
  const [valid, setValid] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [errorTextPass, setErrorTextPass] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((e) => !e);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (idValue.trim().length === 0) {
      setErrorText("ID field should not be empty");
      setOpen(true);
      setValid(true);
      return;
    }

    if (!idValue.match(/^[0-9]*$/gi)) {
      setErrorText("ID field should not contain charecters");
      setOpen(true);
      setValid(true);
      return;
    }

    if (passwordValue.trim().length === 0) {
      setErrorTextPass("Password field should not be empty");
      setOpen(true);
      setValidPass(true);
      return;
    }

    fetch("https://e-school-syr.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prettyId: idValue,
        password: passwordValue,
      }),
    }).then((res) => {
      if (res.ok) {
        setIdValue("");
        setPasswordValue("");
        navigate("/announcements");
        return res.json().then((resData) => {
          localStorage.setItem("token", `Bearer ${resData.token}`);
          localStorage.setItem("role", resData.role);
          localStorage.setItem("name", resData.name);
        });
      } else {
        return res.json().then((resData) => {
          setBackendMessage(resData.message);
          setOpen(true);
          setValid(true);
          setValidPass(true);
        });
      }
    });
  };

  useEffect(() => {
    setOpen(false);
    setErrorText("");
    setValid(false);
  }, [idValue]);

  useEffect(() => {
    setOpen(false);
    setErrorTextPass("");
    setValidPass(false);
  }, [passwordValue]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AnimatedPage>
      <section className="login">
        <Container>
          <Row className="d-flex align-items-center">
            <Col lg="6" sm="12">
              <div className="d-flex align-items-center">
                <img src={loginImage} alt="login" className="w-100" />
              </div>
            </Col>
            <Col lg="6" sm="12">
              <div className="d-flex align-items-center flex-column">
                <h1 className="mb-1 mb-lg-3">Login</h1>
                <form className="text-center" onSubmit={submitHandler}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <BiUserCircle
                      className="me-2 mb-4"
                      size=" 2rem"
                      color="#145DA0"
                    />
                    <TextField
                      id="input-with-sx"
                      label="User ID"
                      variant="standard"
                      fullWidth
                      onChange={(e) => {
                        setIdValue(e.target.value);
                      }}
                      value={idValue}
                      error={valid}
                      helperText={` ${errorText}`}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                    className="mb-2"
                  >
                    <BiLockAlt
                      className="me-2 mb-4"
                      size=" 2rem"
                      color="#145DA0"
                    />
                    <FormControl sx={{ width: "100%" }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">
                        Password
                      </InputLabel>
                      <Input
                        error={validPass}
                        id="standard-adornment-password"
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
                              {showPassword ? (
                                <AiFillEye />
                              ) : (
                                <AiFillEyeInvisible />
                              )}
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
                  <div className="form__text d-flex justify-content-between align-items-center mb-3">
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Remember me"
                      />
                    </FormGroup>
                    <div>
                      <Link to="/forget">Forget my password</Link>
                    </div>
                  </div>
                  <Button type="submit" variant="contained">
                    LOGIN
                  </Button>
                </form>
              </div>
              <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {errorText || errorTextPass || backendMessage}
                </Alert>
              </Snackbar>
            </Col>
          </Row>
        </Container>
      </section>
    </AnimatedPage>
  );
};

export default Login;
