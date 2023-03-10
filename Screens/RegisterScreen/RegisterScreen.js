import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputField from '../../Components/InputField'
import { Colors } from '../../assets/constants/Colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Button from '../../Components/Button'
import { IconFacebook, IconGoogle } from '../../assets/images'
import { DisplayLargeBold, LinkMediumBold, LinkSmallBold, TextLarge, TextSmall } from '../../assets/constants/Typography'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AxiosIntance from '../../utils/AxiosIntance'

const RegisterScreen = ({ navigation }) => {

    const [usename, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (usename, password) => {
        try {
            const responseRegister = await AxiosIntance().post(
                "/users/register", { email: usename, password: password }
            );
            console.log(responseRegister);
            console.log(responseRegister.data.error);

            if (!responseRegister.data.error) {
                navigation.navigate("LoginScreen");
                ToastAndroid.show("Đăng ký thành công", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Đăng ký thất bại. Có thể tài khoản của bạn đã tồn tại", ToastAndroid.SHORT);
            }
        } catch (err) {
            ToastAndroid.show("Đăng ký thất bại", ToastAndroid.SHORT);
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
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.registerScreenContainer}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={[DisplayLargeBold, { color: Colors.primaryColor }]}>Hello!</Text>
                    </View>
                    <View style={styles.subTitleContainer}>
                        <Text style={[TextLarge, styles.subTitle]}>Signup to get Started</Text>
                    </View>
                </View>
                <View style={styles.formContainer}>
                    {/* input field */}
                    <InputField titleField="Username" secureTextEntry={false} inputContainerStyle={{ marginBottom: 16 }} onChangeText={(text) => { handleUserNameChange(text) }} />
                    <InputField titleField="Password" secureTextEntry={true} onChangeText={(text) => { handlePasswordChange(text) }} />
                    {/*  */}

                    <View style={styles.optionFormContainer}>
                        <BouncyCheckbox
                            size={20}
                            style={styles.checkBox}
                            text="Remember me "
                            textStyle={[TextSmall, styles.checkBoxTextStyle]}
                            iconStyle={{ borderRadius: 3 }}
                            fillColor={Colors.primaryColor}
                            unfillColor={"#fff"}
                            innerIconStyle={{ borderRadius: 3, borderWidth: 2, borderColor: Colors.primaryColor }}
                            onPress={(isChecked) => { /**Handle checked event of radio button */ }} />
                        {/* <TouchableOpacity>
                        <Text style={[TextSmall, styles.textForgotPassword]}>Forgot the password ?</Text>
                    </TouchableOpacity> */}
                    </View>
                </View>
                <Button
                    style={{ marginTop: 18 }}
                    height={50}
                    onPress={() => { handleRegister(usename, password) }}>
                    <Text style={[LinkMediumBold, , styles.textButton, {}]}>Register</Text>
                </Button>
                <Text style={[TextSmall, styles.continueText]}>or continue with</Text>
                <View style={styles.optionsLoginContainer}>
                    <Button
                        height={48}
                        width={158}
                        secondary
                        onPress={() => { console.log("Register Facebook"); }}>
                        <IconFacebook />
                        <Text style={[LinkMediumBold, styles.textButton, { color: Colors.buttonText }]}>Facebook</Text>
                    </Button>
                    <Button
                        height={48}
                        width={158}
                        secondary
                        onPress={() => { console.log("Register Google"); }}>
                        <IconGoogle />
                        <Text style={[LinkMediumBold, styles.textButton, { color: Colors.buttonText }]}>Google</Text>
                    </Button>
                </View>
                <View style={styles.suggestSignUp}>
                    <Text style={[TextSmall, styles.textSuggestSignUp]}>Already have an account ? </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("LoginScreen") }}>
                        <Text style={[LinkSmallBold, { color: Colors.primaryColor, }]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    registerScreenContainer: {
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