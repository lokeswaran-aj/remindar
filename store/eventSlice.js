import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dates: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: { 2: ["Second"], 3: ["Third", "Three"], 1: ["First"] },
        10: {},
        11: { 20: ["dad birthday"], 11: ["birthday"] },
        12: { 12: ["Rajni Birthday", "Important day"], 25: ["Christmas"] },
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
