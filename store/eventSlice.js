import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // dates: {
    //     1: {},
    //     2: {},
    //     3: {},
    //     4: {},
    //     5: {},
    //     6: {},
    //     7: {},
    //     8: {},
    //     9: { 2: ["Second"], 3: ["Third", "Three"], 1: ["First"] },
    //     10: {},
    //     11: { 20: ["dad birthday"], 11: ["birthday"] },
    //     12: { 12: ["Rajni Birthday", "Important day"], 25: ["Christmas"] },
    // },
    dates: [
        { key: 1, month: 12, date: 12, title: "Rajni Birthday" },
        { key: 2, month: 12, date: 25, title: "Christmas" },
        { key: 3, month: 11, date: 11, title: "My Birthday" },
        { key: 4, month: 11, date: 20, title: "Dad's Birthday" },
        { key: 5, month: 10, date: 4, title: "Aditi's Birthday" },
        { key: 6, month: 12, date: 12, title: "Important Date" },
    ],
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
