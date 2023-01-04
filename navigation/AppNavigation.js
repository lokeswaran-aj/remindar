import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import messaging from "@react-native-firebase/messaging";
import React, { useEffect } from "react";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddEventScreen from "../screens/AddEventScreen";
import colors from "../constants/colors";
import Login from "../screens/Login";
import { isDevice } from "expo-device";

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
    useEffect(() => {
        if (isDevice) {
            messaging()
                .getInitialNotification()
                .then(async (remoteMessage) => {
                    if (remoteMessage) {
                        console.log(
                            "Notification caused app to open from quit state:",
                            remoteMessage.notification
                        );
                    }
                });

            messaging().onNotificationOpenedApp(async (remoteMessage) => {
                console.log(
                    "Notification caused app to open from background state:",
                    remoteMessage.notification
                );
            });

            messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                console.log(
                    "Message handled in the background!",
                    remoteMessage
                );
            });

            const unsubscribe = messaging().onMessage(async (remoteMessage) => {
                Alert.alert(
                    "A new FCM message arrived!",
                    JSON.stringify(remoteMessage)
                );
            });

            return unsubscribe;
        }
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
