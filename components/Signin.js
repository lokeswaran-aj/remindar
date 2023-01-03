import {
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import PageContainer from "./PageContainer";
import { child, get, getDatabase, ref, set } from "firebase/database";

const Signin = (props) => {
    const { setSignup } = props;
    const navigation = useNavigation();
    const [email, setEmail] = useState("t4@gmail.com");
    const [password, setPassword] = useState("1234567890");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    useEffect(() => {
        setIsLoading(false);
        const unsubcrible = onAuthStateChanged(auth, (user) => {
            setIsAuthenticating(true);
            if (user) {
                navigation.navigate("Main", {
                    screen: "Home",
                    params: { displayName: user.displayName },
                });
            } else {
                setIsAuthenticating(false);
                console.log("NO user");
            }
        });
        return unsubcrible;
    }, []);

    if (isAuthenticating) {
        return (
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ActivityIndicator size={"large"} />
                </View>
            </PageContainer>
        );
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
            setIsLoading(false);
            if (Device.isDevice) {
                const token = (await Notifications.getExpoPushTokenAsync())
                    .data;
                console.log(token);
                const userid = auth.currentUser.uid;
                let pushTokens;
                const dbRef = ref(getDatabase());
                await get(child(dbRef, `users/${userid}/token`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            pushTokens = snapshot.val();
                        } else {
                            pushTokens = {};
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                const tokenData = { ...pushTokens } || {};
                const tokenArray = Object.values(tokenData);

                if (tokenArray.includes(token)) {
                    return;
                }

                tokenArray.push(token);

                for (let i = 0; i < tokenArray.length; i++) {
                    const tok = tokenArray[i];
                    tokenData[i] = tok;
                }

                const userRef = child(dbRef, `users/${userid}/token`);

                await set(userRef, tokenData);
            }

            const unsubcrible = onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("login");
                    navigation.navigate("Main", {
                        screen: "Home",
                        params: { displayName: user.displayName },
                    });
                }
            });
            return unsubcrible;
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
            <View>
                <TouchableOpacity
                    onPress={() => setSignup(true)}
                    style={styles.switchText}
                >
                    <Text>Do not have an account? Register</Text>
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
    switchText: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
});
