import React, { Fragment } from "react";
import Routers from "./routes/Routes";
import { AnimatePresence, motion } from "framer-motion";
import UserBar from "./components/UI/userBar/UserBar";
import { useSelector } from "react-redux";
import Menu from "./components/UI/menu/Menu";
import "./style/style.css";

const App = () => {
  const showBar = useSelector((state) => state.userbar.show);
  const showSideBar = useSelector((state) => state.sidebar.show);

  return (
    <Fragment>
      <AnimatePresence>
        {showSideBar && <Menu />}
        {showBar && (
          <motion.div
            className="userOption"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <UserBar />
          </motion.div>
        )}
      </AnimatePresence>
      <Routers />
    </Fragment>
  );
};

export default App;
