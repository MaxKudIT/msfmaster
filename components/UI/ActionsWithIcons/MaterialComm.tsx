import React from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Pressable, StyleSheet, Text, View} from "react-native";




const MaterialComm = ({text, name, bord}: {text: string, name: string, bord?: boolean}) => {
    return (
        <Pressable  android_ripple={{ color: 'rgba(150, 150, 150, 0.4)' }} style={[styles.container, { borderTopColor: bord ? 'rgba(179, 179, 179, 0.5)' : 'transparent'}]} >

            <MaterialCommunityIcons size={25} color={'#E8E8E8'} name={name}/>
            <Text style={{fontSize: 16, color: '#E8E8E8', fontWeight: '500'}}>{text}</Text>
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
        marginLeft: 20,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderWidth: 0.6,

    }
})

export default MaterialComm;