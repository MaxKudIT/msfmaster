import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackScreenProps,
  StackNavigationOptions, StackCardInterpolationProps
} from '@react-navigation/stack';
import Autentification from "./screens/Autentification";
import {RegistrationOne} from "./screens/RegistrationOne";
import {RootStackParamList} from "./types/navigation";
import RegistrationThree from "./screens/RegistrationThree";
import RegistrationTwo from "./screens/RegistrationTwo";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from "./screens/Home";
import Menu from "./screens/Menu";
import {Animated, Easing, View} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CorrespondenceMain from "./screens/CorrespondenceMain";

import CreateGroup from "./screens/creature/CreateGroup";
import AddingContact from "./screens/creature/AddingContact";
import MyContacts from "./screens/MyContacts";
import { createContext } from 'react';







export default function App() {

const screenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  headerShown: false,
  detachPreviousScreen: true,
    cardStyle: { backgroundColor: 'red' },
    transitionSpec: {
        open: {
            animation: 'timing',
            config: {
                duration: 250,
                easing: Easing.inOut(Easing.ease)
            },
        },
        close:{
            animation: 'timing',
            config: {
                    duration: 200,
                    easing: Easing.inOut(Easing.ease)
            },
        },

}};

type WebSocketContextValue = {
  sendMessage: (msg: string) => void;
  messages: string[];
  isConnected: boolean;
};

const queryclient = new QueryClient();
const Stack = createStackNavigator<RootStackParamList>();
const WebSocketContext = createContext<WebSocketContextValue | undefined>(undefined);



  return (
    <Provider store={store}>
       <QueryClientProvider client={queryclient}>

        <NavigationContainer>

          <Stack.Navigator   screenOptions={screenOptions}  initialRouteName="home">
            <Stack.Screen
                name="homeauth"
                component={Autentification}
                options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOSInverted}}
            />
            <Stack.Screen
                name="registrationone"
                component={RegistrationOne}
                options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}
            />
            <Stack.Screen name="registrationtwo" component={RegistrationTwo}  options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
            <Stack.Screen name="registrationthree" component={RegistrationThree}  options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
              <Stack.Screen name="home" component={Home}  options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, gestureDirection: 'horizontal'}}/>
              <Stack.Screen  name={'menu'} component={Menu}  options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOSInverted}}/>
              <Stack.Screen name={'corrmain'} component={CorrespondenceMain}  options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, gestureEnabled: false}}/>
              <Stack.Screen name={'adding'} component={AddingContact} options={{cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,   gestureEnabled: false}} />
              <Stack.Screen name={'create'} component={CreateGroup} options={{cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,  gestureEnabled: false}} />
              <Stack.Screen name={'mycontacts'} component={MyContacts} options={{cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,  gestureEnabled: false}} />
          </Stack.Navigator>
        </NavigationContainer>

      </QueryClientProvider>
    </Provider>
     

  );
}