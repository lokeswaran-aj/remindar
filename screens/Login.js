import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import PageContainer from "../components/PageContainer";
import Signin from "../components/Signin";
import { useState } from "react";
import Signup from "../components/Signup";
const Login = () => {
    const [signup, setSignup] = useState(false);
    return (
        <PageContainer>
            <View style={styles.container}>
                <View style={styles.screenContainer}>
                    {signup ? <Signup /> : <Signin />}
                </View>
                <TouchableOpacity
                    onPress={() => setSignup((prevState) => !prevState)}
                    style={styles.switchText}
                >
                    <Text>Switch to {signup ? "Login" : "Register"} page</Text>
                </TouchableOpacity>
            </View>
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
    screenContainer: {
        width: "100%",
    },
    switchText: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
});
