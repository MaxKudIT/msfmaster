import React from 'react';

import {ScrollView, StyleSheet, Text, View} from "react-native";

import {CorrespondencesEnum} from "../../screens/Home";
import GroupPreview, {GroupStruct} from "../CorrespondencesPreview/GroupPreview";
import Entypo from "react-native-vector-icons/Entypo";





const Chats = ({data}: {data: GroupStruct[]}) => {
    return (

        <ScrollView>
            {data.length !== 0 ?
                data.map((group, index) => (<GroupPreview key={index} EmptyAvatarColor={group.EmptyAvatarColor} GroupAvatar={group.GroupAvatar} Title={group.Title} LastMessage={group.LastMessage}/>))
            : (
                    <View style={{flexDirection: 'row', height: 200, width: '100%', alignItems: 'center', justifyContent: 'center', columnGap: 10}}>
                        <Entypo size={25} style={{color: '#FF0C69'}} name={'emoji-sad'}/>
                        <Text style={{fontSize: 17, color: '#FF0C69', fontWeight: '500'}}>Групп не обнаружено</Text>
                    </View>
                )}

        </ScrollView>

    )


};




export default Chats;