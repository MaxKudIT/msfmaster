import React, { useEffect, useState } from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import HeaderMenu from "../components/headers/HeaderMenu";
import AntDesignAct from "../components/UI/ActionsWithIcons/AntDesign";
import FA6 from "../components/UI/ActionsWithIcons/FA6";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = () => {
    const [data, setData] = useState<{ name: string, phonenumber: string }>({ name: "u", phonenumber: "f" })
    useEffect(() => {
      AsyncStorage.getItem('user_data').then(data => {
        if (data != null) {
             const {name, phonenumber} = JSON.parse(data)
             setData({name, phonenumber})
        } else {
           console.warn('Неверная структура данных в AsyncStorage');
        }
       
      })
    }, [])
    return (
        <SafeAreaView style={styles.safe}>
            <HeaderMenu name={data?.name!} phonenumber={data?.phonenumber!}/>
            <ImageBackground source={{uri: 'https://i.pinimg.com/736x/8b/ec/ec/8bececf1b37c84e5c1cd06f80c44a2ef.jpg'}} style={{flex: 1, backgroundColor: '#3B3B3B', paddingLeft: 30, paddingTop: 20}}>
                <View >
                    <View style={[styles.add_group2]}>
                        <AntDesignAct path={'back'} text={'Главная'} name={'home'}/>
                    </View>

                    <View style={[styles.markf]}>


                        <Text style={{fontSize: 17, color: 'rgba(255,255,255,0.6)', fontWeight: 'bold', letterSpacing: 0.3}}>Контакты</Text>
                    </View>
                        <View style={[styles.add_group]}>
                            <AntDesignAct path={'mycontacts'} text={'Мои контакты'} name={'contacts'}/>
                            <AntDesignAct path={'adding'}  text={'Добавить'} name={'adduser'}/>
                        </View>
                    <View style={[styles.markf]}>

                        <Text style={{fontSize: 17, color: 'rgba(255,255,255,0.6)', fontWeight: 'bold', letterSpacing: 0.3}}>Группы</Text>
                    </View>
                    <View style={styles.fa6_style}>
                        <FA6 text={'Группы участия'} name={'user-group'}/>
                    </View>
                        <View style={[styles.add_group2]}>
                            <AntDesignAct path={'create'}  text={'Создать'} name={'addusergroup'}/>
                        </View>
                    {/*<View style={[styles.markf]}>*/}
                    {/*    <Text style={{fontSize: 17, color: 'rgba(255,255,255,0.6)', fontWeight: 'bold', letterSpacing: 0.3}}>Настройки</Text>*/}
                    {/*</View>*/}
                    {/*<View style={[styles.delete_group]}>*/}
                    {/*   <FeatherIc text={'Настройки'} name={'settings'}/>*/}
                    {/*</View>*/}


                </View>
            </ImageBackground>


        </SafeAreaView>

    );
};


const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#3B3B3B'
    },
    markf: {
      flexDirection: 'row',
        marginLeft: 20
    },
    add_group: {
        marginTop: 15,
        marginBottom: 15
    },
    add_group2: {
        marginBottom: 15
    },
    delete_group: {
        marginTop: 15,
        marginBottom: 15
    },
    fa6_style: {
        marginTop: 15,
    },
    footer: {
        width: '100%',
        height: 100,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 50
    },
    style_hide: {
        opacity: 0,
        position: 'absolute'
    },
    marginwithhide: {
        marginBottom: 30
    }
})

export default Menu;