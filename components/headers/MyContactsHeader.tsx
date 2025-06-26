import React, {useEffect, useRef, useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../../types/navigation";
import Entypo from "react-native-vector-icons/Entypo";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {setContactClamping, setDeleting, setSearchActive, setSearchValue} from "../../redux/slice";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";





const MyContactsHeader = () => {
    const navigations = useNavigation<Navigations>()
    const isClamp = useSelector((state: RootState) => state.events.clampingContacts)
    const activity = useSelector((state: RootState) => state.events.search.isActive)
    const dispatch = useAppDispatch()

    const input = useRef<TextInput>(null);


    useEffect(() => {
        if (input.current) {
            input.current.focus();
            console.log(5)
        }
    }, [activity]);

    return (
        <LinearGradient colors={['#3D212B', '#780632']}   style={styles.header}>
            <View style={styles.firstcontainer}>
                {isClamp.length === 0 ? (
                    <Pressable hitSlop={{right: 20, left: 10, top: 20}} onPress={() => navigations.goBack()} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 20 }} style={{height: '80%', width: 40, justifyContent: 'flex-end', paddingBottom: 11, paddingLeft: 5, alignItems: 'flex-start'}}>
                        <AntDesign name={'left'} size={23} color={'white'}/>
                    </Pressable>
                ) : (
                    <Pressable onPress={() => dispatch(setContactClamping([]))} hitSlop={{right: 20, left: 10, top: 20}}  android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 20 }} style={{height: '80%', width: 40, justifyContent: 'flex-end', paddingBottom: 8, paddingLeft: 5, alignItems: 'flex-start'}}>
                        <Entypo name={'cross'} size={27} color={'white'}/>
                    </Pressable>
                )}
                {activity ? (
                    <View style={{height: '80%', width: '80%', justifyContent: 'flex-end', paddingRight: 5, paddingLeft: 5, borderWidth: 1, borderBottomColor: '#CCCCCC', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: 'transparent'}}>
                        <TextInput ref={input} onChangeText={(text: string) => dispatch(setSearchValue(text))}  style={{maxWidth: '100%', color: 'white', fontSize: 14, fontWeight: '500'}} placeholderTextColor={'#CCCCCC'} placeholder={'Поиск контактов'}/>
                    </View>
                        ) : (
                    <Text style={{color: 'white', fontSize: 17, fontWeight: 600, marginBottom: 9}}>Мои контакты</Text>
                )}

            </View>
                {isClamp.length === 0 ? (
                    <View style={styles.secondcontainer}>
                        {activity ? (
                            <Pressable style={{width: 45, height: 45, justifyContent: 'flex-end', alignItems: 'center'}} onPress={() => {dispatch(setSearchActive(false)); dispatch(setSearchValue(''))}} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 21 }}  >
                                <MaterialIcons style={{color: "white", paddingBottom: 5, paddingRight: 6}} size={30} name="search-off"/>
                            </Pressable>
                        ) : (
                            <Pressable style={{width: 45, height: 45, justifyContent: 'flex-end', alignItems: 'center'}} onPress={() => dispatch(setSearchActive(true))} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 21 }}  >
                                <AntDesign style={{color: "white", paddingBottom: 10, paddingRight: 10}} size={23} name="search1"/>
                            </Pressable>
                        )}

                    </View>
                ) : (
                    <View style={styles.secondcontainer}>
                        {isClamp.length > 1 ? (
                            <Pressable style={{width: 45, height: 45, justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 2}}  android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 21 }}  >
                                <Entypo style={{color: "white", paddingBottom: 8 , paddingRight: 10}} size={23} name="block"/>
                            </Pressable>
                        ) : (
                            <Pressable style={{width: 45, height: 45, justifyContent: 'flex-end', alignItems: 'center'}} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 21 }}  >
                                <AntDesign style={{color: "white", paddingBottom: 9, paddingRight: 10}} size={23} name="edit"/>
                            </Pressable>
                        )}
                        <Pressable  onPress={() => {
                            dispatch(setDeleting(true))
                        }} style={{width: 45, height: 45, justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 2}} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 21 }} hitSlop={{right: 30, bottom: 25, top: 25}}>
                            <AntDesign style={{color: "white", paddingBottom: 8, paddingRight: 10}} size={23} name="delete"/>
                        </Pressable>
                    </View>
                )}




        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 80,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        justifyContent: "space-between",

    },
    firstcontainer: {
        width: '65%',
        height: "70%",
        flexDirection: "row",
        alignItems: "flex-end",
        marginLeft: 5,
        justifyContent: "flex-start",
        columnGap: 20

    },
    secondcontainer: {
        width: "25%",
        height: "70%",
        flexDirection: "row",
        alignItems: "flex-end",
        marginRight: 5,
        justifyContent: "flex-end",
        columnGap: 5,

    }
})
export default MyContactsHeader;