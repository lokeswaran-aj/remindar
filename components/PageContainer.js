import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";

const PageContainer = (props) => {
    return (
        <SafeAreaView style={{ ...styles.container, ...props.style }}>
            {props.children}
        </SafeAreaView>
    );
};

export default PageContainer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
});
