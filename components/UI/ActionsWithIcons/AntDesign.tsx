import React from 'react';
import AntDesign from "react-native-vector-icons/AntDesign";

import {Pressable, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../../../types/navigation";



export type Path = 'adding' | 'create' | 'mycontacts' | 'create' | 'home' | 'back'




const AntDesignAct = ({text, name, bord, path}: {text: string, name: string, bord?: boolean, path?: Path}) => {
    const navigations = useNavigation<Navigations>()
    return (
        <Pressable onPress={() => { if (path === 'back') {navigations.goBack()} else  navigations.navigate(path!) }}  android_ripple={{ color: 'rgba(150, 150, 150, 0.4)' }} style={[styles.container, { borderTopColor: bord ? 'rgba(179, 179, 179, 0.5)' : 'transparent'}]} >
            <AntDesign size={25} color={'white'} name={name}/>
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

export default AntDesignAct;