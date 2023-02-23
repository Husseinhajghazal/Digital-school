import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { Container, Row, Col } from "reactstrap";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";
import { AiFillDelete } from "react-icons/ai";
import { Box, TextField, Button } from "@mui/material";
import classImage from "../assets/images/class-image.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Loading from "../components/UI/Loading/Loading";
import Swal from "sweetalert2";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddClass = () => {
  const [typeError, setTypeError] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [classes, setClasses] = useState([]);

  const [className, setClassName] = useState("");
  const [classNamee, setClassNamee] = useState(false);

  const [errorText, setErrorText] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (className.trim().length === 0) {
      setClassNamee(true);
      setTypeError("error");
      setErrorText("This field should not be empty");
      setOpen(true);
      return;
    }

    fetch("https://e-school-syr.herokuapp.com/admin/add/class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: className,
      }),
    }).then((e) => {
      if (e.ok) {
        return e.json().then((resData) => {
          window.location.reload();
        });
      } else {
        return e.json().then((resData) => {
          setTypeError("error");
          setErrorText(resData.message);
          setOpen(true);
        });
      }
    });
  };

  useEffect(() => {
    fetch("https://e-school-syr.herokuapp.com/admin/all/classses", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          setTypeError("success");
          setErrorText(resData.message);
          setClasses(resData.classes);
          setIsLoading(false);
          setOpen(true);
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
        fetch("https://e-school-syr.herokuapp.com/admin/delete/class", {
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
              window.location.reload();
            });
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

  const column = [
    { heading: "Class Id" },
    { heading: "Class Name" },
    { heading: "Delete" },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout title="add class">
      <AnimatedPage>
        <Container className="addclass mt-5 mb-5">
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
          <Row className="mb-5 pt-5">
            <Col lg="12" className="d-flex align-items-center mb-3 head">
              <IoMdAddCircleOutline className="me-2 mb-2 icon" size="2rem" />
              <h6>New class</h6>
              <span />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mb-5">
            <Col lg="6">
              <form className="text-center" onSubmit={submitHandler}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                  className="mb-5"
                >
                  <SiGoogleclassroom
                    className="me-2"
                    size=" 2rem"
                    color="#145DA0"
                  />
                  <TextField
                    id="input-with-sx fourth"
                    label="Class name"
                    variant="standard"
                    error={classNamee}
                    fullWidth
                    value={className}
                    onChange={(e) => {
                      setClassName(e.target.value);
                    }}
                  />
                </Box>
                <Button type="submit" variant="contained">
                  Add new class
                </Button>
              </form>
            </Col>
          </Row>
          <Row>
            <Col lg="12" className="d-flex align-items-center mb-5 mt-5 head">
              <SiGoogleclassroom className="me-2 mb-2 icon" size="2rem" />
              <h6>All Classes</h6>
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
                  {classes.map((item) => (
                    <tr key={item.prettyId}>
                      <td>{item.prettyId}</td>
                      <td>{item.name}</td>
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
      </AnimatedPage>
    </Layout>
  );
};

export default AddClass;
