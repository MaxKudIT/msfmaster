import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type RootStackParamList = {
    homeauth: undefined;
    registrationone: undefined,
    registrationtwo: undefined,
    registrationthree: undefined,
    home: undefined,
    menu: undefined,
    corrmain: {id: string},
    adding: undefined,
    create: undefined,
    mycontacts: undefined
};





export type Navigations = NativeStackNavigationProp<RootStackParamList>