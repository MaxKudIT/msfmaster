import React from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {ButtonWithJSX} from "../ButtonWithJSX";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../../../types/navigation";

const UserUpField = ({name, avatarUrl, status}: {name: string, avatarUrl: string, status: boolean}) => {
    const navigations = useNavigation<Navigations>()
    return (
        <LinearGradient style={styles.upfield} colors={['#222222', '#333333']} >
            <Pressable hitSlop={{right: 10, bottom: 20, top: 20, left: 10}} onPress={() => navigations.goBack()} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 20 }} style={{height: '100%', width: 60, justifyContent: 'center', alignItems: 'center'}}>
                <AntDesign name={'left'} size={23} color={'white'}/>
            </Pressable>
            <View style={{height: '100%', width: 65, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{height: 45, width: 45, borderRadius: 50}} source={{uri: avatarUrl}}/>
            </View>
            <View style={{height: '100%', width: '40%', justifyContent: 'center', rowGap: 2}}>
                <Text style={{fontSize: 16.5, fontWeight: 'bold', color: '#E8E8E8'}}>{name}</Text>
                {status ? (
                    <Text style={{fontSize: 12, color: '#FF0062'}}>в сети</Text>
                ) : (
                    <Text style={{fontSize: 12, color: '#969696'}}>был(а) недавно</Text>
                )}
              
              
            </View>
            <View style={{columnGap: 5,  paddingRight: 10, height: '100%', flexGrow: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Pressable hitSlop={{left: 10, bottom: 20, top: 20}} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 20 }} style={{width: 45, height: 45, justifyContent: 'center', alignItems: 'center'}}>
                    <AntDesign style={{color: "white"}} size={23} name="search1"/>
                </Pressable>
                <Pressable hitSlop={{right: 10, bottom: 20, top: 20}} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 20 }} style={{width: 45, height: 45, justifyContent: 'center', alignItems: 'center'}}>
                    <Entypo name={'dots-three-vertical'} size={23} color={'white'}/>
                </Pressable>

            </View>
        </LinearGradient>
    );
};


const styles = StyleSheet.create({
    upfield: {
        width: '100%',
        height: 55,
        flexDirection: 'row',
        
    }
})

export default UserUpField;