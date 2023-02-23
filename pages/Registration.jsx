import React, { useState, useEffect } from "react";
import "../style/style.css";
import Layout from "../components/Layout/Layout";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { Container, Row, Col } from "reactstrap";
import RegImage from "../assets/images/Registeration-image.png";
import { IoIosPersonAdd } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { BsGenderAmbiguous, BsCalendarDate } from "react-icons/bs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert2";
import {
  AiFillPhone,
  AiOutlineMail,
  AiFillEyeInvisible,
  AiFillEye,
  AiFillLock,
  AiFillIdcard,
} from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { MdPlace } from "react-icons/md";

import {
  Button,
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import CreateTeacher from "../components/CreateTeacher/CreateTeacher";
import { AnimatePresence, motion } from "framer-motion";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const years = [
  2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Registration = () => {
  const [tClass, setTClass] = useState("");

  const [errorType, setErrorType] = useState("");

  const [show, setShow] = useState("");

  const [passwordValue2, setPasswordValue2] = useState("");
  const [passwordValue2e, setPasswordValue2e] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword2 = () => {
    setShowPassword2((e) => !e);
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const [errorText, setErrorText] = useState("");

  const [classes, setClasses] = useState([]);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [grade, setGrade] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [namee, setNamee] = useState(false);
  const [gendere, setGendere] = useState(false);
  const [emaile, setEmaile] = useState(false);
  const [phonee, setPhonee] = useState(false);
  const [placee, setPlacee] = useState(false);
  const [gradee, setGradee] = useState(false);
  const [daye, setDaye] = useState(false);
  const [monthe, setMonthe] = useState(false);
  const [yeare, setYeare] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      setErrorType("error");
      setNamee(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    if (name.trim().match(/[0-9]/g)) {
      setErrorType("error");
      setNamee(true);
      setErrorText("This field should not contain numbers");
      setOpen(true);
      return;
    }

    if (!name.match(/\w+\s+\w+/g)) {
      setErrorType("error");
      setNamee(true);
      setErrorText("This field should contain name and surname");
      setOpen(true);
      return;
    }
    // //  -------------------------------------------

    if (gender.trim().length === 0) {
      setErrorType("error");
      setGendere(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    // //  -------------------------------------------

    if (email.trim().length === 0) {
      setErrorType("error");
      setEmaile(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    // eslint-disable-next-line no-useless-escape
    if (!email.trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setErrorType("error");
      setEmaile(true);
      setErrorText("The email in not valid");
      setOpen(true);
      return;
    }

    // //  -------------------------------------------

    if (phone.trim().length === 0) {
      setErrorType("error");
      setPhonee(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    if (phone.trim().match(/[a-z]/g)) {
      setErrorType("error");
      setPhonee(true);
      setErrorText("This field should not contain letters");
      setOpen(true);
      return;
    }

    if (!phone.trim().match(/[0-9]/g)) {
      setErrorType("error");
      setPhonee(true);
      setErrorText("This field should contain only numbers");
      setOpen(true);
      return;
    }

    // // ---------------------------------------------

    if (place.trim().length === 0) {
      setErrorType("error");
      setPlacee(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    if (place.trim().match(/[0-9]/g)) {
      setErrorType("error");
      setPlacee(true);
      setErrorText("This field should not contain numbers");
      setOpen(true);
      return;
    }

    // ---------------------------------------------

    if (grade.length === 0) {
      setErrorType("error");
      setGradee(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }
    // ---------------------------------------------

    if (day.length === 0) {
      setErrorType("error");
      setDaye(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }
    // ---------------------------------------------

    if (month.length === 0) {
      setErrorType("error");
      setMonthe(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }
    // ---------------------------------------------

    if (year.length === 0) {
      setErrorType("error");
      setYeare(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    // ---------------------------------------------

    if (passwordValue2.trim().length === 0) {
      setErrorType("error");
      setPasswordValue2e(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    if (passwordValue2.trim().length < 8 || passwordValue2.trim().length > 16) {
      setErrorType("error");
      setPasswordValue2e(true);
      setErrorText("Password should have 8 to 16 characters");
      setOpen(true);
      return;
    }

    if (!passwordValue2.trim().match(/(?=.*?[A-Z])/g)) {
      setErrorType("error");
      setPasswordValue2e(true);
      setErrorText("Password should have 1 big letter");
      setOpen(true);
      return;
    }

    if (!passwordValue2.trim().match(/(?=.*?[0-9])/g)) {
      setErrorType("error");
      setPasswordValue2e(true);
      setErrorText("Password should have 1 number");
      setOpen(true);
      return;
    }

    if (!passwordValue2.trim().match(/(?=.*?[a-z])/g)) {
      setErrorType("error");
      setPasswordValue2e(true);
      setErrorText("Password should have 1 small letter");
      setOpen(true);
      return;
    }

    fetch("https://e-school-syr.herokuapp.com/admin/add/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        password: passwordValue2,
        gender: gender,
        day: day,
        month: month,
        year: year,
        email: email,
        phone: phone,
        place: place,
      }),
    }).then((res0) => {
      if (res0.ok) {
        return res0.json().then((resData0) => {
          setErrorType("success");
          setErrorText(resData0.message);
          setOpen(true);

          fetch("https://e-school-syr.herokuapp.com/connect-s-c", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              studentId: resData0.student.prettyId,
              classId: grade,
            }),
          }).then((res1) => {
            if (res1.ok) {
              return res1.json().then((resData) => {
                setErrorType("success");
                setErrorText(resData.message);
                setOpen(true);
                Swal.fire({
                  icon: "success",
                  title: "Your Info. Do not share it with any one!",
                  text: `Student Id: ${resData0.student.prettyId} & password: ${passwordValue2}`,
                });
              });
            } else {
              return res1.json().then((resData) => {
                setErrorType("error");
                setErrorText(resData.message);
                setOpen(true);
              });
            }
          });
        });
      } else {
        return res0.json().then((resData0) => {
          setErrorType("error");
          setErrorText(resData0.message);
          setOpen(true);
        });
      }
    });
  };

  useEffect(() => {
    setNamee(false);
    setOpen(false);
  }, [name]);

  useEffect(() => {
    setGendere(false);
    setOpen(false);
  }, [gender]);

  useEffect(() => {
    setEmaile(false);
    setOpen(false);
  }, [email]);

  useEffect(() => {
    setPhonee(false);
    setOpen(false);
  }, [phone]);

  useEffect(() => {
    setPlacee(false);
    setOpen(false);
  }, [place]);

  useEffect(() => {
    setGradee(false);
    setOpen(false);
  }, [grade]);

  useEffect(() => {
    setDaye(false);
    setOpen(false);
  }, [day]);

  useEffect(() => {
    setMonthe(false);
    setOpen(false);
  }, [month]);

  useEffect(() => {
    setYeare(false);
    setOpen(false);
  }, [year]);

  useEffect(() => {
    setPasswordValue2e(false);
    setOpen(false);
  }, [passwordValue2]);

  useEffect(() => {
    let classes = [];

    fetch("https://e-school-syr.herokuapp.com/admin/all/classses", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        for (let i = 0; resData.classes.length > i; ++i) {
          classes.push(resData.classes[i].prettyId);
        }
        setClasses(classes);
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  const [state, setState] = useState([]);

  useEffect(() => {
    fetch("https://e-school-syr.herokuapp.com/admin/all/classses", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          setState(resData.classes);
        });
      } else {
        return res.json().then((resData) => {
          setErrorType("error");
          setErrorText(resData.message);
          setOpen(true);
        });
      }
    });
  }, []);

  const [teacherId, setTeacherId] = useState("");

  const Connect = (e) => {
    e.preventDefault();

    fetch("https://e-school-syr.herokuapp.com/connect-t-c", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        teacherId: teacherId,
        classId: tClass,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          setErrorType("success");
          setErrorText(resData.message);
          setOpen(true);
        });
      } else {
        return res.json().then((resData) => {
          setErrorType("error");
          setErrorText(resData.message);
          setOpen(true);
        });
      }
    });
  };

  return (
    <Layout title="registration">
      <AnimatedPage>
        <Container className="register mt-5 mb-5">
          <Row className="news_head d-flex justify-content-center align-items-center">
            <Col lg="4" sm="6">
              <img src={RegImage} alt="news_image" className="w-75  mb-4" />
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
          <Row className="d-flex justify-content-center mt-5">
            <Col lg="4">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <AiFillIdcard className="me-2" size=" 2rem" color="#145DA0" />
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    choose one
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="choose one"
                    value={show}
                    onChange={(e) => {
                      setShow(e.target.value);
                    }}
                  >
                    <MenuItem value="student">student</MenuItem>
                    <MenuItem value="teacher">teacher</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Col>
          </Row>
          <AnimatePresence mode="wait">
            {show === "student" && (
              <motion.form
                className="reg-from"
                onSubmit={submitHandler}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Row className="mb-4">
                  <Col
                    lg="12"
                    className="d-flex align-items-center mb-5 mt-5 head"
                  >
                    <IoIosPersonAdd className="me-2 mb-2 icon" size="2rem" />
                    <h6>New Student</h6>
                    <span />
                  </Col>
                  <Col lg="4" className="mb-4">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <BiUserCircle
                        className="me-2"
                        size=" 2rem"
                        color="#145DA0"
                      />
                      <TextField
                        id="input-with-sx first1"
                        label="Full Name"
                        variant="standard"
                        error={namee}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        fullWidth
                      />
                    </Box>
                  </Col>
                  <Col lg="4">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <BsGenderAmbiguous
                        className="me-2"
                        size=" 2rem"
                        color="#145DA0"
                      />
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          label="Gender"
                          error={gendere}
                          value={gender}
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                          fullWidth
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col lg="4" className="mb-4">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <AiOutlineMail
                        className="me-2"
                        size=" 2rem"
                        color="#145DA0"
                      />
                      <TextField
                        id="input-with-sx second2"
                        label="Email"
                        value={email}
                        error={emaile}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        variant="standard"
                        fullWidth
                      />
                    </Box>
                  </Col>
                  <Col lg="4">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <AiFillPhone
                        className="me-2"
                        size=" 2rem"
                        color="#145DA0"
                      />
                      <TextField
                        id="input-with-sx third3"
                        label="Phone"
                        error={phonee}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        variant="standard"
                        fullWidth
                      />
                    </Box>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col lg="4" className="mb-4">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <MdPlace className="me-2" size=" 2rem" color="#145DA0" />
                      <TextField
                        id="input-with-sx fourth4"
                        label="Place of birth"
                        error={placee}
                        value={place}
                        onChange={(e) => {
                          setPlace(e.target.value);
                        }}
                        variant="standard"
                        fullWidth
                      />
                    </Box>
                  </Col>
                  <Col lg="4" className="mb-4">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <SiGoogleclassroom
                        className="me-2"
                        size=" 2rem"
                        color="#145DA0"
                      />
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">
                          Class
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          label="grade"
                          error={gradee}
                          value={grade}
                          onChange={(e) => {
                            setGrade(e.target.value);
                          }}
                          fullWidth
                        >
                          {classes.map((item, index) => (
                            <MenuItem value={item} key={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col lg="4" className="mb-4">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                      className="mb-2"
                    >
                      <AiFillLock
                        className="me-2"
                        size="2rem"
                        color="#145DA0"
                      />
                      <FormControl variant="standard" sx={{ width: "100%" }}>
                        <InputLabel htmlFor="standard-adornment-password">
                          Password
                        </InputLabel>
                        <Input
                          id="standard-adornment-password seconde2"
                          type={showPassword2 ? "text" : "password"}
                          value={passwordValue2}
                          error={passwordValue2e}
                          onChange={(e) => setPasswordValue2(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword2}
                              >
                                {showPassword2 ? (
                                  <AiFillEye />
                                ) : (
                                  <AiFillEyeInvisible />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Box>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col lg="12">
                    <div className="mb-3 text-black-50">
                      <BsCalendarDate
                        className="me-2"
                        size=" 2rem"
                        color="#145DA0"
                      />
                      Birth Date
                    </div>
                    <div>
                      <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          day
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          autoWidth
                          label="day"
                          error={daye}
                          value={day}
                          onChange={(e) => setDay(e.target.value)}
                        >
                          {days.map((item, index) => (
                            <MenuItem value={item} key={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          month
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          autoWidth
                          error={monthe}
                          label="month"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        >
                          {months.map((item, index) => (
                            <MenuItem value={item} key={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          year
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          autoWidth
                          error={yeare}
                          label="year"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        >
                          {years.map((item, index) => (
                            <MenuItem value={item} key={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </Col>
                </Row>
                <Button type="submit" variant="contained">
                  Register
                </Button>
              </motion.form>
            )}
            {show === "teacher" && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Row>
                  <Col
                    lg="12"
                    className="d-flex align-items-center mb-5 mt-5 head"
                  >
                    <IoIosPersonAdd className="me-2 mb-2 icon" size="2rem" />
                    <h6>New Teacher</h6>
                    <span />
                  </Col>
                </Row>
                <CreateTeacher />
                <Row>
                  <Col
                    lg="12"
                    className="d-flex align-items-center mb-5 mt-5 head"
                  >
                    <IoIosPersonAdd className="me-2 mb-2 icon" size="2rem" />
                    <h6>Connect Teacher</h6>
                    <span />
                  </Col>
                </Row>
                <form onSubmit={Connect}>
                  <Row>
                    <Col lg="4" className="mb-2 mt-2">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                        }}
                        className="mb-5"
                      >
                        <AiFillIdcard
                          className="me-2"
                          size=" 2rem"
                          color="#145DA0"
                        />
                        <TextField
                          id="input-with-sx fourth4"
                          label="Teacher Id"
                          variant="standard"
                          fullWidth
                          value={teacherId}
                          onChange={(e) => {
                            setTeacherId(e.target.value);
                          }}
                        />
                      </Box>
                    </Col>
                    <Col lg="4" className="mb-2 mt-2">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                        }}
                      >
                        <SiGoogleclassroom
                          className="me-2"
                          size=" 2rem"
                          color="#145DA0"
                        />
                        <FormControl variant="standard" fullWidth>
                          <InputLabel id="demo-simple-select-standard-label">
                            Class Id
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Class Id"
                            value={tClass}
                            onChange={(e) => {
                              setTClass(e.target.value);
                            }}
                            fullWidth
                          >
                            {state.map((item) => (
                              <MenuItem
                                value={item.prettyId}
                                key={item.prettyId}
                              >
                                {item.prettyId}-{item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Col>
                  </Row>
                  <Button type="submit" variant="contained" className="mt-3">
                    Connect
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={errorType}
              sx={{ width: "100%" }}
            >
              {errorText}
            </Alert>
          </Snackbar>
        </Container>
      </AnimatedPage>
    </Layout>
  );
};

export default Registration;
