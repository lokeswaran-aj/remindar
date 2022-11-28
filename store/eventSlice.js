import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: { "2022-11-11": ["My Birthday"] },
};

export const eventSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            newEvent = action.payload.event;
            if (state.events[newEvent.date]) {
                eventsOnThatDay = state.events["2022-11-11"];
                eventsOnThatDay.push(newEvent.title);
            } else {
                eventsOnThatDay = [];
                eventsOnThatDay.push(newEvent.title);
            }
            newEvents = {
                ...state.events,
                ...{ [newEvent.date]: eventsOnThatDay },
            };
            state.events = newEvents;
        },
    },
});

export const addEvent = eventSlice.actions.addEvent;
export default eventSlice.reducer;
