import {DimensionValue, StyleSheet, Text, TextInput, View} from "react-native";
import {ValidType} from "../../validation";
import React, {useState} from "react";
import {FieldType} from "./Input";

interface FormInput {

    width?: DimensionValue,
    Fn: (value: string) => void,
    res: ValidType,
    generate?: string,
    type?: FieldType,
    placeholder: string
}



export const InputForAdding = ({ width = "100%", Fn, res, generate, type, placeholder}: FormInput) => {
    const [text, setText] = useState("")
    return (
        <View style={[styles.input, {width: width}]}>
            {!res.result && <Text style={{color: "red", paddingLeft: 10, fontSize: 13}}>{res.message}</Text>}
            <TextInput  placeholder={placeholder} placeholderTextColor={'#CCCCCC'} value={generate} onChangeText={(text: string) => {Fn(text);  {setText(text);   }}} style={[styles.textbox]} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: "70%",
        height: 70,
        backgroundColor: "transparent",
        alignItems: 'center',
    },
    textbox: {
        width: "85%",
        height: 45,
        backgroundColor: "#4A4A4A",
        borderRadius: 15,
        color: "white",
        fontSize: 15,
        fontWeight: "500",
        paddingLeft: 10,
        paddingRight: 10,
    },
    label: {
        fontSize: 16,
        color: "white",
        paddingLeft: 10,
    }
})
