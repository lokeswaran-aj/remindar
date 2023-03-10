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
import { useState } from "react";
import { auth } from "../firebase";
import messaging from "@react-native-firebase/messaging";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

const Signup = (props) => {
    const { setSignup } = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSignup = async () => {
        if (name === "") {
            setErrorMessage("Enter the Name");
            return;
        }
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
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName: name,
            });
            console.log(auth.currentUser);
            let token = "";
            if (Device.isDevice) {
                try {
                    await messaging().registerDeviceForRemoteMessages();
                } catch (error) {
                    console.log("Already registered");
                }
                token = await messaging().getToken();
                console.log("====================================");
                console.log(token);
                console.log("====================================");
            }

            await writeUserData(
                auth.currentUser.uid,
                auth.currentUser.email,
                auth.currentUser.displayName,
                token
            );
            const unsubcrible = onAuthStateChanged(auth, (user) => {
                if (user) {
                    navigation.navigate("Main", {
                        screen: "Home",
                        params: { displayName: user.displayName },
                    });
                }
            });
            setIsLoading(false);
            return unsubcrible;
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                setErrorMessage("Email Id is invalid");
            } else if (error.code === "auth/email-already-in-use") {
                setErrorMessage("Email Id already exists");
            } else if (error.code === "auth/wrong-password") {
                setErrorMessage("Password is invalid");
            } else if (error.code === "auth/weak-password") {
                setErrorMessage("Enter a stronger password");
            } else {
                setErrorMessage(error.code);
            }
        }
        setIsLoading(false);
    };

    const writeUserData = async (userid, email, name, token) => {
        const db = getDatabase();
        if (token !== "") {
            await set(ref(db, "users/" + userid), {
                name,
                email,
                userid,
                token: [token],
            });
        } else {
            await set(ref(db, "users/" + userid), {
                name,
                email,
                userid,
            });
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                    placeholder="Name"
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
            {errorMessage !== "" ? (
                <View style={styles.errorMessageContainer}>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            ) : null}
            <View style={styles.buttonsContainer}>
                {isLoading ? (
                    <ActivityIndicator style={styles.registerButtonContainer} />
                ) : (
                    <TouchableOpacity
                        style={styles.registerButtonContainer}
                        onPress={handleSignup}
                    >
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => setSignup(false)}
                    style={styles.switchText}
                >
                    <Text>Already an existing user? Login</Text>
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
