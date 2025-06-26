import { StatusBar } from 'expo-status-bar';
import {
    ActivityIndicator,
    Button,
    Dimensions,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import {FieldType, Input} from "../components/form/Input";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {Logo} from "../components/Logo";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {ButtonWithText} from "../components/UI/ButtonWithText"
import {Navigations} from "../types/navigation";
import {AuthDataREQ, AuthDataRES} from "../dto/auth";
import {Validate, validatePassword, ValidType} from "../validation";
import axios from "axios";
import {apiusers} from "../api/v1/api";
import {useMutation, useQuery} from "@tanstack/react-query";
import { ErrorResponse, SuccessResponse } from '../types/response';

import { saveItemInStorage } from '../utils/securest';
import AsyncStorage from '@react-native-async-storage/async-storage';







export default function Autentification() {
    
    
    const navigation = useNavigation<Navigations>()
  
    const [auth, setAuth] = useState<AuthDataREQ>({Phonenumber: "", Password: ""})
    const [res1, setRes1] = useState<ValidType>({fieldname: "phonenumber", result: true, message: ""})
    const [res2, setRes2] = useState<ValidType>({fieldname: "password", result: true, message: ""})


    const fgre = async (data: AuthDataREQ): Promise<SuccessResponse<AuthDataRES> | null> => {
      try {
          const req = await apiusers.post<AuthDataRES>("/auth", data);
          return {data: req.data, success: true}
    }
    catch (error: any) {
            
          if (error.response.data.error === "Данного пользователя не существует") {
            setRes1(prev => ({ ...prev, result: false, message: error.response.data.error }));
            setRes2(prev => ({ ...prev, result: true, message: "" })); 
        } else if (error.response.data.error === "Неверный пароль") {
            setRes2(prev => ({ ...prev, result: false, message: error.response.data.error }));
            setRes1(prev => ({ ...prev, result: true, message: "" })); 
         
        } else {
            setRes1(prev => ({ ...prev, result: true, message: "" }));
            setRes2(prev => ({ ...prev, result: true, message: "" })); 
          
        }
        return null
      
      
    }
  
    }




    const getPH = (value: string) => {
        setAuth(auth => ({...auth, Phonenumber: value}))
    }
    const getPassword = (value: string) => {
        setAuth(auth => ({...auth, Password: value}))
    }

    const {mutate, isPending} = useMutation({
        mutationFn: fgre,
        onSuccess: async (body: SuccessResponse<AuthDataRES> | null) => {
            if (body !== null) {
                await saveItemInStorage('access_token', body.data.Tokens.access_token);
                await AsyncStorage.setItem(
                'user_data',
                 JSON.stringify({ name: body.data.Name, phonenumber: body.data.PhoneNumber })
                );
                 navigation.navigate('home')
            } 
           
        },
        
    })


    
    return (

        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
            <Logo/>
            <View style={styles.form}>
                <View style={styles.inputbox}>
                    <Input  res={res1} Fn={getPH} label="Номер телефона" />
                    <Input res={res2} Fn={getPassword} label="Пароль" />
                </View>
                <View style={{rowGap: 10}}>
                  <Pressable  android_ripple={{ color: '#99083F' }} style={{width: '100%', height: 45, backgroundColor: '#E50A5E', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                      const res1 = Validate("phonenumber", auth.Phonenumber);
                      const res2 = Validate("password", auth.Password);
                      if (res1.result === false) {
                          setRes1(res1)
                      }
                      if (res2.result === false){
                          setRes2(res2)
                          return
                      }                    
                      console.log(523)
                      mutate(auth)
                      

                  } }>{!isPending ?  <Text style={{color: 'white', fontSize: 17, fontWeight: 500, letterSpacing: 0.3}}>Войти</Text> : (<ActivityIndicator size={'large'} color={'white'}/>)}</Pressable>
                    <View style={styles.textactions}>
                        <Text style={{color: "white"}}>Нет аккаунта?</Text>
                        <Text onPress={() => {   navigation.navigate('registrationone');  }} style={{color: "#FF0C69", fontWeight: "500", paddingBottom: 10}}>Зарегистрироваться</Text>
                        
                    </View>
                </View>

            </View>
            <StatusBar style={"light"} />
        </SafeAreaView>


    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#333333",
        width: "100%",
    },
    form: {
        marginTop: 20,
        width:  Dimensions.get("window").width - 40,
        height: Dimensions.get("window").height / 2.4,
        justifyContent: "space-evenly"
    },
    inputbox: {
        justifyContent: "space-between",
        height: "55%",
        width: "100%",
    },
    safe: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: '#222222',
        paddingRight: 15,
        paddingLeft: 15
    },
    textactions: {
        flexDirection: "row",
        columnGap: 5
    }
});
