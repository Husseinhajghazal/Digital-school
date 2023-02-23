import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { Container, Row, Col } from "reactstrap";
import { BsBookmarkPlus, BsPercent } from "react-icons/bs";
import { AiFillIdcard, AiFillDelete } from "react-icons/ai";
import markImage from "../assets/images/mark-image.png";
import { GiBookCover } from "react-icons/gi";
import { Box, TextField, Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Swal from "sweetalert2";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminMarks = () => {
  const [typeError, setTypeError] = useState("");
  const [textError, setTextError] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [eSId, setESId] = useState("");
  const [examId, setExamId] = useState("");
  const [mark, setMark] = useState("");

  const [smi, setSmi] = useState("");

  const [studentAllExams, setStudentAllExams] = useState([]);

  const onsubmitHandler = (e) => {
    e.preventDefault();

    fetch("https://e-school-syr.herokuapp.com/admin/add/mark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        studentId: eSId,
        examId: examId,
        mark: mark,
      }),
    }).then((res) => {
      if (res.ok) {
        Swal.fire({
          icon: "success",
          text: "Mark has been added successfully!",
        });
      } else {
        return res.json().then((resData) => {
          setTypeError("error");
          setTextError(resData.message);
          setOpen(true);
        });
      }
    });
  };

  const getStudnetMarks = (e) => {
    e.preventDefault();

    fetch("https://e-school-syr.herokuapp.com/admin/get/student/marks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        studentId: smi,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          setTypeError("error");
          setTextError(resData.message);
          setOpen(true);
          setStudentAllExams(resData.marks);
        });
      } else {
        return res.json().then((resData) => {
          setTypeError("error");
          setTextError(resData.message);
          setOpen(true);
        });
      }
    });
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
        Swal.fire("Deleted!", "Your Mark has been deleted.", "success");
        fetch("https://e-school-syr.herokuapp.com/admin/delete/mark", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            examId: key,
            studentId: smi,
          }),
        }).then((res) => {
          if (res.ok) {
            window.location.reload();
          } else {
            return res.json().then((resData) => {
              setTypeError("error");
              setTextError(resData.message);
              setOpen(true);
            });
          }
        });
      }
    });
  };

  const column = [
    { heading: "Subject" },
    { heading: "Date" },
    { heading: "Mark" },
    { heading: "Fullmark" },
    { heading: "Delete" },
  ];

  return (
    <Layout title="Add Marks">
      <AnimatedPage>
        <Container className="mt-5 mb-5 addmark">
          <Row className="news_head d-flex justify-content-center align-items-center">
            <Col lg="4" sm="6">
              <img src={markImage} alt="news_image" className="w-100  mb-4" />
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
              <BsBookmarkPlus className="me-2 mb-2 icon" size="2rem" />
              <h6>New Marks</h6>
              <span />
            </Col>
          </Row>
          <form onSubmit={onsubmitHandler} className="text-center">
            <Row>
              <Col lg="4" className="mb-2 mt-2">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                  className="mb-5"
                >
                  <AiFillIdcard className="me-2" size=" 2rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="Id"
                    variant="standard"
                    fullWidth
                    value={eSId}
                    onChange={(e) => {
                      setESId(e.target.value);
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
                  className="mb-5"
                >
                  <GiBookCover className="me-2" size=" 2rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="Exam Id"
                    variant="standard"
                    fullWidth
                    value={examId}
                    onChange={(e) => {
                      setExamId(e.target.value);
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
                  className="mb-5"
                >
                  <BsPercent className="me-2" size=" 2rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="Mark"
                    variant="standard"
                    fullWidth
                    onChange={(e) => {
                      setMark(e.target.value);
                    }}
                  />
                </Box>
              </Col>
            </Row>
            <Button type="submit" variant="contained">
              Add new Marks
            </Button>
          </form>
          <Row>
            <Col lg="12" className="d-flex align-items-center mb-5 mt-5 head">
              <BsBookmarkPlus className="me-2 mb-2 icon" size="2rem" />
              <h6>Delete Marks</h6>
              <span />
            </Col>
          </Row>
          <form className="text-center" onSubmit={getStudnetMarks}>
            <Row className="d-flex justify-content-center">
              <Col lg="4">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                  className="mb-5"
                >
                  <AiFillIdcard className="me-2" size=" 2rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="Id"
                    variant="standard"
                    fullWidth
                    value={smi}
                    onChange={(e) => {
                      setSmi(e.target.value);
                    }}
                  />
                </Box>
              </Col>
            </Row>
            <Button type="submit" variant="contained">
              Load
            </Button>
          </form>
          <AnimatePresence>
            {studentAllExams.length !== 0 ? (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: -100,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <Row>
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
                        {studentAllExams.map((item) => (
                          <tr key={item.examPrettyId}>
                            <td>{item.subject}</td>
                            <td>
                              {new Date(item.At).getFullYear()}/
                              {months[new Date(item.At).getMonth()]}/
                              {new Date(item.At).getDate()}
                            </td>
                            <td
                              className={
                                item.mark >= item.fullMark * 0.4
                                  ? "success"
                                  : "faild"
                              }
                            >
                              {item.mark}
                            </td>
                            <td>{item.fullMark}</td>
                            <td>
                              <AiFillDelete
                                size="1.5rem"
                                className="del-icon"
                                onClick={() => DelItem(item.examPrettyId)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </motion.div>
            ) : (
              <h5 className="text-center mt-5">There Is No Marks</h5>
            )}
          </AnimatePresence>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
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

export default AdminMarks;
