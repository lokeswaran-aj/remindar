import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import PageContainer from "../components/PageContainer";
import {
    Agenda,
    Calendar,
    CalendarUtils,
    ExpandableCalendar,
} from "react-native-calendars";
let today = new Date().toISOString().slice(0, 10);
const INITIAL_DATE = today;
const HomeScreen = () => {
    const [selected, setSelected] = useState(INITIAL_DATE);

    const onDayPress = useCallback((day) => {
        setSelected(day.dateString);
    }, []);

    const getDate = (count) => {
        const date = new Date(INITIAL_DATE);
        const newDate = date.setDate(date.getDate() + count);
        return CalendarUtils.getCalendarDateString(newDate);
    };

    const marked = useMemo(() => {
        return {
            ["2022-11-27"]: {
                selected: true,
                selectedColor: "lightGreen",
                selectedTextColor: "red",
            },
            [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "orange",
                selectedTextColor: "red",
            },
        };
    }, [selected]);
    return (
        <PageContainer>
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcomeText}>Hi, Lokesh</Text>
                    <Text style={styles.missText}>Don't miss any events!</Text>
                </View>
                <View>
                    <Calendar
                        testID={"first_calendar"}
                        enableSwipeMonths
                        current={INITIAL_DATE}
                        style={styles.calendar}
                        onDayPress={onDayPress}
                        markedDates={marked}
                        onDayLongPress={(date) => console.log(date)}
                    />
                </View>
                <View></View>
            </View>
        </PageContainer>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    calendar: {
        marginBottom: 10,
    },
    container: {
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
    },
    missText: {
        fontSize: 40,
    },
});
