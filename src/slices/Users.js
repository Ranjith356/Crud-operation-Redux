import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    edituser: (state, action) => {
      const { updateid, name, status, Date } = action.payload;
      const exitinguserdetails = state.find((user) => user.Id === updateid);
      if (exitinguserdetails) {
        exitinguserdetails.name = name;
        exitinguserdetails.status = status;
        exitinguserdetails.Date = Date;
      }
    },
    Deletuser: (state, action) => {
      const { Id } = action.payload;
      const exitinguser = state.find((user) => user.Id === Id);
      if (exitinguser) {
        return state.filter((user) => user.Id !== Id);
      }
    },
  },
});

export const { addUser, edituser, Deletuser } = userSlice.actions;
export default userSlice.reducer;
