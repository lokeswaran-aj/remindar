import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";

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
