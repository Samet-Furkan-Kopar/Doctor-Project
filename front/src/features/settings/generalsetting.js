import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data:{}
}

export const settingSlice = createSlice({
    name: "generalsetting",
    initialState: initialState,
    reducers: {
        setSettings(state, action){
            state.data = action.payload
        }
    }
})

export const { setSettings } = settingSlice.actions
export default settingSlice.reducer