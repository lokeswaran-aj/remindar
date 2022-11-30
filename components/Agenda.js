import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";

const Agenda = (props) => {
    const date = props.date;
    const selectedMonthEvents = props.selectedMonthEvents;
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={selectedMonthEvents[date]}
            renderItem={(data) => (
                <View style={styles.container}>
                    <View style={styles.agenda}>
                        <View style={styles.date}>
                            <Text style={styles.dateText}>{date}</Text>
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{data.item}</Text>
                        </View>
                    </View>
                </View>
            )}
        />
    );
};

export default Agenda;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: colors.secondary,
        borderWidth: 1,
        width: "100%",
        padding: 10,
        borderRadius: 30,
        borderColor: colors.gray,
    },
    agenda: {
        flexDirection: "row",
        alignItems: "center",
    },
    date: {
        width: 40,
        height: 40,
        padding: 10,
        borderRadius: 25,
        color: "#F6E7C1",
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    dateText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    },
    title: {
        marginLeft: 20,
        marginRight: 10,
    },
    titleText: {
        fontSize: 20,
        color: "white",
        fontWeight: "500",
        letterSpacing: 0.5,
    },
});
