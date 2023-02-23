import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import Loading from "../components/UI/Loading/Loading";
import { Container, Row, Col } from "reactstrap";
import { GiBookCover } from "react-icons/gi";
import examImage from "../assets/images/exam-image.jpg";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Exams = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [textError, setTextError] = useState("");
  const [typeError, setTypeError] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [exams, setExams] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (localStorage.getItem("role") === "student") {
      fetch("https://e-school-syr.herokuapp.com/student/exams", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then((resData) => {
              setTypeError("success");
              setTextError(resData.message);
              setOpen(true);
              const now = new Date();
              const pastDate = resData.exams.filter(
                (e) => now <= new Date(e.At)
              );
              const sorted = pastDate.sort(function (a, b) {
                return new Date(a.At) - new Date(b.At);
              });
              setExams(sorted);
              setIsLoading(false);
            });
          } else {
            return res.json().then((resData) => {
              setTypeError("error");
              setTextError(resData.message);
              setOpen(true);
            });
          }
        })
        .then((resData) => {});
    }
  }, []);

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

  const column = [{ heading: "Subject" }, { heading: "Date" }];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout title="Exams">
      <AnimatedPage>
        <Container className="mt-5 pt-5 mb-5 pb-5 exams">
          <Row className="news_head d-flex justify-content-center align-items-center">
            <Col lg="4" sm="6">
              <img src={examImage} alt="news_image" className="w-100  mb-4" />
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
          <Row>
            <Col lg="12" className="d-flex align-items-center mb-5 mt-5 head">
              <GiBookCover className="me-2 mb-2 icon" size="2rem" />
              <h6>Your Exams</h6>
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
                    <tr key={item._id}>
                      <td>{item.subject}</td>
                      <td>
                        {new Date(item.At).getFullYear()}/
                        {months[new Date(item.At).getMonth()]}/
                        {new Date(item.At).getDate()}
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
              {textError}
            </Alert>
          </Snackbar>
        </Container>
      </AnimatedPage>
    </Layout>
  );
};

export default Exams;
