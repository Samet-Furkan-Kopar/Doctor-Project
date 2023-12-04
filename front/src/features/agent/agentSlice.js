import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    category: "",
    city: "",
    listen: "",
    length: 0,
};

export const agentSlice = createSlice({
    name: "agent",
    initialState,
    reducers: {
        addName: (state, action) => {
            state.name = action.payload;
        },
        addCategory: (state, action) => {
            state.category = action.payload;
        },
        addCity: (state, action) => {
            state.city = action.payload;
        },
        addListen: (state, action) => {
            state.listen = action.payload;
        },
        addAgentItemLength: (state, action) => {
            state.length = action.payload;
        },
    },
});

export const { addName, addCategory, addCity, addListen, addAgentItemLength } =
    agentSlice.actions;
export default agentSlice.reducer;
