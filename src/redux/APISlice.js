import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
  count: 0,
};

export const APISlice = createSlice({
  name: "APISlice",
  initialState,
  reducers: {
    APIfetch(state, action) {
      state.post = action.payload;
    },
    updateCount(state, action) {
      state.count = action.payload;
    },
  },
});

export const { APIfetch, updateCount } = APISlice.actions;
export default APISlice.reducer;
