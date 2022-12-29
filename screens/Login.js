import {
    ActivityIndicator,
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
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const [signup, setSignup] = useState(false);
    const navigation = useNavigation();

    return (
        <PageContainer>
            <View style={styles.container}>
                <View style={styles.screenContainer}>
                    {signup ? (
                        <Signup setSignup={setSignup} />
                    ) : (
                        <Signin setSignup={setSignup} />
                    )}
                </View>
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
});
