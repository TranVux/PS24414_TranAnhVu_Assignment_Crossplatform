import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState, Children } from 'react'
import { Colors } from '../../assets/constants/Colors';
import { IconClose, IconHidePassword, IconWarning } from '../../assets/images';
import { TextSmall } from '../../assets/constants/Typography';

const INPUTSTATE = {
    NORMAL: "NORMAL",
    ERROR: "ERROR"
}

const InputField = (
    { children, iconLeft = false, iconRight = false, titleField, placeholder = "", secureTextEntry = false,
        ref, inputContainerStyle, inputStyle, importance, onChangeText = (text) => { },
        onPressIconRight = () => { }, onPressIconLeft = () => { }
    }
) => {

    const [inputState, setInputState] = useState(INPUTSTATE.NORMAL)
    const [showText, setshowText] = useState(secureTextEntry)
    const [inputFocus, setInputFocus] = useState(false)
    const [text, setText] = useState("")

    const handleDeleteText = () => {
        setText("")
        console.log("Delete text");
        onChangeText("");
    }

    const handleShowPassword = () => {
        let tempShowText = showText;
        tempShowText = !tempShowText;
        setshowText(tempShowText);
    }

    const handleChangeText = (newText) => {
        onChangeText(newText);
        setText(newText);
    }

    const handleInputFocus = () => {
        let tempInputFocus = inputFocus;
        setInputFocus(!tempInputFocus);
    }
    return (
        <View style={{ ...inputContainerStyle }}>
            <View style={styles.titleContainer}>
                <Text style={[TextSmall, { color: Colors.bodyText }]}>{titleField}</Text>
                {importance && <Text style={{ color: Colors.errorDark }}>*</Text>}
            </View>
            <View style={styles.textInputContainer}>
                {/* <View style={styles.iconLeftContainer}> */}
                {iconLeft &&
                    Children.map(children, child => {
                        if (child.props.iconLeft) {
                            return (
                                <Pressable style={styles.iconLeftContainer} onPress={onPressIconLeft}>{child}</Pressable>
                            )
                        }
                    })
                }
                {/* </View> */}
                {/* <View style={styles.iconRightContainer}> */}
                {iconRight && (!inputFocus || text.length === 0) &&
                    Children.map(children, child => {
                        if (child.props.iconRight) {
                            return (
                                <Pressable style={styles.iconRightContainer} onPress={onPressIconRight}>{child}</Pressable>
                            )
                        }
                    })
                }
                {/* </View> */}
                <TextInput
                    placeholder={placeholder}
                    cursorColor={inputState === INPUTSTATE.NORMAL ? Colors.bodyText : Colors.errorDark}
                    onFocus={handleInputFocus}
                    onBlur={handleInputFocus}
                    style={[
                        TextSmall,
                        styles.input,
                        {
                            color: Colors.titleActive,
                            borderColor: inputState === INPUTSTATE.ERROR ? Colors.errorDark : Colors.bodyText,
                            backgroundColor: inputState === INPUTSTATE.ERROR ? Colors.errorLight : "#fff",
                            paddingStart: iconLeft ? 40 : 10,
                            paddingEnd: iconRight ? 40 : 10
                        },
                        { ...inputStyle }
                    ]}
                    value={text}
                    onChangeText={newText => handleChangeText(newText)}
                    secureTextEntry={showText} />

                {/* icon show password */}
                {secureTextEntry &&
                    <Pressable onPress={handleShowPassword} style={styles.iconEnd}>
                        <IconHidePassword width={24} height={24} />
                    </Pressable>}

                {/* icon clear text */}
                {
                    (text.length > 0) && !secureTextEntry && inputFocus &&
                    <Pressable onPress={handleDeleteText} style={styles.iconEnd}>
                        <IconClose
                            width={19} height={19}
                            fill={inputState === INPUTSTATE.ERROR ? Colors.errorDark : Colors.bodyText} />
                    </Pressable>
                }
            </View>
            {/* warning */}
            {inputState === INPUTSTATE.ERROR &&
                <View View style={styles.warningContainer}>
                    <IconWarning width={16} height={16} />
                    <Text style={[TextSmall, styles.warningText]}>Invalid {titleField}</Text>
                </View>}
            {/* end warning */}
        </View >
    )
}

export default InputField

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
    },
    input: {
        borderWidth: 2,
        borderRadius: 6,
        flex: 1,
        position: 'relative',
        textAlignVertical: "center",
    },
    titleField: {
        marginBottom: 4,
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: "center",
    },
    iconEnd: {
        position: "absolute",
        end: 11,
    },
    warningContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center"
    },
    warningText: {
        color: Colors.errorDark
    },
    iconLeftContainer: {
        position: 'absolute',
        start: 12,
        zIndex: 1
    },
    iconRightContainer: {
        position: 'absolute',
        end: 12,
        zIndex: 1
    }
})