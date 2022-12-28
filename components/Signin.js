import {
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        const unsubcrible = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Navigate");
                navigation.replace("Main");
            } else {
                setIsAuthenticating(false);
            }
        });
        return unsubcrible;
    }, []);

    if (isAuthenticating) {
        return <ActivityIndicator size={"large"} />;
    }
    const handleLogin = async () => {
        if (email === "") {
            setErrorMessage("Enter the email id");
            return;
        }
        if (password === "") {
            setErrorMessage("Enter the password");
            return;
        }
        setErrorMessage("");
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                setErrorMessage("Email Id is invalid");
            } else if (error.code === "auth/user-not-found") {
                setErrorMessage("User not found");
            } else if (error.code === "auth/wrong-password") {
                setErrorMessage("Password is invalid");
            } else {
                setErrorMessage(error.code);
            }
        }
        setIsLoading(false);
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
            {errorMessage !== "" ? (
                <View style={styles.errorMessageContainer}>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            ) : null}
            <View style={styles.buttonsContainer}>
                {isLoading ? (
                    <ActivityIndicator style={styles.loginButtonContainer} />
                ) : (
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.loginButtonContainer}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                )}
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
    errorMessageContainer: {
        width: "80%",
        paddingTop: 5,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    errorMessage: {
        color: "red",
        fontWeight: "400",
        letterSpacing: 0.3,
    },
});
