import React, {JSX, useState} from 'react';
import {ImageBackground, Pressable, ScrollView, ScrollViewBase, StyleSheet, Text, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import ContactPreview from "../UI/contacts/ContactPreview";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {setContactClamping, setDeleting} from "../../redux/slice";
import Entypo from "react-native-vector-icons/Entypo";
import { ContactResDTO } from '../../dto/contact';
import { useNavigation } from '@react-navigation/native';
import { Navigations } from '../../types/navigation';


function searchByNameSubstring(array: ContactResDTO[], substring: string) {
     if (!substring.trim()) {
        return array; 
    }
    
    const lowerSubstring = substring.toLowerCase();
    
    return array.filter(contact => 
        contact.Name.toLowerCase().includes(lowerSubstring)
    );
}

const Contacts = ({contacts}: {contacts: ContactResDTO[]}) => {
    const deleting = useSelector((state: RootState) => state.events.deleting)
    const clamping = useSelector((state: RootState) => state.events.clampingContacts)
    const [ids, setIds] = useState(contacts)
    
    const searchcontact = useSelector((state: RootState) => state.events.search.value)
    const activity = useSelector((state: RootState) => state.events.search.isActive)
    const dispatch = useAppDispatch()


    const EventResult = (deleting: boolean): void => {


        if (deleting) {
            setIds(array => array.filter(contact => !clamping.includes(contact.UserId)))
            dispatch(setContactClamping([]))
        }
    }
    React.useEffect(() => {
        EventResult(deleting)
        dispatch(setDeleting(false))
    }, [deleting]);
    const navigations = useNavigation<Navigations>()
    return (
        <ImageBackground source={{uri: 'https://i.pinimg.com/736x/8b/ec/ec/8bececf1b37c84e5c1cd06f80c44a2ef.jpg'}} style={{flex: 1, backgroundColor: '#3B3B3B'}}>
            <View style={{width: '100%', height: 40, backgroundColor: '#222222', flexDirection: 'row', alignItems: 'center', paddingLeft: 15, columnGap: 10}}>
                <AntDesign name={'contacts'} size={20} color={'rgba(255,255,255,0.6)'}/>
                <Text style={{fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 'bold', letterSpacing: 0.3}}>Список контактов</Text>
            </View>
            {contacts.length === 0 ? (
                <View style={{height: 200, width: '90%', alignItems: 'center', justifyContent: 'space-evenly', alignSelf: 'center'}}>
                    <Text style={{color: 'white', fontSize: 14, textAlign: 'center', fontWeight: 500}}>Контактов пока что нет, нажмите на иконку снизу, чтобы добавить контакт:</Text>
                      <Pressable onPress={() => {
                        navigations.navigate('adding')
                      }} android_ripple={{ color: 'rgba(150, 150, 150, 0.4)', radius: 30 }} style={styles.button} >
                    <AntDesign name={'adduser'} size={40} style={{color: '#DFA91F'}}/>
                    </Pressable>
                </View>
            ) :
            (<ScrollView style={{flexGrow: 1}}>
                {
                    (searchcontact == '' && activity)  ?  ids.sort((a,b) => {
                        if (a.Name > b.Name) {
                            return 1
                        }
                        if (a.Name < b.Name) {
                            return -1
                        }
                        return 0
                    }).map((contact, index) => (<ContactPreview key={index} name={contact.Name} id2={contact.UserId}/>)) :
                        searchByNameSubstring(ids, searchcontact).length !== 0 ?
                        searchByNameSubstring(ids, searchcontact).
                       sort((a,b) => {
                           if (a.Name > b.Name) {
                               return 1
                           }
                           if (a.Name < b.Name) {
                               return -1
                           }
                           return 0
                       }).
                       map((contact, index) => (<ContactPreview key={index} name={contact.Name} id2={contact.UserId}/>)) :
                            <View style={{flexDirection: 'row', height: 200, width: '100%', alignItems: 'center', justifyContent: 'center', columnGap: 10}}>
                                <Entypo size={25} style={{color: '#FF0C69'}} name={'emoji-sad'}/>
                                <Text style={{fontSize: 17, color: '#FF0C69', fontWeight: '500'}}>Контактов не обнаружено</Text>
                            </View>

                }

            </ScrollView>)}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    button: {
         width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Contacts;