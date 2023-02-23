import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import AnimatePage from "../components/AnimatedPage/AnimatedPage";
import { Container, Row, Col } from "reactstrap";
import progImage from "../assets/images/program-image.png";
import { Box, Button, TextField } from "@mui/material";
import { AiFillIdcard } from "react-icons/ai";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
} from "react-icons/ri";
import { BiBookAdd } from "react-icons/bi";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddProgram = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [textError, setTextError] = useState("");
  const [typeError, setTypeError] = useState("");

  const [id, setId] = useState("");
  const [ide, setIde] = useState(false);

  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [sub3, setSub3] = useState("");
  const [sub4, setSub4] = useState("");
  const [sub5, setSub5] = useState("");
  const [sub6, setSub6] = useState("");
  const [sub7, setSub7] = useState("");
  const [sub8, setSub8] = useState("");
  const [sub9, setSub9] = useState("");
  const [sub10, setSub10] = useState("");
  const [sub11, setSub11] = useState("");
  const [sub12, setSub12] = useState("");
  const [sub13, setSub13] = useState("");
  const [sub14, setSub14] = useState("");
  const [sub15, setSub15] = useState("");
  const [sub16, setSub16] = useState("");
  const [sub17, setSub17] = useState("");
  const [sub18, setSub18] = useState("");
  const [sub19, setSub19] = useState("");
  const [sub20, setSub20] = useState("");
  const [sub21, setSub21] = useState("");
  const [sub22, setSub22] = useState("");
  const [sub23, setSub23] = useState("");
  const [sub24, setSub24] = useState("");
  const [sub25, setSub25] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    let url;

    if (id.length === 3) {
      url = "https://e-school-syr.herokuapp.com/admin/add/teacher-program";
    } else {
      url = "https://e-school-syr.herokuapp.com/admin/add/student-program";
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        prettyId: id,
        monday: [
          sub1 || null,
          sub2 || null,
          sub3 || null,
          sub4 || null,
          sub5 || null,
        ],
        tuesday: [
          sub6 || null,
          sub7 || null,
          sub8 || null,
          sub9 || null,
          sub10 || null,
        ],
        wednesday: [
          sub11 || null,
          sub12 || null,
          sub13 || null,
          sub14 || null,
          sub15 || null,
        ],
        thursday: [
          sub16 || null,
          sub17 || null,
          sub18 || null,
          sub19 || null,
          sub20 || null,
        ],
        friday: [
          sub21 || null,
          sub22 || null,
          sub23 || null,
          sub24 || null,
          sub25 || null,
        ],
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          setTypeError("success");
          setTextError(resData.message);
          setOpen(true);
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

  useEffect(() => {
    setOpen(false);
    setIde(false);
  }, [id]);

  const getIdProgram = (e) => {
    e.preventDefault();

    let link;

    if (id.length === 0) {
      setTextError("This field should not be empty");
      setTypeError("error");
      setOpen(true);
      setIde(true);
      return;
    }

    if (id.length === 3) {
      link = "https://e-school-syr.herokuapp.com/admin/teacher/program";
    } else {
      link = "https://e-school-syr.herokuapp.com/admin/class/program";
    }
    fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        prettyId: id,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((e) => {
          setTextError(e.message);
          setTypeError("success");
          setOpen(true);
          if (e.program.length > 0) {
            setSub1(e.program[0][0] || "");
            setSub2(e.program[0][1] || "");
            setSub3(e.program[0][2] || "");
            setSub4(e.program[0][3] || "");
            setSub5(e.program[0][4] || "");
            setSub6(e.program[1][0] || "");
            setSub7(e.program[1][1] || "");
            setSub8(e.program[1][2] || "");
            setSub9(e.program[1][3] || "");
            setSub10(e.program[1][4] || "");
            setSub11(e.program[2][0] || "");
            setSub12(e.program[2][1] || "");
            setSub13(e.program[2][2] || "");
            setSub14(e.program[2][3] || "");
            setSub15(e.program[2][4] || "");
            setSub16(e.program[3][0] || "");
            setSub17(e.program[3][1] || "");
            setSub18(e.program[3][2] || "");
            setSub19(e.program[3][3] || "");
            setSub20(e.program[3][4] || "");
            setSub21(e.program[4][0] || "");
            setSub22(e.program[4][1] || "");
            setSub23(e.program[4][2] || "");
            setSub24(e.program[4][3] || "");
            setSub25(e.program[4][4] || "");
          } else {
            setSub1("");
            setSub2("");
            setSub3("");
            setSub4("");
            setSub5("");
            setSub6("");
            setSub7("");
            setSub8("");
            setSub9("");
            setSub10("");
            setSub11("");
            setSub12("");
            setSub13("");
            setSub14("");
            setSub15("");
            setSub16("");
            setSub17("");
            setSub18("");
            setSub19("");
            setSub20("");
            setSub21("");
            setSub22("");
            setSub23("");
            setSub24("");
            setSub25("");
          }
        });
      } else {
        return res.json().then((e) => {
          setTextError(e.message);
          setTypeError("error");
          setOpen(true);
        });
      }
    });
  };

  return (
    <Layout title="add program">
      <AnimatePage>
        <Container className="addprogram mt-5 mb-5">
          <Row className="news_head d-flex justify-content-center align-items-center">
            <Col lg="4" sm="6">
              <img src={progImage} alt="news_image" className="w-75  mb-4" />
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
              <BiBookAdd className="me-2 mb-2 icon" size="2rem" />
              <h6>Program</h6>
              <span />
            </Col>
          </Row>
          <form onSubmit={getIdProgram} className="text-center">
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
                    error={ide}
                    value={id}
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  />
                </Box>
              </Col>
            </Row>
            <Button type="submit" variant="contained" className="m-auto">
              Load
            </Button>
          </form>
          <form onSubmit={submitHandler}>
            <Row className="mt-4 mb-4">
              <h5 className="p-0 m-0">Mon :</h5>
              <Col
                lg="12"
                className="d-flex align-items-center justify-contnet-center"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber1 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub1}
                    onChange={(e) => {
                      setSub1(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber2 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub2}
                    onChange={(e) => {
                      setSub2(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber3 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub3}
                    onChange={(e) => {
                      setSub3(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber4 className="me-2" size="1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub4}
                    onChange={(e) => {
                      setSub4(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber5 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub5}
                    onChange={(e) => {
                      setSub5(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
              </Col>
            </Row>
            <Row className="mt-4 mb-4">
              <h5 className="p-0 m-0">Tue :</h5>
              <Col
                lg="12"
                className="d-flex align-items-center justify-contnet-center"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber1 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub6}
                    onChange={(e) => {
                      setSub6(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber2 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub7}
                    onChange={(e) => {
                      setSub7(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber3 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub8}
                    onChange={(e) => {
                      setSub8(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber4 className="me-2" size="1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub9}
                    onChange={(e) => {
                      setSub9(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber5 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub10}
                    onChange={(e) => {
                      setSub10(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
              </Col>
            </Row>
            <Row className="mt-4 mb-4">
              <h5 className="p-0 m-0">Wed :</h5>
              <Col
                lg="12"
                className="d-flex align-items-center justify-contnet-center"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber1 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub11}
                    onChange={(e) => {
                      setSub11(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber2 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub12}
                    onChange={(e) => {
                      setSub12(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber3 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub13}
                    onChange={(e) => {
                      setSub13(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber4 className="me-2" size="1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub14}
                    onChange={(e) => {
                      setSub14(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber5 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub15}
                    onChange={(e) => {
                      setSub15(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
              </Col>
            </Row>
            <Row className="mt-4 mb-4">
              <h5 className="p-0 m-0">Thu :</h5>
              <Col
                lg="12"
                className="d-flex align-items-center justify-contnet-center"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber1 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub16}
                    onChange={(e) => {
                      setSub16(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber2 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub17}
                    onChange={(e) => {
                      setSub17(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber3 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub18}
                    onChange={(e) => {
                      setSub18(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber4 className="me-2" size="1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub19}
                    onChange={(e) => {
                      setSub19(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber5 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub20}
                    onChange={(e) => {
                      setSub20(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
              </Col>
            </Row>
            <Row className="mt-4 mb-4">
              <h5 className="p-0 m-0">Fri :</h5>
              <Col
                lg="12"
                className="d-flex align-items-center justify-contnet-center"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber1 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub21}
                    onChange={(e) => {
                      setSub21(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber2 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub22}
                    onChange={(e) => {
                      setSub22(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber3 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub23}
                    onChange={(e) => {
                      setSub23(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber4 className="me-2" size="1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub24}
                    onChange={(e) => {
                      setSub24(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <RiNumber5 className="me-2" size=" 1.5rem" color="#145DA0" />
                  <TextField
                    id="input-with-sx fourth"
                    label="session"
                    value={sub25}
                    onChange={(e) => {
                      setSub25(e.target.value);
                    }}
                    variant="standard"
                  />
                </Box>
              </Col>
            </Row>
            <Button type="submit" variant="contained" className="mt-4">
              Edit Program
            </Button>
          </form>
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
      </AnimatePage>
    </Layout>
  );
};

export default AddProgram;
