import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import PageContainer from "../components/PageContainer";
import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
const Login = () => {
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

    const handleSignup = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const currentUser = userCredentials.user;
            console.log("Registered with:", currentUser.email);
        } catch (error) {
            console.log(error.message);
        }
    };

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
        <PageContainer>
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
                    <TouchableOpacity
                        style={styles.registerButtonContainer}
                        onPress={handleSignup}
                    >
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </PageContainer>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    registerButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderColor: "blue",
        backgroundColor: "white",
        borderWidth: 1,
        padding: 15,
        marginTop: 5,
        borderRadius: 5,
    },
    registerButtonText: {
        color: "blue",
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 1,
    },
});
