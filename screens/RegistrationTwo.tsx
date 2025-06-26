import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ButtonWithJSX} from "../components/UI/ButtonWithJSX";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import {Input} from "../components/form/Input";
import {ButtonWithText} from "../components/UI/ButtonWithText";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../types/navigation";
import {Bar} from 'react-native-progress';
import Progressbarn from "../components/UI/Progressbarn";
import {Validate, validatePhonenumber, ValidType} from "../validation";
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { setPhonenumber } from '../redux/slice';
import { ErrorResponse, SuccessResponse } from '../types/response';
import { apiusers } from '../api/v1/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native-paper';
import { useGetData } from '../hooks/api';



type ResultPNTrue = {
    type: 'exists'
    result: true
    message: string
}


type ResultPNFalse = {
    type: 'notexists'
    result: false

}

const RegistrationTwo = () => {
    const navigations = useNavigation<Navigations>()
    const [phoneNumber, setPH] = useState<string>("")
    const getPH = (value: string) => {
        setPH(value.trim())
    }

    const {fetchData, loading} = useGetData<{message?: string, result: boolean, type: string}>()
   

     const dispatch = useAppDispatch()
    
    const [res1, setRes1] = useState<ValidType>({fieldname: "phonenumber", result: true, message: ""})
    
    return (
        <SafeAreaView style={styles.safe}>
            <View>
                    <View style={{width: 40, height: 40}}> 
                            <Pressable  android_ripple={{ color: '#3D3D3D', radius: 25}}  hitSlop={{right: 40, left: 10, top: 20}} style={{marginLeft: 1}} onPress={() => navigations.goBack()}>
                                    <FontAwesome6 style={{color: "white", height: '100%', width: '100%'}} size={30} name="arrow-left-long"/>
                            </Pressable>
                    </View>
                <Text style={{marginTop: 20, fontSize: 27, color: "#E50A5E", fontWeight: 500}}>Ваш номер телефона?</Text>
                <Text style={{fontSize: 18, color: "#E50A5E", fontWeight: 400}}>Введите ваш текущий номер телефона.</Text>
            </View>
            <View style={styles.inputbox}>
                <Input type="phonenumber" res={res1}  Fn={getPH} label="Номер телефона"/>
            </View>
           <Pressable  android_ripple={{ color: '#99083F' }} style={{width: '100%', height: 45, backgroundColor: '#E50A5E', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} onPress={ 
            async () => {const phvalid = Validate("phonenumber", phoneNumber); setRes1(phvalid); if (phvalid.result) {
           
            const data = await fetchData(`/users/isExists/${phoneNumber}`)
            console.log(data)
            if ('message' in data!) {
                 setRes1(prev => ({...prev, message: data?.message!, result: false}))
            } else {
                 dispatch(setPhonenumber(phoneNumber))
                navigations.navigate('registrationthree')
            }
         
        }}}>{!loading ? (
            <Text style={{color: 'white', fontSize: 17, fontWeight: 500, letterSpacing: 0.3}}>Далее</Text>
        ) : (
           (<ActivityIndicator size={'small'} color={'white'}/>)
        )} 
        </Pressable>
            <Progressbarn progress={0.6} value={"2"}/>
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
        marginBottom: 20
    }
})
export default RegistrationTwo;