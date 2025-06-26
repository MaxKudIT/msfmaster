import React, {useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";



function getTime(date :Date): string {

    let monthstring: string = "0";
    const year = date.getFullYear().toString().slice(2);

    let month = date.getMonth() + 1;
    if (month <= 9) {
        monthstring += month
    }
    const day = date.getDate();
    return monthstring == "0" ? `${day}.${month}.${year}` : `${day}.${monthstring}.${year}`
}


type LastMessageStructIsMy = {
    ReadAt: boolean
    Time: Date
    Content: string
}


type LastMessageStruct = {
    Time: Date
    Content: string,
    Whois: string
}
type Colors =
    'orange' |
    '#FF0062' |
    '#00A2FF' |
    '#FF00B3'



export interface GroupStruct {
    GroupAvatar: string | null,
    EmptyAvatarColor?: string,
    Title: string
    LastMessage: LastMessageStructIsMy | LastMessageStruct
}


const GroupPreview = ({GroupAvatar, EmptyAvatarColor,  Title, LastMessage}: GroupStruct) => {

    return (
        <LinearGradient colors={['#3B3B3B', '#222222']}  start={[0, 0]} end={[1, 1]} >
            <Pressable
                android_ripple={{color: '#3D3D3D' }} style={{width: '100%', height: 80, borderBottomWidth: 2,
                borderColor: '#222222',
                flexDirection: 'row',
                alignItems: "center"}}
            >
                {GroupAvatar !== null ? (
                    <Image style={{height: 60, width: 60, borderRadius: 50, marginLeft: 10}} source={{uri: GroupAvatar}}/>
                ) : (
                    <View style={[styles.emptyavatar, {backgroundColor: EmptyAvatarColor!}]}>
                        <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>{Title[0]}</Text>
                    </View>
                )}

                <View style={styles.firstcont}>
                    <Text style={{color: 'white', fontSize: 18,  fontFamily: 'Times new roman'}}>{Title}</Text>
                    {'ReadAt' in LastMessage ? (<Text numberOfLines={1} style={{color: '#969696'}}><Text style={{color: '#ADADAD', fontWeight: 'bold'}}>Вы: </Text>{LastMessage.Content}</Text>) : (<Text numberOfLines={1} style={{color: '#969696'}}><Text style={{color: '#ADADAD', fontWeight: 'bold'}}>{LastMessage.Whois}: </Text>{LastMessage.Content}</Text>)}

                </View>
                <View style={styles.secondcont}>
                    <Text style={{color: 'white'}}>{getTime(LastMessage.Time)}</Text>
                    {('ReadAt' in LastMessage ? (<Text>{LastMessage.ReadAt ? (<Entypo size={16} color="gray" name="eye-with-line"/>) : (<Entypo size={16} color="#E50A5E" name="eye"/>)}</Text>) : (<Text></Text>))}
                </View>
            </Pressable>
        </LinearGradient>

    );
};

const styles = StyleSheet.create({

    firstcont: {
        height: '100%',
        width: '55%',
        justifyContent: 'space-evenly',
        marginLeft: 10,
    },
    secondcont: {
        height: '100%',
        width: 80,
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        marginRight: 15,

        marginLeft: 'auto'
    },
    emptyavatar: {
        height: 60,
        width: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
})

export default GroupPreview;