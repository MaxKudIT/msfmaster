import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const FeatherIc = ({text, name, bord}: {text: string, name: string, bord?: boolean}) => {
    return (
        <Pressable  android_ripple={{ color: 'rgba(150, 150, 150, 0.4)' }} style={[styles.container, { borderTopColor: bord ? 'rgba(179, 179, 179, 0.5)' : 'transparent'}]} >
            <Feather size={22} color={'white'} name={name}/>
            <Text style={{fontSize: 16, color: '#D1D1D1', fontWeight: '500'}}>{text}</Text>
        </Pressable>
    );
};
const styles =  StyleSheet.create({
    container: {
        width: 280,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 10,
        marginLeft: 40,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderWidth: 0.6,
    }
})

export default FeatherIc;