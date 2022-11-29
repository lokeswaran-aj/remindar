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
            newEvent = action.payload.event;
            if (state.dates[newEvent.date]) {
                eventsOnThatDay = state.dates[newEvent.date];
                eventsOnThatDay.push(newEvent.eventDetail);
            } else {
                eventsOnThatDay = [];
                eventsOnThatDay.push(newEvent.eventDetail);
            }
            newEvents = {
                ...state.dates,
                ...{ [newEvent.date]: eventsOnThatDay },
            };
            state.dates = newEvents;
        },
    },
});

export const addEvent = eventSlice.actions.addEvent;
export default eventSlice.reducer;
