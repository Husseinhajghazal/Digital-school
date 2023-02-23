import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { Container, Row, Col } from "reactstrap";
import classImage from "../assets/images/class-image.png";
import { Box, TextField, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import { BiUserCircle } from "react-icons/bi";
import {
  BsGenderAmbiguous,
  BsFillTelephoneFill,
  BsFilePersonFill,
  BsFillPencilFill,
} from "react-icons/bs";
import { MdDateRange, MdPlace, MdEmail } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { AnimatePresence, motion } from "framer-motion";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profiles = () => {
  const [textError, setTextError] = useState("");
  const [typeError, setTypeError] = useState("");

  const [userId, setUserId] = useState("");
  const [userIde, setUserIde] = useState(false);

  const [errorText, setErrorText] = useState("");

  const [edit, setEdit] = useState(false);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userDay, setUserDay] = useState("");
  const [userMonth, setUserMonth] = useState("");
  const [userYear, setUserYear] = useState("");
  const [userPlace, setUserPlace] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpen2(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (userId.trim().length === 0) {
      setUserIde(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    fetch("https://e-school-syr.herokuapp.com/admin/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        prettyId: userId,
      }),
    }).then((e) => {
      if (e.ok) {
        return e.json().then((resData) => {
          setTextError(resData.message);
          setTypeError("success");
          setOpen2(true);
          setUserName(resData.user.name);
          setUserGender(resData.user.gender);
          setUserDay(resData.user.birth.day);
          setUserMonth(resData.user.birth.month);
          setUserYear(resData.user.birth.year);
          setUserPlace(resData.user.place);
          setUserEmail(resData.user.email);
          setUserPhone(resData.user.phone);
          setUserRole(resData.user.role);
        });
      } else {
        return e.json().then((resData) => {
          setTextError(resData.message);
          setTypeError("error");
          setOpen2(true);
        });
      }
    });
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        width: 150,
        height: 150,
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const Generate = () => {
    fetch("https://e-school-syr.herokuapp.com/generateToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        prettyId: userId,
      }),
    })
      .then((e) => e.json())
      .then((e) => {
        Swal.fire({
          icon: "success",
          title: "It is usable for 24 hours",
          text: `The New Reset Token: ${e.accessToken}`,
        });
      });
  };

  const DelItem = (key) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        fetch("https://e-school-syr.herokuapp.com/admin/delete/user", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            prettyId: key,
          }),
        }).then((res) => {
          if (res.ok) {
            return res.json().then((resData) => {
              setTypeError("success");
              setTextError(resData.message);
              setOpen2(true);
              window.location.reload();
            });
          } else {
            return res.json().then((resData) => {
              setTypeError("error");
              setTextError(resData.message);
              setOpen2(true);
            });
          }
        });
      }
    });
  };

  const UpdateInfo = (e) => {
    e.preventDefault();

    fetch("https://e-school-syr.herokuapp.com/admin/info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        prettyId: userId,
        name: userName,
        gender: userGender,
        day: userDay,
        month: userMonth,
        year: userYear,
        place: userPlace,
        email: userEmail,
        phone: userPhone,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          setTypeError("success");
          setTextError(resData.message);
          setOpen2(true);
          setEdit(false);
        });
      } else {
        return res.json().then((resData) => {
          setTextError(resData.message);
          setTypeError("error");
          setOpen2(true);
        });
      }
    });
  };

  useEffect(() => {
    setUserIde(false);
    setOpen(false);
  }, [userId]);

  return (
    <Layout title="profiles">
      <AnimatedPage>
        <Container className="profiles mt-5 mb-5">
          <Row className="news_head d-flex justify-content-center align-items-center">
            <Col lg="4" sm="6">
              <img src={classImage} alt="news_image" className="w-100  mb-4" />
            </Col>
            <Col lg="8" sm="6" className="news-head__text">
              <h4>What you will see in this page?</h4>
              <p className="text-black-50">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias doloribus labore ipsa est eos recusandae in, dolorum
                iure eligendi hic maxime facere non, consequatur repellendus quo
                accusamus ipsum minus corrupti? Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Molestias doloribus labore ipsa
                est eos recusandae in, dolorum iure eligendi hic maxime facere
                non, consequatur repellendus quo accusamus ipsum minus corrupti?
              </p>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mb-5 mt-5">
            <Col lg="6">
              <form className="text-center" onSubmit={submitHandler}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                  className="mb-5"
                >
                  <BiUserCircle className="me-2" size=" 2rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="User Id"
                    variant="standard"
                    error={userIde}
                    fullWidth
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                    }}
                  />
                </Box>
                <Button type="submit" variant="contained">
                  Load
                </Button>
              </form>
            </Col>
          </Row>
          <AnimatePresence>
            {userRole && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.3,
                }}
              >
                <form onSubmit={UpdateInfo}>
                  <Row>
                    <Col lg="2" className="avatar" sm="12">
                      <Avatar {...stringAvatar(userName)} />
                    </Col>
                    <Col lg="8" className="user_content" sm="12">
                      <div className="name">
                        <h4>
                          <BsFilePersonFill className="me-2" color="#0859a4" />
                          Name:
                          {edit === false ? (
                            <span className="ms-1 ms-md-3">{userName}</span>
                          ) : (
                            <input
                              type="text"
                              className="ms-2"
                              value={userName}
                              onChange={(e) => {
                                setUserName(e.target.value);
                              }}
                            />
                          )}
                        </h4>
                      </div>
                      <div className="gender">
                        <h4>
                          <BsGenderAmbiguous className="me-2" color="#0859a4" />
                          Gender:
                          {edit === false ? (
                            <span className="ms-1 ms-md-3">{userGender}</span>
                          ) : (
                            <input
                              type="text"
                              className="ms-2"
                              value={userGender}
                              onChange={(e) => {
                                setUserGender(e.target.value);
                              }}
                            />
                          )}
                        </h4>
                      </div>
                      <div className="date">
                        <h4>
                          <MdDateRange className="me-2" color="#0859a4" />
                          Date of birth:
                          {edit === false ? (
                            <span className="ms-1 ms-md-3">
                              {userDay}/{userMonth}/{userYear}
                            </span>
                          ) : (
                            <>
                              <input
                                type="text"
                                className="ms-2 dateI"
                                value={userDay}
                                onChange={(e) => {
                                  setUserDay(e.target.value);
                                }}
                              />
                              <input
                                type="text"
                                className="ms-2 dateI"
                                value={userMonth}
                                onChange={(e) => {
                                  setUserMonth(e.target.value);
                                }}
                              />
                              <input
                                type="text"
                                className="ms-2 dateI"
                                value={userYear}
                                onChange={(e) => {
                                  setUserYear(e.target.value);
                                }}
                              />
                            </>
                          )}
                        </h4>
                      </div>
                      <div className="place">
                        <h4>
                          <MdPlace className="me-2" color="#0859a4" />
                          Place of birth:
                          {edit === false ? (
                            <span className="ms-1 ms-md-3">{userPlace}</span>
                          ) : (
                            <input
                              type="text"
                              className="ms-2"
                              value={userPlace}
                              onChange={(e) => {
                                setUserPlace(e.target.value);
                              }}
                            />
                          )}
                        </h4>
                      </div>
                      <div className="email">
                        <h4>
                          <MdEmail className="me-2" color="#0859a4" />
                          Email:
                          {edit === false ? (
                            <span className="ms-1 ms-md-3">{userEmail}</span>
                          ) : (
                            <input
                              type="text"
                              className="ms-2"
                              value={userEmail}
                              onChange={(e) => {
                                setUserEmail(e.target.value);
                              }}
                            />
                          )}
                        </h4>
                      </div>
                      <div className="phone">
                        <h4>
                          <BsFillTelephoneFill
                            className="me-2"
                            color="#0859a4"
                          />
                          Phone:
                          {edit === false ? (
                            <span className="ms-1 ms-md-3">{userPhone}</span>
                          ) : (
                            <input
                              type="text"
                              className="ms-2"
                              value={userPhone}
                              onChange={(e) => {
                                setUserPhone(e.target.value);
                              }}
                            />
                          )}
                        </h4>
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center align-items-center">
                    <Button type="submit" variant="contained">
                      Update
                    </Button>
                    <BsFillPencilFill
                      className="ms-3 text-black-50"
                      size="1rem"
                      onClick={() => {
                        setEdit(true);
                      }}
                      cursor="pointer"
                    />
                    <AiFillDelete
                      size="1.5rem"
                      className="del-icon ms-2"
                      onClick={() => DelItem(userId)}
                    />
                  </div>
                </form>
                <Button className="mt-5" variant="contained" onClick={Generate}>
                  Generate new Reset Token
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorText}
            </Alert>
          </Snackbar>
          <Snackbar open={open2} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={typeError}
              sx={{ width: "100%" }}
            >
              {textError}
            </Alert>
          </Snackbar>
        </Container>
      </AnimatedPage>
    </Layout>
  );
};

export default Profiles;
