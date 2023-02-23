import React from "react";
import "../../../style/style.css";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleShow } from "../../../store/feature/userbar.feature";
import { BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

const UserBar = () => {
  const dispatch = useDispatch();

  return (
    <ListGroup className="list">
      <ListGroupItem>
        <p className="pt-2 pb-2 m-0">
          <Link
            to="/userinfo"
            onClick={() => {
              dispatch(toggleShow());
            }}
          >
            User Info
          </Link>
          <FaUserAlt className="ms-2" />
        </p>
      </ListGroupItem>
      <ListGroupItem>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("role");
            localStorage.removeItem("name");
            window.location.reload();
          }}
        >
          <p className="pt-2 pb-2 m-0">
            Logout
            <BiLogOut className="ms-2" />
          </p>
        </button>
      </ListGroupItem>
    </ListGroup>
  );
};

export default UserBar;
