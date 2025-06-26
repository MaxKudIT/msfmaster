import React, {useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {InputForAdding} from "../../components/form/InputForAdding";
import AntDesign from "react-native-vector-icons/AntDesign";
import {ValidType} from "../../validation";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../../types/navigation";
import { ContactReqDTO } from '../../dto/contact';
import { SuccessResponse } from '../../types/response';
import { apiusers } from '../../api/v1/api';
import { useMutation } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const AddingContact = () => {
     const accessToken = useSelector((state: RootState) => state.data.access_token);
     if (accessToken === null) {
        return
     }
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [res1, setRes1] = useState<ValidType>({fieldname: "phonenumber", result: true, message: ""})
    const changePhone = (phone: string) => {
        setPhone(phone)
    }
    const changeName = (name: string) => {
        setName(name)
    }
   
    const [errorst, setError] = useState('')
     const fgre = async (data: ContactReqDTO) => {
          try {
           
              await apiusers.post("/contacts/add", data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
              });
        }
        catch (error: any) {
            setError(error.response.data.error)
             throw error
        }
     }

    
    const navigations = useNavigation<Navigations>()
      const {mutate, isPending, isError, reset} = useMutation({
        mutationFn: fgre,
        onSuccess: () => {
            navigations.navigate('home')
        }
    }
    )
    return (
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
            <ImageBackground style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }} source={{uri: 'https://i.pinimg.com/736x/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg'}}>
                <View style={{width: '100%', height: 55, position: 'absolute', top: 0}}>
                    <Pressable onPress={() => navigations.goBack()} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 20 }} style={{height: '100%', width: 60, justifyContent: 'center', alignItems: 'center'}}>
                        <AntDesign name={'left'} size={23} color={'white'}/>
                    </Pressable>
                </View>
                {isError && (
                    <Pressable onPress={() => reset()}  style={{position: 'absolute', zIndex: 2, height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', alignItems: 'center', justifyContent: 'center'}}>
                        <Pressable onPress={(e) => e.stopPropagation()}>
                        <LinearGradient  colors={['#141414', '#303030']}   style={styles.modalerror}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 'auto'}}>Возникла ошибка</Text>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: '700', marginBottom: 'auto', marginLeft: 10}}>{errorst}</Text>

                    <Pressable onPress={() => {
                      reset()
                    }} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 28 }} style={styles.buttonok} >
                      <Text style={{color: 'white', fontSize: 16}}>Ок</Text>
                    </Pressable>
                    
                    
                    </LinearGradient>
                </Pressable>
                     
                </Pressable>
                )}
                
                <LinearGradient colors={['#141414', '#303030']}   style={styles.modal}>
                    <Text style={{color: 'white', fontSize: 19, fontWeight: '500', marginBottom: 'auto'}}>Добавление контакта</Text>
                        <InputForAdding  placeholder={'Номер телефона (7)'} Fn={changePhone} res={res1}/>
                        <InputForAdding placeholder={'Наименование контакта'} Fn={changePhone} res={res1}/>

                    {isPending ? (<ActivityIndicator style={styles.button}  color="#E50A5E" size={30}/>) : (
                        <Pressable onPress={() => {
                       mutate({PhoneNumber: phone});

                    }} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 30 }} style={styles.button} >
                        <AntDesign name={'pluscircleo'} size={45} style={{color: '#E50A5E'}}/>
                    </Pressable>
                    )}
                    
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
        height: 330,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,

    },
    modalerror: {
        width:  260,
        height: 285,
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

    },
   buttonok: {
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C2084F',
        borderRadius: 50
   }
})

export default AddingContact;