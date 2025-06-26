import React, {useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {ButtonWithJSX} from "../UI/ButtonWithJSX";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../../types/navigation";
import {ButtonWithText} from "../UI/ButtonWithText";
import MaterialComm from "../UI/ActionsWithIcons/MaterialComm";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { PhoneParsing } from '../../utils/formating';

const HeaderMenu = ({name, phonenumber}: {name: string, phonenumber: string}) => {
    const navigations = useNavigation<Navigations>()
    const status = useSelector((state: RootState) => state.websocketP.isActive)
    return (

            <LinearGradient colors={['#360311', '#730330']} start={[0, 0]} end={[0, 1]}  style={styles.header}>

                <View style={styles.nullcont}>
                    <Pressable  hitSlop={{right: 20, left: 10, top: 20}}  android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 20 }} style={{width: 40, height: 40, alignItems: 'flex-end', justifyContent: 'flex-end'}} onPress={() => {navigations.goBack()}}>
                        <AntDesign style={{color: "white", paddingBottom: 10, paddingRight: 10}} size={25} name="arrowright"/>
                    </Pressable>
                </View>
                <View style={styles.firstcont}>
                    <View style={styles.leftcont}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Image style={{height: 55, width: 55, borderRadius: 50, marginLeft: 10}} source={{uri: 'https://avatars.mds.yandex.net/get-yapic/57243/DLiLjOMG0dONRdPI1CSB8yq4DNg-1/orig'}}/>
                            {status && (
                                 <View style={{width: 13, height: 13, backgroundColor: '#FF0C69', position: 'absolute', left: 48, borderRadius: 50, bottom: 2}}></View>
                            )}
                           
                        </View>

                        <View>
                            <Text style={{fontSize: 16, color: 'white', fontWeight: '700', letterSpacing: 0.3}}>{name}</Text>
                            <Text style={{fontSize: 16, color: 'white', fontWeight: '700', letterSpacing: 0.3}}>{PhoneParsing(phonenumber)}</Text>
                        </View>
                    </View>
                </View>
                {/*<View style={styles.secondcont}>*/}
                {/*    <MaterialComm text={'Мой аккаунт'} name={'account-circle-outline'}/>*/}
                {/*</View>*/}

            </LinearGradient>


    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 150,
        rowGap: 10,

    },
    nullcont: {
      width: '100%',
      height: 50,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    firstcont: {
        width: '100%',
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
    },
    leftcont: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        marginLeft: 30,

    },
    secondcont: {

        paddingLeft: 45
    }

})


export default HeaderMenu;