import React, {useEffect, useState} from 'react';
import {Dimensions, EmitterSubscription, ImageBackground, Keyboard, Pressable, StyleSheet, TextInput, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import {LinearGradient} from "expo-linear-gradient";
import { ChatMessage } from '../../../dto/chatms';
import websocket from '../../../utils/websocket';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import uuid from 'react-native-uuid'; 
 export type InputFieldTypes = {
     getMessage: (message: ChatMessage) => void,
     getFocus: (focus: boolean) => void
 }


const InputFieldForMessage = ({getMessage, getFocus, chatId, recieverId, senderId}: InputFieldTypes & {chatId: string | null, recieverId: string, senderId: string}) => {


    const [height, setHeight] = useState(40);
    const handleContentSizeChange = (event: any) => {
        setHeight(event.nativeEvent.contentSize.height);
    };
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
    let showSub: EmitterSubscription | null = null;
    let hideSub: EmitterSubscription | null = null;

 
    const setupListeners = () => {
    showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setTimeout(() => {
        setKeyboardHeight(e.endCoordinates.height);
      }, 200);
    });
    hideSub = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardHeight(0);
    });
  };
 
    setupListeners();
    return () => {
        showSub?.remove();
        hideSub?.remove();
     };
    }, []);
    const [message, setMessage] = useState<string>('')


    const sendMessage = (msg: ChatMessage) => {
        getMessage(msg)

        if (msg.ChatId === null) {
              websocket.sendMessage({Id: msg.Id ,Content: msg.Content, ChatId: '00000000-0000-0000-0000-000000000000', SenderId: msg.SenderId, CorrespondenceType: msg.CorrespondenceType, Type: msg.Type, RecieverId:  msg.RecieverId})
        } else {
             websocket.sendMessage({Id: msg.Id, Content: msg.Content, ChatId: msg.ChatId, SenderId: msg.SenderId, CorrespondenceType: msg.CorrespondenceType, Type: msg.Type, RecieverId: msg.RecieverId})
        }
       
    }
    
    return (

       <View style={[styles.maincontainer, {paddingBottom: keyboardHeight}]}>

           <LinearGradient style={[(message !== '' && message !== undefined) ? styles.container_for_message : styles.cont_for_message_without_send, {height: height}]} colors={['#545454', '#4F4F4F']}  start={[1, 0]} end={[1, 1]} >
               <View style={{height: '100%', justifyContent: 'flex-end', paddingBottom: 10}}>
                   <Ionicons  name={'document-attach-outline'} size={27} color={'white'}/>
               </View>
                
               <TextInput  value={message} onChangeText={(text: string) => { setMessage(text)}} placeholder={'Сообщение'} placeholderTextColor={'rgba(219,219,219,0.8)'}   onContentSizeChange={handleContentSizeChange} multiline={true}  style={styles.messageinputwithsendingbutton}/>

               <View style={{height: '100%', justifyContent: 'flex-end',  paddingBottom: 10}}>
                   <Entypo size={27} color={'white'} name={'emoji-flirt'}/>
               </View>


           </LinearGradient>
           {(message !== '' && message !== undefined) && (
             <Pressable onPress={() => { setTimeout(() => getFocus(false), 500); getFocus(true); sendMessage({Id: uuid.v4(), ChatId: chatId!, SenderId: senderId!, ReadAt: null, CreatedAt: new Date(), UpdatedAt: new Date(), Content: message, CorrespondenceType: 'chat', Type: 'text', RecieverId: recieverId!}); setMessage('')} }  style={[styles.sending]}>
                <Ionicons size={28} color={'white'} name={'send-outline'}/>
            </Pressable>
           )
        }

       </View>
    );
};

const styles = StyleSheet.create({
    maincontainer: {
        width: Dimensions.get('window').width - 10,
      
        flexDirection: 'row',
        marginTop: 'auto',
        alignItems: 'flex-end',
        marginBottom: 5,
        marginLeft: 3
    },
    container_for_message: {
        width: Dimensions.get('window').width - 68,
        height: '100%',
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#2B2B2B',
        borderRadius: 25,
        paddingRight: 10,

    },
    cont_for_message_without_send: {
         width: Dimensions.get('window').width - 15,
        height: '100%',
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#2B2B2B',
        borderRadius: 25,
        paddingRight: 10,
    },
    messageinputwithsendingbutton: {
        height: '100%',
        width: '70%',
        color: '#F5F5F5',
        fontSize: 16,
        
    },
    sending: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 5,
        backgroundColor: '#E50A5E',
        borderRadius: 50,

    }
})


export default InputFieldForMessage;