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
// import { useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const [signup, setSignup] = useState(false);
    // const navigation = useNavigation();
    // const [isAuthenticating, setIsAuthenticating] = useState(false);

    // useEffect(() => {
    //     const unsubcrible = onAuthStateChanged(auth, (user) => {
    //         setIsAuthenticating(true);
    //         if (user) {
    //             console.log("Navigate");
    //             navigation.replace("Main");
    //         } else {
    //             setIsAuthenticating(false);
    //         }
    //     });
    //     return unsubcrible;
    // }, []);

    // if (isAuthenticating) {
    //     return (
    //         <PageContainer>
    //             <View
    //                 style={{
    //                     flex: 1,
    //                     alignItems: "center",
    //                     justifyContent: "center",
    //                 }}
    //             >
    //                 <ActivityIndicator size={"large"} />
    //             </View>
    //         </PageContainer>
    //     );
    // }
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
