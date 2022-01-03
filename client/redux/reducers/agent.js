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
export const fetchAgent = createAsyncThunk(
  "agent/fetchAgent",
  async (agentId) => {
    const { data } = await axios.get(`/api/agents/${agentId}`);
    return data;
  }
);

export const fetchAgentTransactions = createAsyncThunk(
  "agent/fetchAgentTransactions",
  async (agentId) => {
    const { data } = await axios.get(`/api/agents/${agentId}/transactions`);
    return data;
  }
);

export const createAgentTransaction = createAsyncThunk(
  "agent/createAgentTransaction",
  async (info) => {
    const { body, agentId } = info;
    console.log(body, agentId);
    const { data } = await axios.post(
      `/api/transactions/clients/${agentId}`,
      body
    );
    return data;
  }
);

const INIT_STATE = {
  fullName: "",
  transactions: [],
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const agentSlice = createSlice({
  name: "agent",
  initialState: INIT_STATE,
  reducers: {
    resetAgent(state, action) {
      return INIT_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgentTransactions.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchAgentTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchAgentTransactions.rejected, (state, action) => {
        state.transactions = [];
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchAgent.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchAgent.fulfilled, (state, action) => {
        state.fullName = action.payload.fullName;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchAgent.rejected, (state, action) => {
        state.fullName = "";
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(createAgentTransaction.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(createAgentTransaction.fulfilled, (state, action) => {
        state.transactions = [action.payload, ...state.transactions];
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { resetAgent } = agentSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default agentSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectUser = (state) => state.agent;
export const selectAgentTransactions = (state) => state.agent.transactions;
