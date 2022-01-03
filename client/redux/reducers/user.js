/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../../utils/history";

// export const receiveInvitation = createAsyncThunk(
//   "user/receiveInvitation",
//   async (inviteId) => {
//     const { data } = await axios.get(`/api/invitations?inviteId=${inviteId}`);
//     return data.id;
//   }
// );

// export const resetPassword = createAsyncThunk(
//   "user/resetPassword",
//   async ({ password, userId, token }) => {
//     const { data } = await axios.post(
//       `/api/users/password-reset/${userId}/${token}`,
//       { password }
//     );
//     if (data === "reset") {
//       alert("Password has been reset");
//       history.push("/");
//     } else {
//       alert("err");
//     }
//     return data;
//   }
// );

// export const requestReset = createAsyncThunk(
//   "user/requestReset",
//   async ({ email }) => {
//     const { data } = await axios.post(`/api/users/request-reset`, { email });
//     if (data === "sent") {
//       alert("sent");
//       history.push("/");
//     } else {
//       alert("err");
//     }
//     return data;
//   }
// );

export const fetchUserAgents = createAsyncThunk(
  "user/fetchUserAgents",
  async () => {
    const { data } = await axios.get(`/api/agents`);

    return data;
  }
);

const INIT_STATE = {
  agents: [],
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAgents.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchUserAgents.fulfilled, (state, action) => {
        state.agents = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchUserAgents.rejected, (state, action) => {
        state = INIT_STATE;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = userSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default userSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectUser = (state) => state.user;
export const selectUserAgents = (state) => state.user.agents;
