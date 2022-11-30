import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dates: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [
            { title: "My Birthday", date: 1 },
            { title: "Father Birthday", date: 5 },
        ],
        10: [],
        11: [
            { title: "My Birthday", date: 11 },
            { title: "Father Birthday", date: 20 },
            { title: "Father Birthday", date: 1 },
            { title: "Father Birthday", date: 2 },
            { title: "Father Birthday", date: 3 },
        ],
        12: [
            { title: "Rajini Birthday", date: 12 },
            { title: "Christmas", date: 25 },
        ],
    },
};

export const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            const newEvent = action.payload.event;
            const month = Object.keys(newEvent)[0];
            let eventsOnThatDay;
            eventsOnThatDay = state.dates[month];
            eventsOnThatDay.push(newEvent[month]);
            const newEvents = {
                ...state.dates,
                ...{ [newEvent.date]: eventsOnThatDay },
            };
            state.dates = newEvents;
        },
    },
});

export const addEvent = eventSlice.actions.addEvent;
export default eventSlice.reducer;
