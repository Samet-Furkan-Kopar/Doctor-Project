import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  length: 0,
  allFilter: {},
  allLocation: {},
  allQuery: {},
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    addLength(state, action) {
      state.length = action.payload;
    },
    setAllFilter(state, action) {
      state.allFilter = action.payload;
    },
    setAllLocation(state, action) {
      state.allLocation = action.payload;
    },
    setAllQuery(state, action) {
      state.allQuery = action.payload;
    },
  },
});

export const { addLength, setAllFilter, setAllLocation, setAllQuery } =
  propertiesSlice.actions;
export default propertiesSlice.reducer;
