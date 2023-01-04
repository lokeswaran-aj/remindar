import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";
import { SwipeListView } from "react-native-swipe-list-view";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { getDatabase, ref, remove } from "firebase/database";
import { auth } from "../firebase";

const Agenda = (props) => {
    const selectedMonthEvents = props.selectedMonthEvents;
    let opacity = new Animated.Value(0);
    const [animationIsRunning, setAnimationIsRunning] = useState(false);

    const onSwipeValueChange = async (swipeData) => {
        const { key, value } = swipeData;
        if (value < -Dimensions.get("window").width && !animationIsRunning) {
            setAnimationIsRunning(true);
            Animated.timing(opacity, {
                useNativeDriver: false,
                toValue: 0,
                duration: 0,
            }).start(async () => {
                const userid = auth.currentUser.uid;
                const db = getDatabase();
                const postListRef = ref(db, `events/${userid}/${key}`);
                await remove(postListRef);
                setAnimationIsRunning(false);
            });
        }
    };
    const renderItem = (events) => {
        return (
            <View style={styles.container}>
                <View style={styles.agenda}>
                    <View style={styles.date}>
                        <Text style={styles.dateText}>{events.item.date}</Text>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            {events.item.title}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>
                    <MaterialIcons name="delete" size={26} color="white" />
                </Text>
            </View>
        </View>
    );

    return (
        <SwipeListView
            disableRightSwipe
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-Dimensions.get("window").width}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onSwipeValueChange={onSwipeValueChange}
            useNativeDriver={false}
            data={selectedMonthEvents}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default Agenda;

const styles = StyleSheet.create({
    container: {
        marginBottom: 3,
        backgroundColor: colors.secondary,
        borderWidth: 1,
        width: "100%",
        padding: 10,
        borderColor: colors.gray,
    },
    agenda: {
        flexDirection: "row",
        alignItems: "center",
    },
    date: {
        width: 40,
        height: 40,
        // padding: 10,
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
    rowBack: {
        alignItems: "center",
        marginBottom: 3,
        backgroundColor: "red",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: "center",
        bottom: 0,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: "red",
        right: 0,
    },
    backTextWhite: {
        color: "#FFF",
    },
});
