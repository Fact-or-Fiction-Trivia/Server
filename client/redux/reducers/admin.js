import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const { data } = await axios.get(`/api/users`);
  return data;
});

export const fetchPermissions = createAsyncThunk(
  "admin/fetchPermissions",
  async () => {
    const { data } = await axios.get(`/api/permissions`);
    return data;
  }
);

export const savePermissions = createAsyncThunk(
  "admin/savePermissions",
  async ({ userId, permissions }) => {
    const { data } = await axios.put(`/api/permissions/${userId}`, permissions);
    return data;
  }
);

export const sendInvitation = createAsyncThunk(
  "admin/sendInvitation",
  async (email) => {
    const { data } = await axios.post(`/api/emails/invitations`, { ...email });
    if (data === "sent") {
      alert("sent");
    } else {
      alert("err");
    }
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId) => {
    const { data } = await axios.delete(`/api/users/${userId}`);
    return data;
  }
);

const INIT_STATE = {
  users: [],
  permissions: [],
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const adminSlice = createSlice({
  name: "admin",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(savePermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(savePermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = adminSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default adminSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectAdmins = (state) => state.admin.users;
export const selectPermissions = (state) => state.admin.permissions;
