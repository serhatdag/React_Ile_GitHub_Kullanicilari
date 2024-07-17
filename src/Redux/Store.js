import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";


const Store = configureStore({
    reducer:{
        github_data: Slice.reducer
    }
});

export default Store;