import React, { useEffect, useState } from "react";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import "../style/style.css";
import { Container, Row, Col } from "reactstrap";
import forgetImage from "../assets/images/Forget-image.jpg";
import { MdPassword } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Button, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Forget = () => {
  const navigate = useNavigate();

  const [idValue, setIdValue] = useState("");
  const [valid2, setValid2] = useState(false);
  const [errorText2, setErrorText2] = useState("");

  const [backendMessage, setBackendMessage] = useState("");

  const [codeValue, setCodeValue] = useState("");
  const [valid, setValid] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    if (idValue.trim().length === 0) {
      setErrorText2("ID field should not be empty");
      setOpen(true);
      setValid2(true);
      return;
    }

    if (!idValue.match(/^[0-9]*$/gi)) {
      setErrorText2("ID field should not contain charecters");
      setOpen(true);
      setValid2(true);
      return;
    }

    if (codeValue.trim().length === 0) {
      setErrorText("Reset code field should not be empty");
      setOpen(true);
      setValid(true);
      return;
    }

    if (codeValue.trim().length < 8) {
      setErrorText("Reset code should be more than 8 characters");
      setOpen(true);
      setValid(true);
      return;
    }

    fetch("https://e-school-syr.herokuapp.com/accessLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prettyId: idValue,
        accessToken: codeValue,
      }),
    }).then((res) => {
      if (res.ok) {
        setCodeValue("");
        setIdValue("");
        navigate("/userinfo");
        return res.json().then((resData) => {
          localStorage.setItem("token", `Bearer ${resData.token}`);
          localStorage.setItem("role", resData.role);
          localStorage.setItem("id", resData.prettyId);
          localStorage.setItem("name", resData.name);
          setOpen(true);
        });
      } else {
        return res.json().then((resData) => {
          setBackendMessage(resData.message);
          setValid(true);
          setOpen(true);
        });
      }
    });
  };

  useEffect(() => {
    setOpen(false);
    setValid2(false);
    setErrorText2("");
  }, [idValue]);

  useEffect(() => {
    setOpen(false);
    setValid(false);
    setErrorText("");
  }, [codeValue]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setAlert(false);
  };

  return (
    <AnimatedPage>
      <section className="forget">
        <Container>
          <Row className="d-flex align-items-center">
            <Col lg="6" sm="12">
              <div className="d-flex align-items-center">
                <img src={forgetImage} alt="login" className="w-100" />
              </div>
            </Col>
            <Col lg="6" sm="12">
              <div className="d-flex align-items-center flex-column">
                <h1 className="mb-1 mb-lg-3">Reset Code</h1>
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
                      error={valid2}
                      helperText={` ${errorText2}`}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                    className="mb-4"
                  >
                    <MdPassword
                      className="me-2 mb-4"
                      size="2rem"
                      color="#145DA0"
                    />
                    <TextField
                      id="input-with-sx"
                      label="Reset Code"
                      variant="standard"
                      fullWidth
                      value={codeValue}
                      error={valid}
                      onChange={(e) => {
                        setCodeValue(e.target.value);
                      }}
                      helperText={` ${errorText}`}
                    />
                    <AiOutlineQuestionCircle
                      size=" 1.25rem"
                      color="#145DA0"
                      className="question ms-2 mb-4"
                      onClick={() => {
                        setAlert(true);
                      }}
                    />
                  </Box>
                  <Button type="submit" variant="contained">
                    Reset
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
                  {errorText || errorText2 || backendMessage}
                </Alert>
              </Snackbar>
              <Snackbar
                open={alert}
                autoHideDuration={4000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="info"
                  sx={{ width: "100%" }}
                >
                  You can get this code from your school administration
                </Alert>
              </Snackbar>
            </Col>
          </Row>
        </Container>
      </section>
    </AnimatedPage>
  );
};

export default Forget;
