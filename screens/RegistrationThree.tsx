import {ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ButtonWithJSX} from "../components/UI/ButtonWithJSX";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import {Input} from "../components/form/Input";
import {ButtonWithText} from "../components/UI/ButtonWithText";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../types/navigation";
import React, {useEffect, useState} from "react";
import {Bar} from "react-native-progress";
import Progressbarn from "../components/UI/Progressbarn";
import {Validate, validatePassword, validatePhonenumber, ValidType} from "../validation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {generateStrongPassword, getRandomInt} from "../gen";
import * as Keychain from 'react-native-keychain';
import { RootState, useAppDispatch } from "../redux/store";
import { setPassword } from "../redux/slice";
import { useSelector } from "react-redux";
import { RegistrationREQ, RegistrationRES } from "../dto/reg";
import { ErrorResponse, SuccessResponse } from "../types/response";
import { apiusers } from "../api/v1/api";
import { useMutation } from "@tanstack/react-query";




const RegistrationThree = () => {
     const navigations = useNavigation<Navigations>()
    const [password, setPasswordd] = useState<string>("")

    const dispatch = useAppDispatch()
    const currentstatereg = useSelector((state: RootState) => state.registration)
    const data = useSelector((state: RootState) => state.registration)

     const fgre = async (data: RegistrationREQ): Promise<SuccessResponse<RegistrationRES> | ErrorResponse> => {
      try {
          const req = await apiusers.post<RegistrationRES>("/users/registration", data);
          
          return {data: req.data, success: true}
    }
    catch(error: any) {
        return {error: error.response.data.error}
    }
    }




    const getPassword = (value: string) => {
        setPasswordd(value.trim())
    }
    const [res1, setRes1] = useState<ValidType>({fieldname: "password", result: "none", message: ""})



    const {mutate, isPending} = useMutation({
        mutationFn: fgre,
        onSuccess: () => {
            navigations.navigate('homeauth')
        }
    })

   
    return (
        <SafeAreaView style={styles.safe}>
            <View>
                <View style={{width: 40, height: 40}}> 
                            <Pressable android_ripple={{ color: '#3D3D3D', radius: 25}}  hitSlop={{right: 40, left: 10, top: 20}} style={{marginLeft: 1}} onPress={() => navigations.goBack()}>
                                <FontAwesome6 style={{color: "white", height: '100%', width: '100%'}} size={30} name="arrow-left-long"/>
                            </Pressable>
                 </View>
                <Text style={{marginTop: 20, fontSize: 27, color: "#E50A5E", fontWeight: 500}}>Создайте пароль</Text>
                <Text style={{fontSize: 18, color: "#E50A5E", fontWeight: 400}}>Придумайте надежный пароль не менее, чем из 6 букв и цифр.</Text>
            </View>
                <View style={styles.inputbox}>
                    <Pressable style={{ position: "absolute", zIndex: 1, left: 90, paddingRight: 10}} onPress={() => {
                            setPasswordd(generateStrongPassword(getRandomInt(6, 16)))
                            }}>
                        <FontAwesome5 style={{fontSize: 30, color: "#DFA91F"}}  name="question-circle"/>
                    </Pressable>

                    <Input generate={password} res={res1} Fn={getPassword} label="Пароль"/>
                </View>
             <Pressable  android_ripple={{ color: '#99083F' }} style={{width: '100%', height: 45, backgroundColor: '#E50A5E', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                const passvalid = Validate("password", password); setRes1(passvalid); if (passvalid.result) {
                    console.log({...data, password: password})
                    mutate ({name: data.naming.name, lastname: data.naming.lastname, password: password, phonenumber: data.phonenumber})
                    }}}>{!isPending ? (
            <Text style={{color: 'white', fontSize: 17, fontWeight: 500, letterSpacing: 0.3}}>Далее</Text>
        ) : (
           (<ActivityIndicator size={'small'} color={'white'}/>)
        )} </Pressable>
            <Progressbarn progress={1} value={"3"}/>
        </SafeAreaView>
    );
};
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
        marginTop: 20,
        marginBottom: 20,
    }
})

export default RegistrationThree;