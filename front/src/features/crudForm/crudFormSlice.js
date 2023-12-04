import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formValues: {
    step: 1,
    lastStep: 3,

    seoTitle: "",
    seoUrl: "",
    seoDescription: "",

    // step 1
   
    title: "",
    content: "",
    short_description: "",
 
    // step 2
   
    // step 3 - Detail Information
    features: [],

    // step 4  Upload Photo
    blogPhoto: "",
    photoStatus: "",

    // step 5 Cover Photo
    // coverPhoto: "",
  },
};

export const crudFormSlice = createSlice({
  name: "crudForm",
  initialState: initialState,
  reducers: {
    setFormValues(state, action) {
      state.formValues = action.payload;
    },
    updateField: (state, action) => {
      state.formValues[action.payload.field] = action.payload.value;
    },

    resetFields:state => {
      state.formValues= {
        step: 1,
        lastStep: 3,
    
        seoTitle: "",
        seoUrl: "",
        seoDescription: "",
    
        // step 1
       
        title: "",
        content: "",
        short_description: "",
       
    
        // step 3 - Detail Information
        features: [],
    
        // step 4  Upload Photo
        blogPhoto: "",
        photoStatus: "",
    
        // step 5 Cover Photo
        // coverPhoto: "",
      }
    }
  },
});

export const { setFormValues, updateField, resetFields } = crudFormSlice.actions;
export default crudFormSlice.reducer;
