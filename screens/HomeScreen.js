import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PageContainer from "../components/PageContainer";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { useSelector } from "react-redux";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import Agenda from "../components/Agenda";

const HomeScreen = (props) => {
    const isFocused = useIsFocused();
    const [currentDate, setCurrentDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [currentMonth, setCurrentMonth] = useState(
        new Date().toISOString().slice(5, 7)
    );
    const [currentYear, setCurrentYear] = useState(
        new Date().toISOString().slice(0, 4)
    );
    const [selectedMonthEvents, setSelectedMonthEvents] = useState({});
    const [selectedMonthEventDates, setSelectedMonthEventDates] = useState([]);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState([]);

    const [displayType, setDisplayType] = useState("calendar");

    const allEvents = useSelector((state) => state.events.dates);

    useEffect(() => {
        setSelectedDate([]);
        setSelectedDayEvents([]);
        let currentMonthEvents = [];

        for (let i = 0; i < allEvents.length; i++) {
            if (allEvents[i].month == currentMonth) {
                currentMonthEvents.push(allEvents[i]);
            }
        }
        let currentMonthEventsSortedByDate = [...currentMonthEvents].sort(
            (a, b) => a.date - b.date
        );
        setSelectedMonthEvents(currentMonthEventsSortedByDate);
    }, [currentMonth, props, isFocused, displayType, allEvents]);

    useEffect(() => {
        if (selectedMonthEvents.length > 0) {
            const eventDates = selectedMonthEvents.map((obj) => obj.date);
            setSelectedMonthEventDates(eventDates);
        } else {
            setSelectedMonthEventDates([]);
        }
    }, [selectedMonthEvents, currentMonth, currentYear, props]);

    const onDayPress = ({ day }) => {
        if (selectedMonthEvents[day] !== undefined) {
            setSelectedDayEvents({ [day]: selectedMonthEvents[day] });
        }
        setSelectedDate(day);
    };

    const handleMonthChange = (obj) => {
        setSelectedMonthEventDates([]);
        setSelectedMonthEvents([]);
        setCurrentMonth(obj.month);
        setCurrentYear(obj.year);
        setCurrentDate(obj.dateString);
    };

    const marked = useMemo(() => {
        let result = {};
        for (let day = 0; day < selectedMonthEventDates.length; day++) {
            const dd = selectedMonthEventDates[day];
            let dateString;
            if (currentMonth < 10 && dd < 10) {
                dateString = `${currentYear}-0${currentMonth}-0${dd}`;
            } else if (currentMonth < 10) {
                dateString = `${currentYear}-0${currentMonth}-${dd}`;
            } else if (dd < 10) {
                dateString = `${currentYear}-${currentMonth}-0${dd}`;
            } else {
                dateString = `${currentYear}-${currentMonth}-${dd}`;
            }
            result[dateString] = {
                selected: true,
                selectedColor: "orange",
                selectedTextColor: "red",
            };
        }
        return result;
    }, [selectedMonthEvents, selectedMonthEventDates, currentMonth]);
    return (
        <PageContainer>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeText}>Hi, Lokesh</Text>
                        <Text style={styles.missText}>
                            Don't miss any events!
                        </Text>
                    </View>
                    <View>
                        {displayType === "calendar" ? (
                            <FontAwesome
                                name="calendar"
                                size={40}
                                color="black"
                                onPress={() => {
                                    setDisplayType("list");
                                }}
                            />
                        ) : (
                            <Entypo
                                name="menu"
                                size={40}
                                color="black"
                                onPress={() => {
                                    setDisplayType("calendar");
                                }}
                            />
                        )}
                    </View>
                </View>
                {displayType === "calendar" && (
                    <View style={{ flex: 1 }}>
                        <Calendar
                            enableSwipeMonths
                            current={currentDate}
                            style={styles.calendar}
                            onDayPress={onDayPress}
                            markedDates={marked}
                            onMonthChange={handleMonthChange}
                        />
                        <View style={{ flex: 1 }}>
                            {selectedDate.length === 0 &&
                                selectedDayEvents.length === 0 && (
                                    <View style={styles.agendaList}>
                                        <Agenda
                                            selectedMonthEvents={
                                                selectedMonthEvents
                                            }
                                        />
                                    </View>
                                )}
                            {selectedDate > 0 &&
                                !selectedDayEvents[selectedDate] && (
                                    <Text>No Events</Text>
                                )}
                            {selectedDate > 0 && selectedDayEvents && (
                                <Agenda
                                    selectedMonthEvents={selectedMonthEvents}
                                />
                            )}
                        </View>
                    </View>
                )}
                {displayType === "list" && (
                    <View style={styles.agendaList}>
                        <Agenda selectedMonthEvents={selectedMonthEvents} />
                    </View>
                )}
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
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
    },
    missText: {
        fontSize: 40,
    },
    agendaList: {
        flex: 1,
    },
});
