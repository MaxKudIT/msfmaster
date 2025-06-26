import React, {FC, useEffect, useState} from 'react';
import {TextInput, View, Text, StyleSheet, DimensionValue} from "react-native";
import {validatePassword, ValidType} from "../../validation";
import {ButtonWithJSX} from "../UI/ButtonWithJSX";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

export type FieldType = "phonenumber" | "password" | "normalfield"

interface FormInput {
    label: string,
    width?: DimensionValue,
    Fn: (value: string) => void,
    res: ValidType,
    generate?: string,
    type?: FieldType
}



export const Input = ({label, width = "100%", Fn, res, generate, type}: FormInput) => {
    const [text, setText] = useState("")
    return (
        <View style={[styles.input, {width: width}]}>
            <Text style={styles.label}>{label}</Text>
            {!res.result && <Text style={{color: "red", paddingLeft: 10, fontSize: 13}}>{res.message}</Text>}
            <TextInput value={generate} onChangeText={(text: string) => {Fn(text);  {setText(text);   }}} style={[styles.textbox]} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 80,
        backgroundColor: "#222222",
        justifyContent: "space-between",
    },
    textbox: {
        width: "100%",
        height: 45,
        backgroundColor: "#3B3B3B",
        borderRadius: 15,
        color: "#FF0C69",
        fontSize: 16,
        fontWeight: "500",
        paddingLeft: 10,
        paddingRight: 10,
    },
    label: {
        fontSize: 18,
        color: "white",
        paddingLeft: 10,
    }
})
