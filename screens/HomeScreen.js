import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text>Home Screen</Text>
            </SafeAreaView>
        </View>
    );
};
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
