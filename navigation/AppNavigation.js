import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    Ionicons,
    FontAwesome,
    Entypo,
    Feather,
    AntDesign,
} from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddEventScreen from "../screens/AddEventScreen";
import colors from "../constants/colors";

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
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Main" component={MyTabs} />
        </Stack.Navigator>
    );
}
