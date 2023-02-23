import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import AnimatePage from "../components/AnimatedPage/AnimatedPage";
import { Container, Row, Col } from "reactstrap";
import {
  AiFillFileAdd,
  AiOutlinePercentage,
  AiFillDelete,
} from "react-icons/ai";
import examImage from "../assets/images/exam-image.jpg";
import { TbMathFunction } from "react-icons/tb";
import { BsCalendarDate } from "react-icons/bs";
import Loading from "../components/UI/Loading/Loading";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../style/style.css";
import {
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import { SiGoogleclassroom } from "react-icons/si";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddExams = () => {
  const [typeError, setTypeError] = useState("");

  const [subject, setSubject] = useState("");
  const [fMark, setFMark] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [subjecte, setSubjecte] = useState(false);
  const [fMarke, setFMarke] = useState(false);
  const [daye, setDaye] = useState(false);
  const [monthe, setMonthe] = useState(false);
  const [yeare, setYeare] = useState(false);

  const [errorText, setErrorText] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [exams, setExams] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (subject.trim().length === 0) {
      setTypeError("error");
      setSubjecte(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    // ---------------------------------------------

    if (fMark.trim().length === 0) {
      setTypeError("error");
      setFMarke(true);
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    if (fMark.trim().toLocaleLowerCase().match(/[a-z]/g)) {
      setTypeError("error");
      setFMarke(true);
      setErrorText("This field should not contain letters");
      setOpen(true);
      return;
    }

    if (!fMark.trim().match(/[0-9]/g)) {
      setTypeError("error");
      setFMarke(true);
      setErrorText("This field should contain only numbers");
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

    fetch("https://e-school-syr.herokuapp.com/admin/add/exam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        subject: subject,
        fullMark: fMark,
        day: day,
        month: month,
        year: year,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          fetch("https://e-school-syr.herokuapp.com/connect-e-c", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              examId: resData.exam.prettyId,
              classId: tClass,
            }),
          }).then((res1) => {
            if (res.ok) {
              return res1.json().then((resData1) => {
                Swal.fire({
                  icon: "success",
                  title: "Exam Info.",
                  text: `Exam Id: ${resData.exam.prettyId}, Class Id: ${tClass}`,
                });
              });
            } else {
              return res1.json().then((resData1) => {
                setTypeError("error");
                setErrorText(resData1.message);
                setOpen(true);
              });
            }
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

  const [state, setState] = useState([]);
  const [tClass, setTClass] = useState("");

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
          setTypeError("error");
          setErrorText(resData.message);
          setOpen(true);
        });
      }
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://e-school-syr.herokuapp.com/admin/all/exams", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          setTypeError("success");
          setErrorText(resData.message);
          const now = new Date();
          const pastDate = resData.exams.filter((e) => now <= new Date(e.At));
          const sorted = pastDate.sort(function (a, b) {
            return new Date(a.At) - new Date(b.At);
          });
          setExams(sorted);
          setIsLoading(false);
        });
      } else {
        return res.json().then((resData) => {
          setTypeError("error");
          setErrorText(resData.message);
          setOpen(true);
        });
      }
    });
  }, []);

  useEffect(() => {
    setSubjecte(false);
    setOpen(false);
  }, [subject]);

  useEffect(() => {
    setFMarke(false);
    setOpen(false);
  }, [fMark]);

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
        fetch("https://e-school-syr.herokuapp.com/admin/delete/exam", {
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
            window.location.reload();
          } else {
            return res.json().then((resData) => {
              setTypeError("error");
              setErrorText(resData.message);
              setOpen(true);
            });
          }
        });
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  const column = [
    { heading: "Subject" },
    { heading: "Date" },
    { heading: "Delete" },
  ];

  return (
    <Layout title="add exams">
      <AnimatePage>
        <Container className="addexams mt-5 mb-5">
          <Row className="news_head d-flex justify-content-center align-items-center">
            <Col lg="4" sm="6">
              <img src={examImage} alt="news_image" className="w-75  mb-4" />
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
            <Col lg="12" className="d-flex align-items-center mb-5 mt-5 head">
              <AiFillFileAdd className="me-2 mb-2 icon" size="2rem" />
              <h6>New Exam</h6>
              <span />
            </Col>
          </Row>
          <form onSubmit={submitHandler} className="mb-5">
            <Row>
              <Col lg="4">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                  className="mb-5"
                >
                  <TbMathFunction
                    className="me-2"
                    size=" 2rem"
                    color="#145DA0"
                  />
                  <TextField
                    id="input-with-sx fourth"
                    label="Subject"
                    variant="standard"
                    fullWidth
                    error={subjecte}
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                  />
                </Box>
              </Col>
              <Col lg="4">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                  className="mb-5"
                >
                  <AiOutlinePercentage
                    className="me-2"
                    size=" 2rem"
                    color="#145DA0"
                  />
                  <TextField
                    id="input-with-sx fourth"
                    label="Full Mark"
                    variant="standard"
                    fullWidth
                    error={fMarke}
                    value={fMark}
                    onChange={(e) => {
                      setFMark(e.target.value);
                    }}
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
                        <MenuItem value={item.prettyId} key={item.prettyId}>
                          {item.prettyId}-{item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col lg="12" className="mt-5">
                <div className="mb-3 text-black-50">
                  <BsCalendarDate
                    className="me-2"
                    size=" 2rem"
                    color="#145DA0"
                  />
                  Exam Date
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
                      label="month"
                      error={monthe}
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
              Add new Exam
            </Button>
          </form>
          <Row>
            <Col lg="12" className="d-flex align-items-center mb-5 mt-5 head">
              <AiFillFileAdd className="me-2 mb-2 icon" size="2rem" />
              <h6>All Exams</h6>
              <span />
            </Col>
            <Col
              lg="12"
              className="d-flex align-items-center justify-content-center mb-5 mt-5"
            >
              <table>
                <thead>
                  <tr>
                    {column.map((item, index) => (
                      <th key={index}>{item.heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {exams.map((item) => (
                    <tr key={item.prettyId}>
                      <td>{item.subject}</td>
                      <td>
                        {new Date(item.At).getFullYear()}/
                        {months[new Date(item.At).getMonth()]}/
                        {new Date(item.At).getDate()}
                      </td>
                      <td>
                        <AiFillDelete
                          size="1.5rem"
                          className="del-icon"
                          onClick={() => DelItem(item.prettyId)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={typeError}
              sx={{ width: "100%" }}
            >
              {errorText}
            </Alert>
          </Snackbar>
        </Container>
      </AnimatePage>
    </Layout>
  );
};

export default AddExams;
