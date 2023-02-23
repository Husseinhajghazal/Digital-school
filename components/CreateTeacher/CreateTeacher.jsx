import React, { useState, useEffect } from "react";
import "../../style/style.css";
import { Row, Col } from "reactstrap";
import { BiUserCircle } from "react-icons/bi";
import { BsGenderAmbiguous, BsCalendarDate } from "react-icons/bs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  AiFillPhone,
  AiOutlineMail,
  AiFillEyeInvisible,
  AiFillEye,
  AiFillLock,
} from "react-icons/ai";
import { MdPlace } from "react-icons/md";
import Swal from "sweetalert2";
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

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const years = [
  1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995,
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateTeacher = () => {
  const [passwordValue2, setPasswordValue2] = useState("");
  const [passwordValue2e, setPasswordValue2e] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [errorText, setErrorText] = useState("");
  const [typeError, setTypeError] = useState("");

  const handleClickShowPassword2 = () => {
    setShowPassword2((e) => !e);
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [namee, setNamee] = useState(false);
  const [gendere, setGendere] = useState(false);
  const [emaile, setEmaile] = useState(false);
  const [phonee, setPhonee] = useState(false);
  const [placee, setPlacee] = useState(false);
  const [daye, setDaye] = useState(false);
  const [monthe, setMonthe] = useState(false);
  const [yeare, setYeare] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      setTypeError("error");
      setNamee(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    if (name.trim().match(/[0-9]/g)) {
      setTypeError("error");
      setNamee(true);
      setErrorText("This field should not contain numbers");
      setOpen(true);
      return;
    }

    if (!name.match(/\w+\s+\w+/g)) {
      setTypeError("error");
      setNamee(true);
      setErrorText("This field should contain name and surname");
      setOpen(true);
      return;
    }
    // //  -------------------------------------------

    if (gender.trim().length === 0) {
      setTypeError("error");
      setGendere(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    // //  -------------------------------------------

    if (email.trim().length === 0) {
      setTypeError("error");
      setEmaile(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    // eslint-disable-next-line no-useless-escape
    if (!email.trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setTypeError("error");
      setEmaile(true);
      setErrorText("The email in not valid");
      setOpen(true);
      return;
    }

    // //  -------------------------------------------

    if (phone.trim().length === 0) {
      setTypeError("error");
      setPhonee(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    if (phone.trim().match(/[a-z]/g)) {
      setTypeError("error");
      setPhonee(true);
      setErrorText("This field should not contain letters");
      setOpen(true);
      return;
    }

    if (!phone.trim().match(/[0-9]/g)) {
      setTypeError("error");
      setPhonee(true);
      setErrorText("This field should contain only numbers");
      setOpen(true);
      return;
    }

    // // ---------------------------------------------

    if (place.trim().length === 0) {
      setTypeError("error");
      setPlacee(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    if (place.trim().match(/[0-9]/g)) {
      setTypeError("error");
      setPlacee(true);
      setErrorText("This field should not contain numbers");
      setOpen(true);
      return;
    }

    // ---------------------------------------------

    if (day.length === 0) {
      setTypeError("error");
      setDaye(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }
    // ---------------------------------------------

    if (month.length === 0) {
      setTypeError("error");
      setMonthe(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }
    // ---------------------------------------------

    if (year.length === 0) {
      setTypeError("error");
      setYeare(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    // ---------------------------------------------

    if (passwordValue2.trim().length === 0) {
      setTypeError("error");
      setPasswordValue2e(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    if (passwordValue2.trim().length < 8 || passwordValue2.trim().length > 16) {
      setTypeError("error");
      setPasswordValue2e(true);
      setErrorText("Password should have 8 to 16 characters");
      setOpen(true);
      return;
    }

    if (!passwordValue2.trim().match(/(?=.*?[A-Z])/g)) {
      setTypeError("error");
      setPasswordValue2e(true);
      setErrorText("Password should have 1 big letter");
      setOpen(true);
      return;
    }

    if (!passwordValue2.trim().match(/(?=.*?[0-9])/g)) {
      setTypeError("error");
      setPasswordValue2e(true);
      setErrorText("Password should have 1 number");
      setOpen(true);
      return;
    }

    if (!passwordValue2.trim().match(/(?=.*?[a-z])/g)) {
      setTypeError("error");
      setPasswordValue2e(true);
      setErrorText("Password should have 1 small letter");
      setOpen(true);
      return;
    }

    fetch("https://e-school-syr.herokuapp.com/admin/add/teacher", {
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
    }).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          setTypeError("success");
          setErrorText(resData.message);
          Swal.fire({
            icon: "success",
            title: "Your Info. Do not share it with any one!",
            text: `Student Id: ${resData.teacher.prettyId} & password: ${passwordValue2}`,
          });
        });
      } else {
        return res.json().then((resData) => {
          setTypeError("error");
          setErrorText(resData.message);
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <form className="reg-from" onSubmit={submitHandler}>
      <Row className="mb-4">
        <Col lg="4" className="mb-4">
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <BiUserCircle className="me-2" size=" 2rem" color="#145DA0" />
            <TextField
              id="input-with-sx first"
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
            <BsGenderAmbiguous className="me-2" size=" 2rem" color="#145DA0" />
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                Gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Gender"
                value={gender}
                error={gendere}
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
            <AiOutlineMail className="me-2" size=" 2rem" color="#145DA0" />
            <TextField
              id="input-with-sx second"
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
            <AiFillPhone className="me-2" size=" 2rem" color="#145DA0" />
            <TextField
              id="input-with-sx third"
              label="Phone"
              value={phone}
              error={phonee}
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
              id="input-with-sx fourth"
              label="Place of birth"
              value={place}
              error={placee}
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
            className="mb-2"
          >
            <AiFillLock className="me-2" size="2rem" color="#145DA0" />
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password seconde"
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
                      {showPassword2 ? <AiFillEye /> : <AiFillEyeInvisible />}
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
            <BsCalendarDate className="me-2" size=" 2rem" color="#145DA0" />
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
                label="year"
                error={yeare}
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
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={typeError}
          sx={{ width: "100%" }}
        >
          {errorText}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default CreateTeacher;
