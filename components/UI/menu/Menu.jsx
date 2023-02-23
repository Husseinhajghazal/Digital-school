import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "../../../style/style.css";
import {
  AiFillCloseCircle,
  AiOutlineUserAdd,
  AiFillFileAdd,
} from "react-icons/ai";
import {
  BsPersonLinesFill,
  BsNewspaper,
  BsFileEarmarkTextFill,
  BsFillCalendarWeekFill,
} from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { VscChecklist } from "react-icons/vsc";
import { BiBookAdd } from "react-icons/bi";
import { IoIosPaper, IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toggleShowBar } from "../../../store/feature/sidebar.feature";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();

  return (
    <div className="menu">
      <motion.div
        className="backshadow"
        onClick={() => {
          dispatch(toggleShowBar());
        }}
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="close"
        transition={{ duration: 0.3, delay: 0.4 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ x: 250, opacity: 0, transition: { duration: 0.1 } }}
      >
        <AiFillCloseCircle
          onClick={() => {
            dispatch(toggleShowBar());
          }}
        />
      </motion.div>
      <motion.div
        transition={{ duration: 0.5 }}
        initial={{ x: "70%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "70%", opacity: 0 }}
        className="ul"
      >
        <ListGroup className="rounded-0 text-start">
          <ListGroupItem className="li">
            <NavLink
              to="/announcements"
              onClick={() => {
                dispatch(toggleShowBar());
              }}
              className={(navClass) =>
                navClass.isActive ? "active__menu" : ""
              }
            >
              <BsNewspaper className="me-2" size="1.6rem" />
              announcements
            </NavLink>
          </ListGroupItem>
          {localStorage.getItem("role") === "student" && (
            <ListGroupItem className="li">
              <NavLink
                to="/class"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <SiGoogleclassroom className="me-2" size="1.6rem" />
                My class
              </NavLink>
            </ListGroupItem>
          )}
          {localStorage.getItem("role") === "teacher" && (
            <ListGroupItem className="li">
              <NavLink
                to="/class"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <SiGoogleclassroom className="me-2" size="1.6rem" />
                classes
              </NavLink>
            </ListGroupItem>
          )}
          {localStorage.getItem("role") === "student" && (
            <ListGroupItem className="li">
              <NavLink
                to="/marks"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <BsFileEarmarkTextFill className="me-2" size="1.6rem" />
                My marks
              </NavLink>
            </ListGroupItem>
          )}
          {localStorage.getItem("role") === "student" && (
            <ListGroupItem className="li">
              <NavLink
                to="/exams"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <IoIosPaper className="me-2" size="1.6rem" />
                Exams
              </NavLink>
            </ListGroupItem>
          )}
          {localStorage.getItem("role") === "admin" && (
            <ListGroupItem className="li">
              <NavLink
                to="/registration"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <AiOutlineUserAdd className="me-2" size="1.6rem" />
                Registration
              </NavLink>
            </ListGroupItem>
          )}
          {localStorage.getItem("role") === "admin" && (
            <ListGroupItem className="li">
              <NavLink
                to="/addexams"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <AiFillFileAdd className="me-2" size="1.6rem" />
                Add & edit exams
              </NavLink>
            </ListGroupItem>
          )}
          {localStorage.getItem("role") === "admin" && (
            <ListGroupItem className="li">
              <NavLink
                to="/addclass"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <IoMdAddCircleOutline className="me-2" size="1.6rem" />
                Add Class
              </NavLink>
            </ListGroupItem>
          )}
          {localStorage.getItem("role") === "admin" && (
            <ListGroupItem className="li">
              <NavLink
                to="/adminprogram"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <BiBookAdd className="me-2" size="1.6rem" />
                Add & edit Program
              </NavLink>
            </ListGroupItem>
          )}
          {localStorage.getItem("role") === "admin" && (
            <ListGroupItem className="li">
              <NavLink
                to="/adminmarks"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <VscChecklist className="me-2" size="1.6rem" />
                Add & edit Marks
              </NavLink>
            </ListGroupItem>
          )}
          {localStorage.getItem("role") === "admin" && (
            <ListGroupItem className="li">
              <NavLink
                to="/editprofiles"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <BsPersonLinesFill className="me-2" size="1.6rem" />
                Edit Profiles
              </NavLink>
            </ListGroupItem>
          )}
          {localStorage.getItem("role") === "student" && (
            <ListGroupItem className="border-0 li">
              <NavLink
                to="/program"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <BsFillCalendarWeekFill className="me-2" size="1.6rem" />
                Program
              </NavLink>
            </ListGroupItem>
          )}
          {localStorage.getItem("role") === "teacher" && (
            <ListGroupItem className="border-0 li">
              <NavLink
                to="/program"
                onClick={() => {
                  dispatch(toggleShowBar());
                }}
                className={(navClass) =>
                  navClass.isActive ? "active__menu" : ""
                }
              >
                <BsFillCalendarWeekFill className="me-2" size="1.6rem" />
                Program
              </NavLink>
            </ListGroupItem>
          )}
        </ListGroup>
      </motion.div>
    </div>
  );
};

export default Menu;
