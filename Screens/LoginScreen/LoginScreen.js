import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import InputField from '../../Components/InputField'
import { Colors } from '../../assets/constants/Colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Button from '../../Components/Button'
import { IconFacebook, IconGoogle } from '../../assets/images'
import { DisplayLargeBold, LinkMediumBold, TextLarge, TextSmall } from '../../assets/constants/Typography'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AxiosIntance from '../../utils/AxiosIntance'

const LoginScreen = ({ navigation }) => {

    const [usename, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (usename, password) => {
        try {
            const responseLogin = await AxiosIntance().post(
                "/auth/login", { email: usename, password: password }
            );
            console.log(responseLogin);

            if (!responseLogin.data.error) {
                await AsyncStorage.setItem("token", responseLogin.data.token);
                console.log(responseLogin.data.token);
                navigation.navigate("NavigatorScreen");
                ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Đăng nhập thất bại. Kiểm tra lại username và password", ToastAndroid.SHORT);
            }
        } catch (err) {
            ToastAndroid.show("Đăng nhập thất bại", ToastAndroid.SHORT);
            console.log(err);
        }
    }

    const handleUserNameChange = (usename) => {
        setUsername(usename);
        console.log(usename);
    }

    const handlePasswordChange = (password) => {
        setPassword(password);
        console.log(password);
    }

    return (
        <KeyboardAwareScrollView style={styles.loginScreenContainer} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={[DisplayLargeBold, { color: Colors.titleActive }]}>Hello</Text>
                    <Text style={[DisplayLargeBold, { color: Colors.primaryColor }]}>Again!</Text>
                </View>
                <View style={styles.subTitleContainer}>
                    <Text style={[TextLarge, styles.subTitle]}>Welcome back you’ve been missed</Text>
                </View>
            </View>
            <View style={styles.formContainer}>

                {/* input field */}
                <InputField importance titleField="Username" inputContainerStyle={{ marginBottom: 16 }} onChangeText={(text) => { handleUserNameChange(text) }} />
                <InputField importance titleField="Password" secureTextEntry={true} onChangeText={(text) => { handlePasswordChange(text) }} />
                {/*  */}

                <View style={styles.optionFormContainer}>
                    <BouncyCheckbox
                        size={20}
                        style={styles.checkBox}
                        text="Remember me"
                        textStyle={[TextSmall, styles.checkBoxTextStyle]}
                        iconStyle={{ borderRadius: 3 }}
                        fillColor={Colors.primaryColor}
                        unfillColor={"#fff"}
                        innerIconStyle={{ borderRadius: 3, borderWidth: 2, borderColor: Colors.primaryColor }}
                        onPress={(isChecked) => { /**Handle checked event of radio button */ }} />
                    <TouchableOpacity>
                        <Text style={[TextSmall, styles.textForgotPassword]}>Forgot the password ?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Button
                style={{ marginTop: 18 }}
                height={50}
                onPress={() => { handleLogin(usename, password) }}>
                <Text style={[LinkMediumBold, styles.textButton, {}]}>Login</Text>
            </Button>
            <Text style={[TextSmall, styles.continueText]}>or continue with</Text>
            <View style={styles.optionsLoginContainer}>
                <Button
                    secondary
                    height={48}
                    width={158}
                    onPress={() => { console.log("Login Facebook"); }}>
                    <IconFacebook />
                    <Text style={[LinkMediumBold, { color: Colors.buttonText }]}>Facebook</Text>
                </Button>
                <Button
                    secondary
                    height={48}
                    width={158}
                    onPress={() => { console.log("Login Google"); }}>
                    <IconGoogle />
                    <Text style={[LinkMediumBold, { color: Colors.buttonText }]}>Google</Text>
                </Button>
            </View>
            <View style={styles.suggestSignUp}>
                <Text style={[TextSmall, styles.textSuggestSignUp]}>Don’t have an account ? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate("RegisterScreen") }}>
                    <Text style={[TextSmall, { color: Colors.primaryColor, fontWeight: '700' }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView >
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    loginScreenContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
        flexDirection: 'column',
        backgroundColor: "#fff"
    },
    subTitle: {
        marginEnd: 120,
        marginTop: 3,
        color: Colors.bodyText,
    },
    formContainer: { marginTop: 40 },
    checkBox: {
    },
    checkBoxTextStyle: {
        textDecorationLine: "none",
        color: Colors.bodyText,
        marginStart: -10,
        marginTop: 1
    },
    optionFormContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 10
    },
    textForgotPassword: {
        color: "#5890FF"
    },
    continueText: {
        color: Colors.bodyText,
        width: "100%",
        textAlign: "center",
        marginVertical: 16
    },
    optionsLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textSuggestSignUp: {
        color: Colors.bodyText
    },
    suggestSignUp: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16
    },
    textButton: {
        color: "#fff"
    }
})