import React, {useEffect, useState} from 'react';
import {Image, ImageSourcePropType, Pressable, StyleSheet, Text, View} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons"
import {LinearGradient} from "expo-linear-gradient";
import {TouchableRipple} from "react-native-paper";
import {Button} from 'react-native-paper'
import {useNavigation} from "@react-navigation/native";
import {StackNavigationOptions} from "@react-navigation/stack";
import {Navigations} from "../../types/navigation";
import { ChatsPreviewDTOServer } from '../../dto/chat';
import websocket from '../../utils/websocket';

export function getFullTime(input: string | Date, timeZone?: string ): string {

    const date = typeof input === 'string' ? new Date(input) : input;

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        timeZone: timeZone, 
    };

    return new Intl.DateTimeFormat('ru-RU', options)
        .format(date)
}

export function getTime(input: string | Date, timeZone?: string ): string {
   
    const date = typeof input === 'string' ? new Date(input) : input;


    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, 
        timeZone: timeZone, 
    };

    return new Intl.DateTimeFormat('ru-RU', options)
        .format(date)
}






const ChatPreview = ({User: {Name, Status, AvatarUrl}, MessageMeta: {Content, CreatedAt, IsMy, IsRead, UnReadMessages}, ParticipantId}: ChatsPreviewDTOServer) => {
    
 
    const [pressed, setPressed] = useState(false);
    const navigations = useNavigation<Navigations>()
    return (
      <LinearGradient colors={['#3B3B3B', '#222222']}  start={[0, 0]} end={[1, 1]} >
          <Pressable
              android_ripple={{ color: '#3D3D3D' }} style={{width: '100%', height: 80, borderBottomWidth: 2,
              borderColor: '#222222',
              flexDirection: 'row',
              alignItems: "center"}}
              onPress={() => navigations.navigate('corrmain', {id: ParticipantId})}
          >
          {AvatarUrl !== '' ? (
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Image style={{height: 55, width: 55, borderRadius: 50, marginLeft: 10}} source={{uri: AvatarUrl}}/>
                {Status && <View style={{width: 13, height: 13, backgroundColor: '#FF0C69', position: 'absolute', left: 48, borderRadius: 50, bottom: 2}}></View>}
              </View>
          ) : (
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <View style={[styles.emptyavatar, {backgroundColor: 'cyan'}]}>
                  <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>{Name[0]}</Text>
                </View>
                  <View style={{width: 13, height: 13, backgroundColor: '#FF0C69', position: 'absolute', left: 48, borderRadius: 50, bottom: 2, opacity: 0.5}}></View>
              </View>
          )}

          <View style={styles.firstcont}>
              <Text style={{color: 'white', fontSize: 18,  fontFamily: 'Times new roman'}}>{Name}</Text>
              {IsMy ? (<Text numberOfLines={1} style={{color: '#969696'}}><Text style={{color: '#ADADAD', fontWeight: 'bold'}}>Вы: </Text>{Content}</Text>) : ( <Text numberOfLines={1} style={{color: '#969696'}}>{Content}</Text>)}

          </View>
          <View style={styles.secondcont}>
                <Text style={{color: 'white', fontSize: 12}}>
                    {getTime(CreatedAt)}
                </Text>
              
              {(IsMy ? (<Text>{!IsRead ? (<Entypo size={16} color="gray" name="eye-with-line"/>) : (<Entypo size={16} color="#E50A5E" name="eye"/>)}</Text>) : (<View style={{paddingLeft: 4, paddingRight: 4, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E50A5E'}}><Text style={{color: 'white', fontSize: 14}}>{UnReadMessages.filter(id => id === ParticipantId).length}</Text></View>))}
          </View>
          </Pressable>
      </LinearGradient>

    );
};
const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#262626',

    },
    corr: {
        width: '100%',
        height: 80,
        borderBottomWidth: 2,
        borderColor: '#222222',
        flexDirection: 'row',
        backgroundColor: '#333333',
        alignItems: "center"
    },
    firstcont: {
        height: '100%',
        width: '60%',
        justifyContent: 'space-evenly',
        marginLeft: 10,
      
        
    },
    secondcont: {
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        marginRight: 15,
        marginLeft: 'auto',
    },
    emptyavatar: {
        height: 55,
        width: 55,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
})




export default ChatPreview;