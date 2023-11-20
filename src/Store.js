import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/Users";
const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
