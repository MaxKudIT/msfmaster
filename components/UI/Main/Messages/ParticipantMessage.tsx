import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {getTime} from "../../../CorrespondencesPreview/ChatPreview";


export type ParticipantmessageT = {
    content: string
    time: Date
  
}




const Participantmessage = ({time, content}: ParticipantmessageT) => {



    return (
        <View style={styles.messagecontainer}>
            <View style={{paddingRight: 10, paddingLeft: 10, paddingTop: 10, paddingBottom: 1}}>
                <Text style={{color: '#F5F5F5', lineHeight: 17, flexShrink: 1, fontSize: 15}}>
                    {content}
                </Text>
            </View>

            <View style={{width: '100%', flexDirection: 'row', marginLeft: 'auto', alignItems: 'center', paddingRight: 6, paddingBottom: 5}}>
                <Text style={{fontSize: 10, color: '#CCCCCC'}}>
                    {getTime(time)}
                </Text>
            </View>
        </View>



    );
};

const styles = StyleSheet.create({
    messagecontainer: {
        backgroundColor: 'rgba(84,84,84, 0.8)',
        alignSelf: 'flex-start',
        maxWidth: '90%',
        borderRadius: 15,
        paddingLeft: 5,
        paddingRight: 5,
        marginVertical: 4,
        marginLeft: 15
    },



})

export default Participantmessage;