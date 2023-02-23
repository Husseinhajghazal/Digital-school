import React, { useEffect, useState } from "react";
import "../style/style.css";
import Layout from "../components/Layout/Layout";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import { Container, Row, Col } from "reactstrap";
import NewsImage from "../assets/images/News-image.png";
import Loading from "../components/UI/Loading/Loading";
import ReactPaginate from "react-paginate";
import AddNews from "../components/UI/AddNews/AddNews";
import { Button } from "@mui/material";
import { AiFillDelete } from "react-icons/ai";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Announcements = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [textError, setTextError] = useState("");
  const [typeError, setTypeError] = useState("");

  const [showSection, setShowSection] = useState(false);

  const [news, setNews] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [pageNumber, setPagenumber] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://e-school-syr.herokuapp.com/announcements", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((resData) => {
          setTextError(resData.message);
          setTypeError("success");
          setOpen(true);
          setIsLoading(false);
          setNews(resData.announcements);
        });
      } else {
        return res.json().then((e) => {
          setTextError(e.message);
          setTypeError("error");
          setOpen(true);
        });
      }
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const productPerPage = 3;

  const visitedPage = pageNumber * productPerPage;

  const displayPage = news.slice(visitedPage, visitedPage + productPerPage);

  const pageCount = Math.ceil(news.length / productPerPage);

  const changePage = ({ selected }) => {
    setPagenumber(selected);
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
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        fetch("https://e-school-syr.herokuapp.com/admin/delete/announcement", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            prettyId: key,
          }),
        })
          .then((res) => res.json())
          .then((resData) => {
            window.location.reload();
          });
      }
    });
  };

  return (
    <Layout title="announcements">
      <AnimatedPage>
        <section className="news">
          <Container>
            <Row className="news_head d-flex justify-content-center align-items-center">
              <Col lg="4" sm="6">
                <img src={NewsImage} alt="news_image" className="w-100  mb-4" />
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
            <div className="head text-center mb-5 mt-5">
              What are the announcements?
            </div>
            {localStorage.getItem("role") === "admin" && (
              <div>
                {showSection ? (
                  <motion.div
                    transition={{ duration: 0.3 }}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <AddNews changeState={() => setShowSection(false)} />
                  </motion.div>
                ) : (
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        setShowSection(true);
                      }}
                      variant="contained"
                      className="m-auto"
                    >
                      Share Announcement
                    </Button>
                  </div>
                )}
              </div>
            )}
            <Row>
              {displayPage.map((item) => (
                <Col
                  key={item.prettyId}
                  lg="12"
                  className="d-flex align-items-center justify-content-center"
                >
                  <Row className="post mt-5 mb-5 d-flex">
                    <Col className="post__image p-0 text-center" lg="4">
                      <img
                        src={item.image}
                        alt="post_image"
                        className="w-100"
                      />
                    </Col>
                    <Col className="content mt-4 p-4" lg="8">
                      <div className="title text-start">{item.title}</div>
                      <div className="caption mt-3">{item.content}</div>
                      <div className="date mt-2 d-flex align-items-center justify-content-between">
                        <div>
                          {new Date(item.createdAt).getFullYear()}/
                          {months[new Date(item.createdAt).getMonth()]}/
                          {new Date(item.createdAt).getDate()}
                        </div>
                        {localStorage.getItem("role") === "admin" && (
                          <AiFillDelete
                            size="1.5rem"
                            className="del-icon"
                            onClick={() => DelItem(item.prettyId)}
                          />
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel="Prev"
                nextLabel="Next"
                containerClassName="paginationBtns"
              />
            </div>
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

export default Announcements;
