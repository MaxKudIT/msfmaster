import React, {useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import AntDesign from "react-native-vector-icons/AntDesign";
import {InputForAdding} from "../../components/form/InputForAdding";
import {ValidType} from "../../validation";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../../types/navigation";

const CreateGroup = () => {

    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [res1, setRes1] = useState<ValidType>({fieldname: "phonenumber", result: true, message: ""})
    const changePhone = (phone: string) => {
        setPhone(phone)
    }
    const changeName = (name: string) => {
        setName(name)
    }
    const navigations = useNavigation<Navigations>()
    return (
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
            <ImageBackground style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}} source={{uri: 'https://i.pinimg.com/736x/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg'}}>
                <View style={{width: '100%', height: 55, position: 'absolute', top: 0}}>
                    <Pressable onPress={() => navigations.goBack()} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 20 }} style={{height: '100%', width: 60, justifyContent: 'center', alignItems: 'center'}}>
                        <AntDesign name={'left'} size={23} color={'white'}/>
                    </Pressable>
                </View>
                <LinearGradient colors={['#141414', '#303030']}   style={styles.modal}>
                    <Text style={{color: 'white', fontSize: 19, fontWeight: '500', marginBottom: 'auto'}}>Создание группы</Text>
                    <InputForAdding placeholder={'Название'} Fn={changePhone} res={res1}/>

                    <Pressable android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 30 }} style={styles.button} >
                        <AntDesign name={'rightcircleo'} size={45} style={{color: '#E50A5E'}}/>
                    </Pressable>
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#262626',
    },
    modal: {
        width: 300,
        height: 250,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',

        paddingTop: 20,
        paddingBottom: 20,

    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',

    }
})

export default CreateGroup;