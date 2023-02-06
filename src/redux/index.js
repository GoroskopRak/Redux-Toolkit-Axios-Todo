import {configureStore} from "@reduxjs/toolkit";
import todoSlice from "./reducers/list";

const store = configureStore({
    reducer: {
        todoSlice,
    }
})

export default store;