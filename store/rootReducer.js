import userbarReducer from "./feature/userbar.feature.js";
import sidebarReducer from "./feature/sidebar.feature";

const rootReducer = {
  userbar: userbarReducer,
  sidebar: sidebarReducer,
};

export default rootReducer;
