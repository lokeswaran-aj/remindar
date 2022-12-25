import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

import PageContainer from "../components/PageContainer";
import Agenda from "../components/Agenda";

const HomeScreen = (props) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
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
    const [selectedDate, setSelectedDate] = useState(undefined);

    const [displayType, setDisplayType] = useState("calendar");
    const [name, setName] = useState("Dear Friend");
    const allEvents = useSelector((state) => state.events.dates);

    const monthsInTheYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    useEffect(() => {
        setSelectedDate(undefined);
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
        const currentuser = auth.currentUser;
        const db = getDatabase();
        const starCountRef = ref(db, "users/" + currentuser.uid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setName(data.username);
        });
        setName(auth.currentUser.displayName);
    }, [auth.currentUser.displayName]);

    useEffect(() => {
        if (selectedMonthEvents.length > 0) {
            const eventDates = selectedMonthEvents.map((obj) => obj.date);
            setSelectedMonthEventDates(eventDates);
        } else {
            setSelectedMonthEventDates([]);
        }
    }, [selectedMonthEvents, currentMonth, currentYear, props]);
    const onDayPress = ({ day }) => {
        if (day === selectedDate) {
            setSelectedDate(undefined);
            setSelectedDayEvents([]);
        } else {
            let currentDayEvents = [];
            for (let i = 0; i < selectedMonthEvents.length; i++) {
                if (selectedMonthEvents[i].date == day) {
                    currentDayEvents.push(selectedMonthEvents[i]);
                }
            }
            setSelectedDate(day);
            setSelectedDayEvents(currentDayEvents);
        }
    };

    const handleMonthChange = (obj) => {
        setSelectedMonthEventDates([]);
        setSelectedMonthEvents([]);
        setCurrentMonth(obj.month);
        setCurrentYear(obj.year);
        setCurrentDate(obj.dateString);
    };
    const handleListMonthChange = (direction, date, month, year) => {
        let newYear, newMonth, newDate;
        if (direction === "left") {
            if (month === 1) {
                newYear = year - 1;
                newMonth = 12;
            } else {
                newYear = year;
                newMonth = month - 1;
            }
        } else {
            if (month === 12) {
                newYear = year + 1;
                newMonth = 1;
            } else {
                newYear = year;
                newMonth = month + 1;
            }
        }
        if (newMonth <= 9) {
            newDate = newYear + "-0" + newMonth + "-" + date.slice(-2);
        } else {
            newDate = newYear + "-" + newMonth + "-" + date.slice(-2);
        }
        setSelectedMonthEventDates([]);
        setSelectedMonthEvents([]);
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        setCurrentDate(newDate);
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

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.replace("Login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <PageContainer>
            <View style={styles.container}>
                <View>
                    <View style={styles.headerContainer}>
                        <View style={styles.header}>
                            <Text style={styles.welcomeText}>
                                Hi, {name === null ? "dear friend" : name}!
                            </Text>
                            <Button title="Logout" onPress={handleLogout} />
                        </View>
                        <View style={styles.header}>
                            <Text style={styles.missText}>
                                Don't miss any events!
                            </Text>
                            {displayType === "calendar" ? (
                                <Entypo
                                    name="menu"
                                    size={40}
                                    color="black"
                                    onPress={() => {
                                        setDisplayType("list");
                                    }}
                                />
                            ) : (
                                <FontAwesome
                                    name="calendar"
                                    size={40}
                                    color="black"
                                    onPress={() => {
                                        setDisplayType("calendar");
                                    }}
                                />
                            )}
                        </View>
                    </View>
                </View>
                {displayType === "calendar" && (
                    <View style={{ flex: 1 }}>
                        <Calendar
                            testID="first_calendar"
                            enableSwipeMonths
                            current={currentDate}
                            style={styles.calendar}
                            onDayPress={onDayPress}
                            markedDates={marked}
                            onMonthChange={handleMonthChange}
                        />
                        <View style={{ flex: 1 }}>
                            {selectedDate === undefined &&
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
                                selectedDayEvents.length === 0 && (
                                    <Text>No Events</Text>
                                )}
                            {selectedDate > 0 &&
                                selectedDayEvents.length > 0 && (
                                    <Agenda
                                        selectedMonthEvents={selectedDayEvents}
                                    />
                                )}
                        </View>
                    </View>
                )}
                {displayType === "list" && (
                    <View style={styles.agendaList}>
                        <View style={styles.listHeaderContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    handleListMonthChange(
                                        "left",
                                        currentDate,
                                        currentMonth,
                                        currentYear
                                    )
                                }
                            >
                                <AntDesign
                                    name="left"
                                    size={23}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <Text style={styles.listHeader}>
                                {monthsInTheYear[currentMonth - 1]}{" "}
                                {currentYear}
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    handleListMonthChange(
                                        "right",
                                        currentDate,
                                        currentMonth,
                                        currentYear
                                    )
                                }
                            >
                                <AntDesign
                                    name="right"
                                    size={23}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
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
    headerContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    header: {
        width: "100%",
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
    listHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    listHeader: {
        fontSize: 20,
        fontWeight: "500",
    },
});
