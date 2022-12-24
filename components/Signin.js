import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const unsubcrible = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace("Main");
            }
        });
        return unsubcrible;
    }, []);

    const handleLogin = async () => {
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const currentUser = userCredentials.user;
            console.log("Logged In with:", currentUser.email);
        } catch (error) {
            console.error(error.code);
        }
    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.loginButtonContainer}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Signin;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "#f0f0f0",
        padding: 15,
        marginTop: 5,
        borderRadius: 5,
    },
    buttonsContainer: {
        marginTop: 10,
        width: "80%",
    },
    loginButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 5,
    },
    loginButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 1,
    },
});
