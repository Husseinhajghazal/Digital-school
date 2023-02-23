import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { Container, Row, Col } from "reactstrap";
import Avatar from "@mui/material/Avatar";
import classImage from "../assets/images/class-image.png";
import { FaUserFriends } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import Loading from "../components/UI/Loading/Loading";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Class = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [textError, setTextError] = useState("");
  const [typeError, setTypeError] = useState("");

  const [showCards1, setShowCards1] = useState(false);

  const [friends, setFriends] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (localStorage.getItem("role") === "student") {
      fetch("https://e-school-syr.herokuapp.com/student/friends", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((resData) => {
            setTypeError("success");
            setTextError(resData.message);
            setOpen(true);
            setFriends(resData.students);
          });
        } else {
          return res.json().then((resData) => {
            setTypeError("error");
            setTextError(resData.message);
            setOpen(true);
          });
        }
      });

      fetch("https://e-school-syr.herokuapp.com/student/teachers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((resData) => {
            setTypeError("success");
            setTextError(resData.message);
            setOpen(true);
            setIsLoading(false);
            setTeachers(resData.teachers);
          });
        } else {
          return res.json().then((resData) => {
            setTypeError("error");
            setTextError(resData.message);
            setOpen(true);
          });
        }
      });
    }

    if (localStorage.getItem("role") === "teacher") {
      fetch("https://e-school-syr.herokuapp.com/teacher/classes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((resData) => {
            setTypeError("success");
            setTextError(resData.message);
            setOpen(true);
            setClasses(resData.classes);
            setIsLoading(false);
          });
        } else {
          return res.json().then((resData) => {
            setTypeError("error");
            setTextError(resData.message);
            setOpen(true);
          });
        }
      });
    }
  }, []);

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
        width: 125,
        height: 125,
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout title="Class">
      <AnimatedPage>
        <section className="class">
          <Container className="mt-5">
            <Row className="news_head d-flex justify-content-center align-items-center">
              <Col lg="4" sm="6">
                <img
                  src={classImage}
                  alt="news_image"
                  className="w-100  mb-4"
                />
              </Col>
              <Col lg="8" sm="6" className="news-head__text">
                <h4>What you will see in this page?</h4>
                <p className="text-black-50">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Molestias doloribus labore ipsa est eos recusandae in, dolorum
                  iure eligendi hic maxime facere non, consequatur repellendus
                  quo accusamus ipsum minus corrupti? Lorem ipsum, dolor sit
                  amet consectetur adipisicing elit. Molestias doloribus labore
                  ipsa est eos recusandae in, dolorum iure eligendi hic maxime
                  facere non, consequatur repellendus quo accusamus ipsum minus
                  corrupti?
                </p>
              </Col>
            </Row>
            <Row className="mb-5 pt-5">
              <Col lg="11" className="d-flex align-items-center mb-3 head">
                <FaUserFriends className="me-2 mb-2 icon" size="2rem" />
                <h6>
                  {localStorage.getItem("role") === "student"
                    ? "Your Class Friends"
                    : "Your Classes"}
                </h6>
                <span />
              </Col>
              {localStorage.getItem("role") === "teacher" && (
                <Col lg="1">
                  <Button
                    onClick={() => setShowCards1((e) => !e)}
                    variant="contained"
                    className="mb-3"
                  >
                    <IoIosArrowDown
                      size="1.3rem"
                      className={`arrow ${showCards1 && "rotate"}`}
                    />
                  </Button>
                </Col>
              )}
              {localStorage.getItem("role") === "student"
                ? friends.map((item) => (
                    <Col
                      lg="3"
                      md="4"
                      sm="6"
                      xs="6"
                      key={item._id}
                      className="mb-3 d-flex flex-column align-items-center "
                    >
                      <div className="friend-card d-flex flex-column align-items-center ">
                        <Avatar {...stringAvatar(item.name)} className="mb-4" />
                        <p>{item.name}</p>
                      </div>
                    </Col>
                  ))
                : classes.map((class1) => (
                    <Col
                      lg="12"
                      className="pe-5 ps-5 pb-2"
                      key={class1.prettyId}
                    >
                      <div className="d-flex justify-content-between grade align-items-center">
                        <div className="text-white">{class1.name}</div>
                      </div>
                      <AnimatePresence>
                        {showCards1 ? (
                          <Row>
                            {class1.students.map((item) => (
                              <Col
                                lg="3"
                                md="4"
                                sm="12"
                                xs="12"
                                className="mb-3 mt-4"
                                key={item.prettyId}
                              >
                                <motion.div
                                  className="friend-card d-flex flex-column align-items-center"
                                  initial={{ y: -100, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{
                                    y: -100,
                                    opacity: 0,
                                    transition: { duration: 0.2 },
                                  }}
                                  transition={{
                                    duration: 0.08,
                                  }}
                                >
                                  <Avatar
                                    {...stringAvatar(item.name)}
                                    className="mb-4"
                                  />
                                  <p>{item.name}</p>
                                </motion.div>
                              </Col>
                            ))}
                          </Row>
                        ) : (
                          ""
                        )}
                      </AnimatePresence>
                    </Col>
                  ))}
            </Row>
            {localStorage.getItem("role") === "student" && (
              <Row className="pt-5 mb-5 pb-5">
                <Col lg="12" className="d-flex align-items-center mb-3">
                  <GiTeacher className="me-2 mb-2 icon" size="2rem" />
                  <h6>Your Class Teachers</h6>
                  <span />
                </Col>
                {teachers.map((item) => (
                  <Col
                    lg="3"
                    md="4"
                    sm="6"
                    xs="6"
                    key={item._id}
                    className="mb-3 d-flex flex-column align-items-center "
                  >
                    <div className="teacher d-flex flex-column align-items-center ">
                      <Avatar {...stringAvatar(item.name)} className="mb-4" />
                      <p>{item.name}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
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
        </section>
      </AnimatedPage>
    </Layout>
  );
};

export default Class;
