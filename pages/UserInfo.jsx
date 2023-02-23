import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { Container, Row, Col } from "reactstrap";
import userImage from "../assets/images/user-image.png";
import "../style/style.css";
import Avatar from "@mui/material/Avatar";
import { FaUser } from "react-icons/fa";
import {
  BsGenderAmbiguous,
  BsFillTelephoneFill,
  BsFilePersonFill,
  BsFillLockFill,
} from "react-icons/bs";
import { MdDateRange, MdPlace, MdEmail } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import Loading from "../components/UI/Loading/Loading";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserInfo = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [textError, setTextError] = useState("");
  const [typeError, setTypeError] = useState("");

  const [user, setUser] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://e-school-syr.herokuapp.com/info", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          setTypeError("success");
          setTextError(resData.message);
          setIsLoading(false);
          setUser(resData.user);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout title="User Info">
      <AnimatedPage>
        <section className="user">
          <Container className="mt-5 mb-5 pb-5 pt-5">
            <Row className="news_head d-flex justify-content-center align-items-center">
              <Col lg="4" sm="6">
                <img src={userImage} alt="news_image" className="w-100  mb-4" />
              </Col>
              <Col lg="8" sm="6" className="news-head__text">
                <h4>What you will see in this page?</h4>
                <p>
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
              <Col lg="12" className="d-flex align-items-center mb-5 head">
                <FaUser className="me-2 mb-2 icon" size="2rem" />
                <h6>Personal Info.</h6>
                <span className="line" />
              </Col>
              <Col lg="2" className="avatar" sm="12">
                <Avatar {...stringAvatar(user.name)} />
              </Col>
              <Col lg="8" className="user_content" sm="12">
                <div className="name">
                  <h4>
                    <BsFilePersonFill className="me-2" color="#0859a4" />
                    Name:
                    <span className="ms-1 ms-md-3">{user.name}</span>
                  </h4>
                </div>
                <div className="gender">
                  <h4>
                    <BsGenderAmbiguous className="me-2" color="#0859a4" />
                    Gender: <span className="ms-1 ms-md-3">{user.gender}</span>
                  </h4>
                </div>
                <div className="date">
                  <h4>
                    <MdDateRange className="me-2" color="#0859a4" />
                    Date of birth:
                    <span className="ms-1 ms-md-3">
                      {user.birth.day}/{user.birth.month}/{user.birth.year}
                    </span>
                  </h4>
                </div>
                <div className="place">
                  <h4>
                    <MdPlace className="me-2" color="#0859a4" />
                    Place of birth:
                    <span className="ms-1 ms-md-3">{user.place}</span>
                  </h4>
                </div>
                {localStorage.getItem("role") === "student" ? (
                  <div className="grade">
                    <h4>
                      <SiGoogleclassroom className="me-2" color="#0859a4" />
                      Class:
                      <span className="ms-1 ms-md-3">{user.class.name}</span>
                    </h4>
                  </div>
                ) : (
                  ""
                )}
                <div className="email">
                  <h4>
                    <MdEmail className="me-2" color="#0859a4" />
                    Email:
                    <span className="ms-1 ms-md-3">{user.email}</span>
                  </h4>
                </div>
                <div className="phone">
                  <h4>
                    <BsFillTelephoneFill className="me-2" color="#0859a4" />
                    Phone: <span className="ms-1 ms-md-3">{user.phone}</span>
                  </h4>
                </div>
              </Col>
              <Col lg="12" className="d-flex align-items-center mb-5 mt-5">
                <BsFillLockFill className="me-2 mb-2 icon" size="2rem" />
                <h6>Change Password</h6>
                <span className="line" />
              </Col>
              <ChangePassword />
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
        </section>
      </AnimatedPage>
    </Layout>
  );
};

export default UserInfo;
