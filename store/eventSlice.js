import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dates: [
        {
            key: "55cf21f3-df32-473a-ab0a-ed4a26df6594",
            month: 12,
            date: 12,
            title: "Rajni Birthday",
        },
        {
            key: "13cc9b2f-1280-485d-ba3c-e8263b50a6ce",
            month: 12,
            date: 25,
            title: "Christmas",
        },
        {
            key: "d5b638ed-8b65-466d-94f0-7127e19051b9",
            month: 11,
            date: 11,
            title: "My Birthday",
        },
        {
            key: "fd3512b3-ec81-4143-9480-a88b81408bb9",
            month: 11,
            date: 20,
            title: "Dad's Birthday",
        },
        {
            key: "e2290c02-8d4e-4cd1-a6a8-8c82a8234b01",
            month: 10,
            date: 4,
            title: "Aditi's Birthday",
        },
        {
            key: "02d1862f-5560-473c-af50-a8444cf94888",
            month: 12,
            date: 12,
            title: "Important Date",
        },
    ],
};

export const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.dates.push(action.payload.event);
        },
        deleteEvent: (state, action) => {
            const { key } = action.payload;
            const filteredArray = state.dates.reduce((acc, curr) => {
                if (curr.key !== key) {
                    acc.push(curr);
                }
                return acc;
            }, []);
            state.dates = filteredArray;
        },
    },
});

export const addEvent = eventSlice.actions.addEvent;
export const deleteEvent = eventSlice.actions.deleteEvent;
export default eventSlice.reducer;
