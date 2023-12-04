import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {}
}

export const presentationSlice = createSlice({
    name: "presentationMode",
    initialState: initialState,
    reducers: {
        updateField: (state, action) => {
            state.data = action.payload
        },
        resetFields: state => {
            state.formValues = {}
        }
    }
})

export const { updateField, resetFields } = presentationSlice.actions
export default presentationSlice.reducer