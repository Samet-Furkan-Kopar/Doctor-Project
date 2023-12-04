import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: [],
};

export const stepperSlice = createSlice({
  name: "stepper",
  initialState: initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = stepperSlice.actions;
export default stepperSlice.reducer;
