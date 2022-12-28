import React, { useMemo, useState } from "react";

import {
    ActivityIndicator,
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { getDatabase, ref, push, set } from "firebase/database";
import { auth } from "../firebase";

import PageContainer from "../components/PageContainer";
import colors from "../constants/colors";
import { Calendar } from "react-native-calendars";

const AddEventScreen = () => {
    const today = new Date().toISOString().slice(0, 10);
    const [selectedDay, setSelectedDay] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today.split("-")[2]);
    const [selectedMonth, setSelectedMonth] = useState(today.split("-")[1]);
    const [eventTitle, setEventTitle] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        let event = {};
        if (!selectedDate) {
            Alert.alert("Choose a date");
            return;
        } else if (eventTitle === "") {
            Alert.alert("Give a event name");
            return;
        }
        event = {
            month: selectedMonth,
            title: eventTitle,
            date: selectedDate,
        };
        try {
            const userid = auth.currentUser.uid;
            const db = getDatabase();
            const postListRef = ref(db, `events/${userid}`);
            const newPostRef = push(postListRef);
            await set(newPostRef, event);
            Alert.alert("Success!", "Event Added");
            setSelectedDate(undefined);
            setSelectedMonth(undefined);
            setEventTitle("");
            setSelectedDay(undefined);
        } catch (error) {
            console.error(error.code);
        }
        setIsSubmitting(false);
    };

    const handleSelectedDayChange = (newSelectedDate) => {
        setSelectedDay(newSelectedDate.dateString);
        setSelectedMonth(newSelectedDate.month);
        setSelectedDate(newSelectedDate.day);
    };

    const marked = useMemo(() => {
        let result = {};
        result = {
            [selectedDay]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "orange",
                selectedTextColor: "red",
            },
        };
        return result;
    }, [selectedDay]);

    return (
        <PageContainer>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Add New Event</Text>
                </View>
                <View>
                    <Calendar
                        theme={{
                            calendarBackground: "#333248",
                            textSectionTitleColor: "white",
                            textSectionTitleDisabledColor: "gray",
                            todayBackgroundColor: "gray",
                            dayTextColor: "red",
                            todayTextColor: "white",
                            selectedDayTextColor: "white",
                            monthTextColor: "white",
                            indicatorColor: "white",
                            selectedDayBackgroundColor: "#333248",
                            arrowColor: "white",
                            // textDisabledColor: 'red',
                            stylesheet: {
                                calendar: {
                                    header: {
                                        week: {
                                            marginTop: 30,
                                            marginHorizontal: 12,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        },
                                    },
                                },
                            },
                        }}
                        testID={"first_calendar"}
                        enableSwipeMonths
                        current={today}
                        onDayPress={handleSelectedDayChange}
                        markedDates={marked}
                    />
                </View>
                <View>
                    <Text style={styles.eventText}>Enter the Event Name:</Text>
                    <TextInput
                        style={styles.eventInput}
                        placeholder="Title"
                        value={eventTitle}
                        onChangeText={(text) => setEventTitle(text)}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    {isSubmitting ? (
                        <ActivityIndicator size={"small"} />
                    ) : (
                        <Button title="Submit" onPress={handleSubmit} />
                    )}
                </View>
            </View>
        </PageContainer>
    );
};

export default AddEventScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    headerContainer: {
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
    },
    header: {
        fontWeight: "600",
        fontSize: 24,
    },
    calendar: {},
    eventText: {
        fontSize: 24,
        marginVertical: 20,
    },
    eventInput: {
        borderWidth: 1,
        padding: 10,
        borderColor: colors.gray,
        borderRadius: 5,
    },
});
