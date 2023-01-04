import "expo-dev-client";
import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "./navigation/AppNavigation";
import { Provider } from "react-redux";
import { store } from "./store/Store";

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider style={styles.container}>
                <NavigationContainer>
                    <AppNavigation />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
