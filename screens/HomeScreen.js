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
    const [selectedMonthEvents, setSelectedMonthEvents] = useState([]);
    const [selectedMonthEventDates, setSelectedMonthEventDates] = useState([]);
    const [displayType, setDisplayType] = useState("calendar");

    const allEvents = useSelector((state) => state.events.dates);

    useEffect(() => {
        setSelectedMonthEvents(allEvents[currentMonth]);
        if (selectedMonthEvents) {
            let eventDates = [];
            for (let i = 0; i < selectedMonthEvents.length; i++) {
                eventDates.push(selectedMonthEvents[i]["date"]);
            }
            setSelectedMonthEventDates(eventDates);
        } else {
            console.log("here");
            console.log(currentMonth);
            console.log(allEvents[currentMonth]);
            console.log(selectedMonthEvents);
        }
    }, [selectedMonthEvents, currentMonth, props, isFocused]);

    const onDayPress = useCallback((day) => {
        console.log(day);
    }, []);

    const getDate = (count) => {
        const date = new Date(currentDate);
        const newDate = date.setDate(date.getDate() + count);
        return CalendarUtils.getCalendarDateString(newDate);
    };

    const handleMonthChange = (obj) => {
        setSelectedMonthEventDates([]);
        setSelectedMonthEvents([]);
        setCurrentMonth(obj.month);
        setCurrentYear(obj.year);
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
                                size={24}
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
                <View>
                    <Calendar
                        testID={"first_calendar"}
                        enableSwipeMonths
                        current={currentDate}
                        style={styles.calendar}
                        onDayPress={onDayPress}
                        markedDates={marked}
                        onDayLongPress={(date) => console.log(date)}
                        onMonthChange={(obj) => handleMonthChange(obj)}
                    />
                </View>
                {/* <ScrollView>
                    {selectedMonthEvents.map((item) => (
                        <Agenda event={item} key={item.title} />
                    ))}
                </ScrollView> */}
                <View style={styles.agendaList}>
                    <FlatList
                        bouncesZoom={true}
                        data={selectedMonthEvents}
                        renderItem={(data) => <Agenda event={data.item} />}
                    />
                </View>
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
