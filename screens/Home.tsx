import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {
    Platform,
    Pressable,
    StyleSheet,
    View,
    Text,
    ActivityIndicator
   
} from 'react-native';
import {StatusBar} from "expo-status-bar";
import HeaderHome from "../components/headers/HeaderHome";
import Chats from "../components/body/Chats";
import Groups from "../components/body/Groups";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import {RootState, useAppDispatch} from "../redux/store";
import {useSelector} from "react-redux";
import {GroupStruct} from "../components/CorrespondencesPreview/GroupPreview";
import { getItemFromStorage } from '../utils/securest';
import { getRandomInt } from '../gen';
import { setAccessToken, setStatus } from '../redux/slice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Navigations } from '../types/navigation';
import { ChatsPreviewDTOServer } from '../dto/chat';
import { apiusers } from '../api/v1/api';
import { useGetData } from '../hooks/api';
import websocket from '../utils/websocket';
import { deleteItemAsync } from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';



export enum CorrespondencesEnum {
    'chats',
    'groups'
}







const Home = () => {
    
    
    const navigations = useNavigation<Navigations>()

    const {fetchData, data, error, loading} = useGetData<{previews: ChatsPreviewDTOServer[]}>();
    const [data2, setData2] = useState([
       
    ])
    
   


    const dispatch = useAppDispatch();

    //Сокет (одно из самых важных)
    const ws = useRef<WebSocket>(null)
    
   
    useEffect(() => {
        const getNessData = async () => {
            console.log()
            try {
                const token = await getItemFromStorage('access_token');
                if (!token) {
                navigations.navigate('homeauth');
                return;
                }
            dispatch(setAccessToken(token));
            websocket.connect('http://192.168.0.78:3000/ws');
             if (websocket.socket?.readyState !== WebSocket.OPEN) {
                await new Promise((resolve) => {
                if (websocket.socket != null) {
                    websocket.socket.onopen = resolve;
                }
                
        });
      }
            websocket.sendMessage({token: token})
        
            dispatch(setStatus(true));
            
        } catch (err) {
            console.error("Initialization error:", err);
        }
    }
       
     getNessData()  
        
    }, []);

     const fetchChats = async () => {
        try {
            const token = await getItemFromStorage('access_token');
             if (!token) {
                navigations.navigate('homeauth');
                return;
        }
            await fetchData('chat/all', token!);

        } catch (err) {
            console.error("Error fetching chats:", err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchChats();
        }, [])
    );

    //

    function searchByNameSubstring(array: ChatsPreviewDTOServer[], substring: string) {
        return array.filter((item) => item.User.Name.toLowerCase().includes(substring.toLowerCase()));
    }
    function searchByGroupTitleSubstring(array: GroupStruct[], substring: string) {
        return array.filter((item) => item.Title.toLowerCase().includes(substring.toLowerCase()));
    }
    const activityHome = useSelector((state: RootState) => state.events.searchhome.isActive);
    const searchvalueHome = useSelector((state: RootState) => state.events.searchhome.value);


     const filteredChats = (activityHome && searchvalueHome !== '')
    ? searchByNameSubstring(data?.previews || [], searchvalueHome)
    : data?.previews || [];

  const filteredGroups = (activityHome && searchvalueHome !== '')
    ? searchByGroupTitleSubstring(data2, searchvalueHome)
    : data2;

    const renderScene = SceneMap({
        chats: () => <Chats data={filteredChats}/>,
        groups: () => <Groups data={filteredGroups} />,
    });





   
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'chats', title: 'Чаты' },
        { key: 'groups', title: 'Группы' },
    ]);

    

    if (error !== null) {
        return (
             <SafeAreaView style={[styles.safe, {alignItems: 'center', justifyContent: 'center'}]} edges={['top', 'bottom']}>
            <Text style={{color: '#FF0C69', fontSize: 16, textAlign: 'center', margin: 5, marginTop: 50}}>{error}</Text>
            <StatusBar style="light" />
          </SafeAreaView>
        )
        
    }
    if (loading) {
        return(
             <SafeAreaView style={[styles.safe, {alignItems: 'center', justifyContent: 'center'}]} edges={['top', 'bottom']}>    
                <ActivityIndicator color={'#E50A5E'} size="large" />
             </SafeAreaView>
        )
        
    }

    return (

            <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
                <HeaderHome correspcurrent={index}/>
                    {data?.previews.length === 0 ? (
                         <View style={{ flexDirection: 'column', height: 300, width: '100%', alignItems: 'center', justifyContent: 'center', columnGap: 10, rowGap: 10, marginTop: 60}}>
                                    <Text style={{fontSize: 17, color: 'white', fontWeight: '500', textAlign: 'center'}}>Добавьте контакт, чтобы начать общение:</Text>
                                    <Pressable onPress={() => {
                                            navigations.navigate('adding')
                                            }} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 30 }} style={styles.button} >
                                    <AntDesign name={'adduser'} size={45} style={{color: '#DFA91F'}}/>
                                </Pressable>
                                              
                            </View>
                    ) : (
                          <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        animationEnabled={true}
                        swipeEnabled={true}
                        renderTabBar={props => <TabBar indicatorStyle={{backgroundColor: '#E50A5E'}} activeColor={'#E50A5E'} style={{backgroundColor: '#2B2B2B', height: 50}} {...props} />}

                    />

                    )}
                    
                  

                <StatusBar style={"light"} />
            </SafeAreaView>


    );
};

const styles= StyleSheet.create({
    back: {
        backgroundColor: '#333333'
    },
    safe: {
        flex: 1,
        backgroundColor: '#262626',
    },
     button: {
         width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    }
})



export default Home;