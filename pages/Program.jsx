import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { Container, Row, Col } from "reactstrap";
import { MdDateRange } from "react-icons/md";
import progImage from "../assets/images/program-image.png";
import Loading from "../components/UI/Loading/Loading";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Program = () => {
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

  const [program, setProgram] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://e-school-syr.herokuapp.com/${localStorage.getItem(
        "role"
      )}/program`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          setTypeError("success");
          setTextError(resData.message);
          setOpen(true);
          setIsLoading(false);
          setProgram(resData.program);
        });
      } else {
        return res.json().then((resData) => {
          setTypeError("error");
          setTextError(resData.message);
          setOpen(true);
        });
      }
    });
  }, []);

  const column = [
    { heading: "08:00-09:00" },
    { heading: "09:00-10:00" },
    { heading: "10:30-11:30" },
    { heading: "11:30-12:30" },
    { heading: "12:30-1:30" },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout title="Program">
      <AnimatedPage>
        <Container className="mb-5 mt-5 pb-5 pt-5 program">
          <Row className="news_head d-flex justify-content-center align-items-center">
            <Col lg="4" sm="6">
              <img src={progImage} alt="news_image" className="w-100  mb-4" />
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
              <MdDateRange className="me-2 mb-2 icon" size="2rem" />
              <h6>Week program</h6>
              <span />
            </Col>
            <Col
              lg="12"
              className="d-flex align-items-center justify-content-center mb-5 mt-5"
            >
              <table>
                <thead>
                  <tr>
                    <th>Day\time</th>
                    {column.map((item, index) => (
                      <th key={index}>{item.heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mon</td>
                    {program[0].map((e, i) => (
                      <td key={i}>{e || "-"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Tue</td>
                    {program[1].map((e, i) => (
                      <td key={i}>{e || "-"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Wed</td>
                    {program[2].map((e, i) => (
                      <td key={i}>{e || "-"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Thu</td>
                    {program[3].map((e, i) => (
                      <td key={i}>{e || "-"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Fri</td>
                    {program[4].map((e, i) => (
                      <td key={i}>{e || "-"}</td>
                    ))}
                  </tr>
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

export default Program;
