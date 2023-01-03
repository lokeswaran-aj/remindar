import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    Ionicons,
    FontAwesome,
    Entypo,
    Feather,
    AntDesign,
} from "@expo/vector-icons";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddEventScreen from "../screens/AddEventScreen";
import colors from "../constants/colors";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    tabBarShowLabel: false,
                    borderRadius: 40,
                    paddingBottom: 10,
                    backgroundColor: colors.secondary,
                    borderWidth: 1,
                    borderColor: colors.black,
                    borderTopColor: colors.black,
                    alignItems: "center",
                    justifyContent: "center",
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome
                                name="home"
                                size={28}
                                color={colors.primary}
                            />
                        ) : (
                            <FontAwesome
                                name="home"
                                size={24}
                                color={colors.lightGray}
                            />
                        ),
                }}
            />
            <Tab.Screen
                name="AddEventScreen"
                component={AddEventScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo
                                name="plus"
                                size={36}
                                color={colors.primary}
                            />
                        ) : (
                            <Entypo
                                name="plus"
                                size={32}
                                color={colors.lightGray}
                            />
                        ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons
                                name="settings"
                                size={28}
                                color={colors.primary}
                            />
                        ) : (
                            <Ionicons
                                name="settings-sharp"
                                size={24}
                                color={colors.lightGray}
                            />
                        ),
                }}
            />
        </Tab.Navigator>
    );
}
export default function () {
    const [expoPushToken, setExpoPushToken] = useState("");
    console.log(expoPushToken);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                // handle notification
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log("Notification tapped:");
                    console.log(response);
                }
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Group>
                <Stack.Screen name="Login" component={Login} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="Main" component={MyTabs} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        console.log("Must use physical device for Push Notifications");
    }

    return token;
}
