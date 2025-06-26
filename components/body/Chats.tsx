import React, { useEffect, useState } from 'react';

import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

import ChatPreview from "../CorrespondencesPreview/ChatPreview";
import {CorrespondencesEnum} from "../../screens/Home";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Navigations } from '../../types/navigation';
import { ChatsPreviewDTOServer } from '../../dto/chat';
import websocket from '../../utils/websocket';
import { ChatMessageDTOClient } from '../../dto/chatms';




const Chats = ({data}: {data: ChatsPreviewDTOServer[]}) => {
        const [copyprev, setCopy] = useState(data);
        useEffect(() => {
            const fn = (message: ChatMessageDTOClient) => {
              
            setCopy(prev => {
               const array = prev.map(preview => {
                if (preview.ChatId === message.ChatId) {
               
                return {...preview, User: {...preview.User, Status: true},  MessageMeta: {Content: message.Content, CreatedAt: new Date().toISOString(), IsMy: false, SenderId: message.SenderId, IsRead: false, UnReadMessages: [...preview.MessageMeta.UnReadMessages, message.SenderId]}}
               }
               else {
                return preview
               }
            })
               return array
            })
             
            }   
             websocket.AddListener(fn)
        return () => websocket.DeleteListener(fn)   
        }, [])
      
    const [isActive, setActive] = useState<boolean>(false)
   
    return (

            <ScrollView>
                {data.length !== 0 ?
                    copyprev.map((chat, index) => (<ChatPreview key={index} ParticipantId={chat.ParticipantId} ChatId={chat.ChatId} 
                                                                        User={{Name: chat.User.Name, AvatarUrl: chat.User.AvatarUrl, Status: chat.User.Status}} 
                                                                        MessageMeta={{IsMy: chat.MessageMeta.IsMy, Content: chat.MessageMeta.Content, CreatedAt: chat.MessageMeta.CreatedAt, SenderId: chat.MessageMeta.SenderId, IsRead: chat.MessageMeta.IsRead, UnReadMessages: chat.MessageMeta.UnReadMessages}}  />)
                ) : (
                    <View style={{flexDirection: 'row', height: 200, width: '100%', alignItems: 'center', justifyContent: 'center', columnGap: 10}}>
                        <Entypo size={25} style={{color: '#FF0C69'}} name={'emoji-sad'}/>
                        <Text style={{fontSize: 17, color: '#FF0C69', fontWeight: '500'}}>Чатов не обнаружено</Text>
                    </View>

                    )
                   
                }

            </ScrollView>

    )


};

const styles = StyleSheet.create({
    button: {
         width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    }
})


export default Chats;