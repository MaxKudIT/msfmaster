import React, {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator, BackHandler, StyleSheet, Text, View} from "react-native";
import MyContactsHeader from "../components/headers/MyContactsHeader";
import Contacts from "../components/body/Contacts";
import {StatusBar} from "expo-status-bar";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../redux/store";
import {setContactClamping, setSearchActive, setSearchValue} from "../redux/slice";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../types/navigation";
import { useQuery } from '@tanstack/react-query';
import { apiusers } from '../api/v1/api';
import { ContactReqDTO, ContactResDTO } from '../dto/contact';
import axios from 'axios';

const MyContacts = () => {
    const accessToken = useSelector((state: RootState) => state.data.access_token);
    const navigations = useNavigation<Navigations>()
      if (accessToken === null) {
            navigations.navigate('homeauth')   
    }
    const state = useSelector((state: RootState) => state.events.clampingContacts)
    const dispatch = useAppDispatch();

    const backAction = () => {
        if (state.length > 0) {
            dispatch(setContactClamping([]))
        } else {
            navigations.goBack()
        }
        return true; // true = отменить выход, false = разрешить
    };

    BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
    );
 
    const [previews, setPreviews] = useState()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<ContactResDTO[]>([])
    const allcontacts = async () => {
        try {
            setLoading(true)
            const req = await apiusers.get<{Contacts: ContactResDTO[]}>('/contacts/all', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
              })
            setLoading(false)
            setData(req.data.Contacts)
        }
        catch (e: any) {
            if (e.response && e.response.data && e.response.data.error) {
                setError(e.response.data.error)
            } else {
                 setError('Сервер не активен, приносим свои извинения...')
            }
           
        }
            
            
    }

   useEffect(() => {
        allcontacts()
        return () => {
            dispatch(setSearchActive(false))
            dispatch(setSearchValue(''))
            
        }
    }, []);

 
       
            
    if (error !== null) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <MyContactsHeader />
            <Text style={{color: '#FF0C69', fontSize: 18, textAlign: 'center', margin: 5, marginTop: 100}}>{error}</Text>
    
        <StatusBar style="light" />
      </SafeAreaView>
    );
    }   
    
  
  

    
    if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <MyContactsHeader />
        <ActivityIndicator style={{marginTop: 300}} color={'#E50A5E'} size="large" />
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }


    return (
        
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
            <MyContactsHeader  />
            <Contacts contacts={data ?? []} />
            <StatusBar style={'light'}/>
        </SafeAreaView>
    );
};


const styles= StyleSheet.create({

    safe: {

        flex: 1,
        backgroundColor: '#262626',
    },
})

export default MyContacts;