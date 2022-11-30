import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import PageContainer from "../components/PageContainer";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import { addEvent } from "../store/eventSlice";

const AddEventScreen = () => {
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [selectedDay, setSelectedDay] = useState(undefined);
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [selectedMonth, setSelectedMonth] = useState(undefined);
    const [eventTitle, setEventTitle] = useState("");

    const handleSubmit = () => {
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
        dispatch(addEvent({ event }));
        Alert.alert("Success!", "Event Added");
        setSelectedDate(undefined);
        setSelectedMonth(undefined);
        setEventTitle("");
        setSelectedDay(undefined);
    };

    const handleSelectedDayChange = (day) => {
        setSelectedDay(day);
        if (day) {
            setSelectedMonth(+day.split("/")[1]);
            setSelectedDate(+day.split("/")[2]);
        }
    };

    return (
        <PageContainer>
            <View style={styles.container}>
                <View style={styles.calendar}>
                    <DatePicker
                        options={{
                            backgroundColor: colors.secondary,
                            textHeaderColor: "#FFA25B",
                            textDefaultColor: "#F6E7C1",
                            selectedTextColor: "#fff",
                            mainColor: colors.primary,
                            textSecondaryColor: "#D6C7A1",
                            borderColor: "rgba(122, 146, 165, 0.1)",
                        }}
                        current={currentDate}
                        selected={selectedDay}
                        mode="calendar"
                        style={{ borderRadius: 10 }}
                        onSelectedChange={(dateString) =>
                            handleSelectedDayChange(dateString)
                        }
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
                <View>
                    <Button title="Submit" onPress={handleSubmit} />
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
