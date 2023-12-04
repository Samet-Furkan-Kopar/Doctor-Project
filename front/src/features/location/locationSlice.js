import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  citiesList: [],
  districtsList: [],
  selectedCity: [],
};

export const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {
    setCitiesList: (state, action) => {
      state.citiesList = action.payload;
    },
    setDistrictsList: (state, action) => {
      state.districtsList = action.payload;
    },
  },
});

export const { setCitiesList, setDistrictsList } = locationSlice.actions;
export default locationSlice.reducer;
