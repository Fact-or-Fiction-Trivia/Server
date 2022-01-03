import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchKeywords = createAsyncThunk(
  "keyword/fetchKeywords",
  async () => {
    const { data } = await axios.get(`/api/keywords`);
    return data;
  }
);
export const createKeyword = createAsyncThunk(
  "keyword/createKeyword",
  async ({ content, type }) => {
    const { data } = await axios.post(`/api/keywords`, { content, type });
    return data;
  }
);

export const deleteKeyword = createAsyncThunk(
  "keyword/deleteKeyword",
  async (keywordId) => {
    const { data } = await axios.delete(`/api/keywords/${keywordId}`);
    return data;
  }
);

export const updateKeyword = createAsyncThunk(
  "keyword/updateKeyword",
  async ({ keywordId, content, type }) => {
    const { data } = await axios.put(`/api/keywords/${keywordId}`, {
      content,
      type,
    });
    return data;
  }
);

const INIT_STATE = {
  keywords: [],
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const keywordSlice = createSlice({
  name: "keyword",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKeywords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.keywords = action.payload;
      })
      .addCase(fetchKeywords.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(createKeyword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.keywords = action.payload;
      })
      .addCase(createKeyword.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteKeyword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.keywords = action.payload;
      })
      .addCase(updateKeyword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.keywords = action.payload;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = keywordSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default keywordSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectKeywords = (state) => state.keyword.keywords;
