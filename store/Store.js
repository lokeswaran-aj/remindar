import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventSlice";

export const store = configureStore({
    reducer: {
        events: eventSlice,
    },
});
