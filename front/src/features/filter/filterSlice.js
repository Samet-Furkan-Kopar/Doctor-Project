import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusType: "",
  featured: "",
  isGridOrList: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addStatusType: (state, action) => {
      state.statusType = action.payload;
    },
    addFeatured: (state, action) => {
      state.featured = action.payload;
    },
    toggleGridAndList: (state, action) => {
      state.isGridOrList = action.payload;
    },
  },
});

export const { addStatusType, addFeatured, toggleGridAndList } =
  filterSlice.actions;
export default filterSlice.reducer;
