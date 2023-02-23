import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import logo from "../../assets/images/Logo.png";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" sm="6">
            <div className="footer__logo text-start">
              <img src={logo} alt="Logo" />
              <h5>Digital school</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                corrupti assumenda tempora sunt laudantium id.
              </p>
            </div>
          </Col>
          <Col lg="4" sm="6">
            <h5 className="footer__title">Contact</h5>
            <ListGroup className="delivery__time-list">
              <ListGroupItem className="delivery__time-item ps-0 border-0">
                <p>Location: Istanbul, Turkiye</p>
              </ListGroupItem>
              <ListGroupItem className="delivery__time-item ps-0 border-0">
                <span>
                  <a href="tel:+905388977939">Phone: 05388977939</a>
                </span>
              </ListGroupItem>
              <ListGroupItem className="delivery__time-item ps-0 border-0">
                <span>
                  <a href="mailto: husseinghazal01@gmail.com">
                    Email: husseinghazal01@gmail.com
                  </a>
                </span>
              </ListGroupItem>
              <ListGroupItem className="delivery__time-item ps-0 border-0">
                <span>
                  <a href="mailto: mohrazzak7@gmail.com">
                    Email: mohrazzak7@gmail.com
                  </a>
                </span>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg="4" sm="6">
            <div className="social__links d-flex flex-column mb-3 mt-3 text-start">
              <h5>Hussein Haj Ghazal</h5>
              <div className="d-flex align-items-center gap-2">
                <p className="m-0">Follow: </p>
                <span>
                  <a href="https://www.facebook.com/profile.php?id=100011188868575">
                    <BsFacebook color="#0859a4" />
                  </a>
                </span>
                <span>
                  <a href="https://www.instagram.com/husseingh01/?hl=tr">
                    <BsInstagram color="#0859a4" />
                  </a>
                </span>
                <span>
                  <a href="https://github.com/Husseinhajghazal">
                    <BsGithub color="#0859a4" />
                  </a>
                </span>
                <span>
                  <a href="https://www.linkedin.com/in/hussein-haj-ghazal-505ba4243/">
                    <BsLinkedin color="#0859a4" />
                  </a>
                </span>
              </div>
            </div>
            <div className="social__links d-flex text-start flex-column">
              <h5>Mohamad Abdrazak</h5>
              <div className="d-flex align-items-center gap-2">
                <p className="m-0">Follow: </p>
                <span>
                  <a href="https://www.facebook.com/TheMonsterSY">
                    <BsFacebook color="#0859a4" />
                  </a>
                </span>
                <span>
                  <a href="https://www.instagram.com/mohrazzak7/?hl=tr">
                    <BsInstagram color="#0859a4" />
                  </a>
                </span>
                <span>
                  <a href="https://github.com/mohrazzak">
                    <BsGithub color="#0859a4" />
                  </a>
                </span>
                <span>
                  <a href="https://www.linkedin.com/in/mohamad-abdalrazak-652879229/">
                    <BsLinkedin color="#0859a4" />
                  </a>
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg="12">
            <p className="copyright__text">
              Copyright - 2022, website made by Hussein Haj GHazal & Mohamad
              Abdrazak. All Rights Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
