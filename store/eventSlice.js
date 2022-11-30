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
            const { month, date, title } = action.payload.event;
            let eventsOnThatMonth;
            eventsOnThatMonth = state.dates[month];
            let eventsOnThatDay = eventsOnThatMonth[date];
            if (eventsOnThatDay) {
                eventsOnThatDay.push(title);
            } else {
                eventsOnThatDay = [];
                eventsOnThatDay.push(title);
            }
            state.dates[month] = {
                ...state.dates[month],
                ...{ [date]: eventsOnThatDay },
            };
        },
    },
});

export const addEvent = eventSlice.actions.addEvent;
export default eventSlice.reducer;
