import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {}
}

export const userInfoSlice = createSlice({
    name: "userInfomation",
    initialState: initialState,
    reducers: {
        updateField: (state, action) => {
            state.data[action.payload.field] = action.payload.value;
        },
        resetFields: state => {
            state.formValues = {}
        }
    }
})

export const { updateField, resetFields } = userInfoSlice.actions
export default userInfoSlice.reducer