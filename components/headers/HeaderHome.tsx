import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text, Pressable, TextInput} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from  "react-native-vector-icons/AntDesign";
import {ButtonWithJSX} from "../UI/ButtonWithJSX";
import Ripple from "react-native-material-ripple";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../../types/navigation";
import {setHomeSearchActive, setHomeSearchValue, setSearchActive, setSearchValue} from "../../redux/slice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";


enum Correspondence {
    chat,
    group
}

const HeaderHome = ({correspcurrent}: {correspcurrent: Correspondence}) => {
    const navigations = useNavigation<Navigations>()
    const activity = useSelector((state: RootState) => state.events.searchhome.isActive)
    const dispatch = useAppDispatch()


    const input = useRef<TextInput>(null)

    useEffect(() => {
        if (input.current) {
            input.current.focus();
            console.log(3)
        }
    }, [activity]);

    return (
        <LinearGradient colors={['#3D212B', '#780632']}   style={styles.header}>
            <View style={styles.firstcontainer}>
                    <Pressable style={{ width: 45, height: 45, alignItems: 'flex-end', justifyContent: 'flex-end'}} hitSlop={{right: 20, left: 10, top: 20}}  android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 21 }} onPress={() => {navigations.navigate('menu')}}>
                        <AntDesign style={{color: "white", paddingBottom: 10, paddingRight: 10}} size={25} name="menufold"/>
                    </Pressable>
                {activity ? (
                    <View style={{height: '80%', width: '65%', justifyContent: 'flex-end', paddingRight: 5, paddingLeft: 5, borderWidth: 1, borderBottomColor: '#CCCCCC', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: 'transparent'}}>
                        <TextInput ref={input} onChangeText={(text: string) => dispatch(setHomeSearchValue(text))}  style={{maxWidth: '100%', color: 'white', fontSize: 14, fontWeight: '500'}} placeholderTextColor={'#CCCCCC'} placeholder={'Поиск переписок'}/>
                    </View>
                ) : (
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, paddingBottom: 9}}>Messkud</Text>
                )}


            </View>
            <View style={styles.secondcontainer}>
                {activity ? (
                    <Pressable style={{width: 45, height: 45, justifyContent: 'flex-end', alignItems: 'center'}} onPress={() => {dispatch(setHomeSearchActive(false)); dispatch(setHomeSearchValue(''))}} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 21 }}  >
                        <MaterialIcons style={{color: "white", paddingBottom: 5, paddingRight: 6}} size={30} name="search-off"/>
                    </Pressable>
                ) : (

                    <Pressable onPress={() => {dispatch(setHomeSearchActive(true))}} style={{paddingLeft: 5,  width: 45, height: 45, alignItems: 'center', justifyContent: 'flex-end'}} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 21 }}  >
                        <AntDesign style={{color: "white", paddingBottom: 10, paddingRight: 10}} size={23} name="search1"/>
                    </Pressable>
                )}

                {correspcurrent === Correspondence.chat ? (
                    <Pressable hitSlop={{right: 10, bottom: 20, top: 20}} style={{ paddingLeft: 10,  width: 45, height: 45, alignItems: 'center', justifyContent: 'flex-end'}}  onPress={() => navigations.navigate('adding')} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 21 }} >
                        <AntDesign style={{color: "white", paddingBottom: 10, paddingRight: 10}} size={23} name="adduser"/>
                    </Pressable>
                ) : (
                    <Pressable style={{ paddingLeft: 10,  width: 45, height: 45, alignItems: 'center', justifyContent: 'flex-end'}}  onPress={() => navigations.navigate('create')} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 21 }} hitSlop={{right: 10, bottom: 20, top: 20}} >
                        <AntDesign style={{color: "white", paddingBottom: 10, paddingRight: 10}} size={23} name="addusergroup"/>
                    </Pressable>
                )}


            </View>
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

        columnGap: 25
    },
    secondcontainer: {
        width: "35%",
        height: "70%",
        flexDirection: "row",
        alignItems: "flex-end",
        marginRight: 5,
        justifyContent: "flex-end",
        columnGap: 5,


    }
})


export default HeaderHome;