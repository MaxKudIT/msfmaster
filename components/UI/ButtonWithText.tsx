import {ActivityIndicator, GestureResponderEvent, Pressable, StyleSheet, Text, View} from "react-native";
import {useRef, useState} from "react";

type ButtonProps = {
    text: string,
    onpressout?: (() => void),
    isPending: boolean
}
export const ButtonWithText = ({text, onpressout, isPending}: ButtonProps) => {
    const buttonRef = useRef<View>(null);
    const [buttonLayout, setButtonLayout] = useState({ width: 0, height: 0, x: 0, y: 0 });
    const [IsPressed, setIsPressed] = useState(false)




    return (
        <Pressable
            onPressIn={() => {setIsPressed(true); }} // При начале нажатия
            onPressOut={() => {    {setIsPressed(false);
                if (onpressout !== undefined) onpressout()} }}
            style={[
                styles.button,
                { backgroundColor: IsPressed ? '#9F0742' : '#E50A5E' }
            ]}
        >
            {isPending ? (<ActivityIndicator color="white" size={30}/>) : 
            <Text style={{fontSize: 18, color: 'white'}}>{text}</Text>
            }
          
        </Pressable>
    )
}


const styles = StyleSheet.create({
    button: {
        height: 45,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    }
})