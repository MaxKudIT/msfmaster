import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ImageBackground, StyleSheet, View, Text, ScrollView, BackHandler, ActivityIndicator, NativeSyntheticEvent, NativeScrollEvent, ViewToken} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import InputFieldForMessage from "../components/UI/Main/InputFieldForMessage";
import {StatusBar} from "expo-status-bar";
import UserUpField from "../components/UI/Main/UserUpField";
import Mymessage, {MymessageT} from "../components/UI/Main/Messages/Mymessage";
import Participantmessage, {ParticipantmessageT} from "../components/UI/Main/Messages/ParticipantMessage";
import ChatMessages from "../components/body/messages/ChatMessages";
import {setContactClamping} from "../redux/slice";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {Navigations, RootStackParamList} from "../types/navigation";
import { apiusers } from '../api/v1/api';

import { ChatMessage, ChatMessageDTOClient } from '../dto/chatms';
import { usePostData } from '../hooks/api';
import { ChatDataDTOServer } from '../dto/chat';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { jwtDecode } from 'jwt-decode';
import websocket from '../utils/websocket';
import Emoji from 'react-native-emoji';
import EmojiPicker from 'emoji-picker-react';
import  EmojiList  from '@jsamr/react-native-li';

const CorrespondenceMain = ({route}: {route: RouteProp<RootStackParamList>}) => {


    
    

    const [focus, setFocus] = useState<boolean>()

    const changeFocus = (focus: boolean) => {
        setFocus(focus)
    }
    const navigations = useNavigation<Navigations>()

    const backAction = () => {
        navigations.goBack()
        return true;
    };

    BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
    );
    


    const id = route.params?.id
  
       const [copydata, setCopy] = useState<ChatMessage[] | null>(null)
    const {fetchDataForPost, data, error, loading} = usePostData<ChatDataDTOServer, {Idtwo: string}>();
  const accessToken = useSelector((state: RootState) => state.data.access_token);
   if (accessToken === null) {
            navigations.navigate('homeauth')   
    }
    const [isActive, setActive] = useState<boolean>(false)
    const userId = useMemo(() => {
     try {
        return jwtDecode<{user_id: string}>(accessToken).user_id;
    } 
    catch {
        return null;
  }
    }, [accessToken]);

    useEffect(() => {
        const s = async () => {
            if (id !== undefined) {
            await fetchDataForPost('/chat/find', {Idtwo: id}, accessToken)
            
        } else {
            console.error('Собеседник не найден!')
        }
        }
        
        s()
       
    }, [])
    
    useEffect(() => {
    const ChatMessageObserver = (message: ChatMessageDTOClient) => {
        if (message.ChatId === data?.chat) {
             setActive(true)
            setCopy(prev => [...prev!, {Id: message.Id, Type: message.Type, CorrespondenceType: message.CorrespondenceType, Content: message.Content, ChatId: message.ChatId, CreatedAt: new Date(), UpdatedAt: new Date(), ReadAt: null, SenderId: message.SenderId, RecieverId: message.RecieverId}])
        }
       
    }       
      
     

    if (data) {
        setCopy(data.messages);
      
        websocket.AddListener(ChatMessageObserver)
    }
    return () => websocket.DeleteListener(ChatMessageObserver)
}, [data]);

    const getMessage = (message: ChatMessage) => {
        if (!copydata) {
             setCopy([message])
        } else {
             setCopy(prev => [...prev!, message])
        }
      
    }
    
    const onViewableItemsChanged = useCallback(({ viewableItems }: {viewableItems: ViewToken<ChatMessage>[]}) => {
        viewableItems.forEach(({item}) => {
           if (!item.ReadAt && item.SenderId !== userId) {
                setCopy(prev => {
                    return prev!.map(el => {
                        if (el.Id === item.Id) {
                            return {...el, ReadAt: new Date()}
                        } else {
                            return el
                        }
                    })
                })
           }
        })
    }, [userId]);

 




    if (error !== null) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
         <ImageBackground style={{width: '100%', height: '100%', justifyContent: 'center'}} source={{uri: 'https://i.pinimg.com/736x/38/97/45/38974508cadb294a775d52a31c17696f.jpg'}}>
            <Text style={{color: '#FF0C69', fontSize: 16, textAlign: 'center', margin: 5, marginTop: 50}}>Произошла ошибка при загрузке чата</Text>
        </ImageBackground>
        <StatusBar style="light" />
      </SafeAreaView>
    );
    }  
     const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    if (loading) {
        return (
             <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
                 <ImageBackground style={{width: '100%', height: '100%', justifyContent: 'center'}} source={{uri: 'https://i.pinimg.com/736x/38/97/45/38974508cadb294a775d52a31c17696f.jpg'}}>
                 <ActivityIndicator color={'#E50A5E'} size="large" />
                 </ImageBackground>
             </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
         
                {(data !== null) ? (
                       <ImageBackground style={{width: '100%', height: '100%'}} source={{uri: 'https://i.pinimg.com/736x/38/97/45/38974508cadb294a775d52a31c17696f.jpg'}}>
                             <UserUpField name={data?.headerdata === undefined ? 'Призрак' : data.headerdata.Name} avatarUrl={data.headerdata === undefined ? '0' : data.headerdata.AvatarUrl} status={isActive || data.headerdata.Status}/>
                             <ChatMessages onViewChange={onViewableItemsChanged} triggerScroll={focus!} messages={copydata ?? data?.messages}/>
                            <InputFieldForMessage chatId={data.chat} senderId={userId!} recieverId={id!} getFocus={changeFocus}  getMessage={getMessage}/>
                        </ImageBackground>
                ) : (
                      <ImageBackground style={{width: '100%', height: '100%', alignItems: 'center'}} source={{uri: 'https://i.pinimg.com/736x/38/97/45/38974508cadb294a775d52a31c17696f.jpg'}}>
                            <Text style={{color: '#FF0C69', fontSize: 18, textAlign: 'center', marginTop: 100}}>Данных не обнаружено</Text>
                        </ImageBackground>
                )}
               
          

            
        </SafeAreaView>

    );
};


const styles= StyleSheet.create({
    safe: {

        backgroundColor: '#222222',
    },
})

export default CorrespondenceMain;