import React from "react";
import "../../style/style.css";
import { Container } from "reactstrap";
import Logo from "../../assets/images/Logo.png";
import { FaBars } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { toggleShow } from "../../store/feature/userbar.feature";
import { toggleShowBar } from "../../store/feature/sidebar.feature";

const Header = () => {
  const name = localStorage.getItem("name");

  const dispatch = useDispatch();

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
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <header className="d-flex">
      <Container className="d-flex align-items-center justify-content-between">
        <div className="image">
          <img src={Logo} alt="logo" />
        </div>
        <div className="d-flex align-items-center">
          <Avatar
            {...stringAvatar(name)}
            onClick={() => {
              dispatch(toggleShow());
            }}
          />
          <FaBars
            size="1.2rem"
            className="ms-3 bar"
            onClick={() => {
              dispatch(toggleShowBar());
            }}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
