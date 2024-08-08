import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import languageReducer from "./configSlice";

const appStore = configureStore ({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        gpt: gptReducer,
        config : languageReducer,
        
    }
})

export default appStore;