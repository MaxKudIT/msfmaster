import {ReactNode, useState} from "react";
import {
    GestureResponderEvent,
    Pressable, PressableStateCallbackType, StyleProp, ViewStyle,
} from "react-native";



type ButtonProps = {
    onpressout?: (((event: GestureResponderEvent) => void) | null | undefined)
    children: ReactNode,
    stylep?:StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}


export const ButtonWithJSX = ({onpressout, children, stylep}: ButtonProps) => {

    return (
        <Pressable
            android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 25 }}

            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
            style={stylep}
            onPress={onpressout}
        >
            {children}
        </Pressable>
    )
}



