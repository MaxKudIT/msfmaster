import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {getTime} from "../../../CorrespondencesPreview/ChatPreview";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

export type MymessageT = {
    content: string
    time: Date
    isRead: Date | null
}


const Mymessage = ({content, time, isRead}:MymessageT) => {



    return (

            <View style={styles.messagecontainer}>
                <View style={{paddingRight: 10, paddingLeft: 10, paddingTop: 10, paddingBottom: 1}}>
                    <Text style={{ color: '#F5F5F5', lineHeight: 17, flexShrink: 1, fontSize: 16, }}>
                        {content}
                    </Text>
                </View>

                <View style={{width: '100%', flexDirection: 'row', marginLeft: 'auto', alignItems: 'center', columnGap: 7, paddingRight: 5, paddingBottom: 5}}>
                    <Text style={{fontSize: 10, color: '#CCCCCC'}}>
                        {getTime(time)}
                    </Text>
                    {isRead !== null ? (<Entypo size={16} color="#FF2176" name="eye"/>) : (   <Entypo size={16} color="#808080" name="eye-with-line"/>)}


                </View>
            </View>

    );
};

const styles = StyleSheet.create({

    messagecontainer: {
        backgroundColor: 'rgba(120, 6, 50, 0.8)',
        alignSelf: 'flex-end',
        maxWidth: '80%',
        borderRadius: 15,
        marginVertical: 4,
        marginRight: 15,
        paddingLeft: 5,
        paddingRight: 5
    },



})

export default Mymessage;