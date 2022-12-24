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
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
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

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput
                    value={firstname}
                    onChangeText={(text) => setFirstName(text)}
                    style={styles.input}
                    placeholder="First Name"
                />
                <TextInput
                    value={lastname}
                    onChangeText={(text) => setLastName(text)}
                    style={styles.input}
                    placeholder="Last Name"
                />
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
                    style={styles.registerButtonContainer}
                    onPress={handleSignup}
                >
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Signup;

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
