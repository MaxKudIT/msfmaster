import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {RootState, useAppDispatch} from "../../../redux/store";
import {useSelector} from "react-redux";
import {setContactClamping} from "../../../redux/slice";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../../../types/navigation";



const ContactPreview = ({name, id2}: {name: string, id2: string}) => {
    const dispatch = useAppDispatch();
    const isClamp = useSelector((state: RootState) => state.events.clampingContacts)
    const navigations = useNavigation<Navigations>()
    
  
    return (
       <Pressable 
       onPress={() => {
           if (isClamp.length == 0) navigations.navigate('corrmain', {id: id2})
           if (isClamp.length > 0) {
               if (isClamp.includes(id2)) {
                   dispatch(setContactClamping(isClamp.filter(id => id != id2)))
               } else {
                   dispatch(setContactClamping([...isClamp, id2]))

               }
           }
       }} onLongPress={() => dispatch(setContactClamping([...isClamp, id2]))} android_ripple={{ color: '#3D3D3D' }} style={{width: '100%', height: 60, alignItems: 'center'}}>
           <View style={{height: '100%', width: '90%', flexDirection: 'row', alignItems: 'center', columnGap: 10, borderWidth: 1, borderBottomColor: '#3D3D3D', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: 'transparent'}}>
               <View style={[styles.emptyavatar, {backgroundColor: 'orange'}, isClamp.includes(id2) && { borderWidth: 3, borderColor: 'green',}]}>
                   <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>{name[0]}</Text>
               </View>
               <Text style={[{color: isClamp.includes(id2) ? '#229C06' : 'white', fontSize: 15, fontWeight: 500}]}>{name}</Text>

           </View>

       </Pressable>
    );
};


const styles = StyleSheet.create({
    emptyavatar: {
        height: 40,
        width: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20
    },
    rightcontainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        columnGap: 25,
        height: '100%',
        alignItems: 'center',
        marginLeft: 'auto'
    }
})

export default ContactPreview;