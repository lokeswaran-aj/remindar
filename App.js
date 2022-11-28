import "react-native-gesture-handler";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "./navigation/AppNavigation";
import colors from "./constants/colors";

export default function App() {
    return (
        <SafeAreaProvider style={styles.container}>
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
