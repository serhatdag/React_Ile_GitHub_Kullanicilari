import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "github_data",
    initialState:{
        data:[],
        search_data: []
    },
    reducers:{
        setData(state, action){
            const data_reducer = action.payload.data;
            state.data = data_reducer;
        },
        setSearchData(state, action){
            const data_reducer = action.payload.data;
            state.search_data = data_reducer;
        }
    }
});

export default Slice;
export const {setData, setSearchData} = Slice.actions;