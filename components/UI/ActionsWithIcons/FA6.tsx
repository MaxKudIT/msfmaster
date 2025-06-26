import AntDesign from "react-native-vector-icons/AntDesign";

import {Pressable, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Navigations} from "../../../types/navigation";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";



export type Path = 'adding' | 'create' | 'mycontacts' | 'create'




const FA6 = ({text, name, bord, path}: {text: string, name: string, bord?: boolean, path?: Path}) => {
    const navigations = useNavigation<Navigations>()
    return (
        <Pressable onPress={() => navigations.navigate(path!)}  android_ripple={{ color: 'rgba(150, 150, 150, 0.4)' }} style={[styles.container, { borderTopColor: bord ? 'rgba(179, 179, 179, 0.5)' : 'transparent'}]} >
            <FontAwesome6 size={18} color={'white'} name={name}/>
            <Text style={{fontSize: 16, color: '#D1D1D1', fontWeight: '500'}}>{text}</Text>
        </Pressable>
    );
};
const styles =  StyleSheet.create({
    container: {
        width: 280,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 10,
        marginLeft: 40,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderWidth: 0.6,

    }
})

export default FA6;