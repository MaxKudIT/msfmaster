import React from 'react';
import {StyleSheet, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const FooterMenu = () => {
    return (
        <View style={styles.footer}>
            <MaterialIcons name={'mode-night'} size={35} color={'white'}/>
            <MaterialIcons name={'language'} size={35} color={'white'}/>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#2B2B2B',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    }
})

export default FooterMenu;