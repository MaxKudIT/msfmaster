import {Animated, Dimensions, Easing, StyleSheet, Text, View, ActivityIndicator, Pressable} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Input} from "../components/form/Input";
import {ButtonWithJSX} from "../components/UI/ButtonWithJSX";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import AntDesign from "react-native-vector-icons/AntDesign"
import {ButtonWithText} from "../components/UI/ButtonWithText";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../types/navigation";
import React, {useEffect, useRef, useState} from "react";
import {FI} from "../dto/auth";
import Progressbarn from "../components/UI/Progressbarn";
import {Bar} from "react-native-progress";
import {Validate, ValidType} from "../validation";
import { useAppDispatch } from "../redux/store";
import { setNaming } from "../redux/slice";


export const RegistrationOne = () => {

    const dispatch = useAppDispatch();


    const [res1, setRes1] = useState<ValidType>({fieldname: "normalfield", result: "none", message: ""})
    const [res2, setRes2] = useState<ValidType>({fieldname: "normalfield", result: "none", message: ""})

    const [fi, setFi] = useState<FI>({name: "", lastname: ""})
    const getName = (value: string) => {
        setFi(fi => ({...fi, name: value}))
    }
    const getLastName = (value: string) => {
        setFi(fi => ({...fi, lastname: value}))
    }
    const navigations = useNavigation<Navigations>()




    return (
        <SafeAreaView style={styles.safe}>

            <View>
                    <View style={{width: 40, height: 40}}> 
                          <Pressable android_ripple={{ color: '#3D3D3D', radius: 25}}  hitSlop={{right: 40, left: 10, top: 20}}  style={{marginLeft: 1}} onPress={() => navigations.navigate('homeauth')}>
                        <FontAwesome6 style={{color: "white", height: '100%', width: '100%'}} size={30} name="arrow-left-long"/>
                        </Pressable>
                    </View>
                   
               
                <Text style={{marginTop: 20, fontSize: 27, color: "#E50A5E", fontWeight: 500}}>Как вас зовут?</Text>
                <Text style={{fontSize: 18, color: "#E50A5E", fontWeight: 400}}>Введите свое имя и фамилию.</Text>
            </View>
            <View style={styles.inputbox}>
                <Input res={res1}  Fn={getName}  label="Имя" width="45%"/>
                <Input res={res2} Fn={getLastName} label="Фамилия" width="45%"/>
            </View>
            <Pressable  android_ripple={{ color: '#99083F' }} style={{width: '100%', height: 45, backgroundColor: '#E50A5E', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                
                const nameValidation = Validate("normalfield", fi.name);
                const lastNameValidation = Validate("normalfield", fi.lastname);
                

                setRes1({
                    result: nameValidation.result,
                    message: nameValidation.message
                });
                setRes2({
                    result: lastNameValidation.result,
                    message: lastNameValidation.message
                });
                
                if (nameValidation.result && lastNameValidation.result) {
                    dispatch(setNaming({name: fi.name.trim(), lastname: fi.lastname.trim()}))
                    navigations.navigate("registrationtwo");
                }
            }}> 
            <Text style={{color: 'white', fontSize: 17, fontWeight: 500, letterSpacing: 0.3}}>Далее</Text>
            </Pressable>
            <Progressbarn progress={0.3} value={"1"}/>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#222222',
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
    },
    inputbox: {
        width: Dimensions.get("window").width - 30,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20,
    },
    loading: {
        alignSelf: "center",
        marginTop: Dimensions.get("window").height / 2 - 30
    }

})