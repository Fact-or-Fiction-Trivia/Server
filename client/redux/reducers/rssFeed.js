import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFeed = createAsyncThunk(
  "rssFeed/fetchRSSFeed",
  async (url) => {
    const feed = await axios.get(`/api/feed/${url}`);
    return feed;
  }
);

export const fetchArticles = createAsyncThunk(
  "rssFeed/gotNewArticle",
  async (offset) => {
    // const { data } = await axios.get(`http://localhost:3100/articles`);
    const { data } = await axios.get(`/api/articles?offset=${offset}`);
    //alert("New things arriving");
    return data;
  }
);

export const searchArticles = createAsyncThunk(
  "rssFeed/searchArticles",
  async (serachTerm) => {
    // const { data } = await axios.get(`http://localhost:3100/articles`);
    const { data } = await axios.get(`/api/articles/${serachTerm}`);
    //alert("New things arriving");
    return data;
  }
);

const INIT_STATE = {
  data: {},
  items: [],
  searchItems: [],
  count: 0,
  isLoading: false,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const rssFeedSlice = createSlice({
  name: "rssFeed",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state, data: { ...state.data, new: action.payload } };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.data = action.payload;
        state.items = action.payload.data.items;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.count = action.payload.count;
        state.items = [...action.payload.rows];
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.searchItems = [...action.payload];
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = rssFeedSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default rssFeedSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectRSSFeed = (state) => state.rssFeed;
