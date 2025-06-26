import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Mymessage, {MymessageT} from "../../UI/Main/Messages/Mymessage";
import Participantmessage, {ParticipantmessageT} from "../../UI/Main/Messages/ParticipantMessage";
import {FlatList, ScrollView, ViewToken} from "react-native";
import InputFieldForMessage from "../../UI/Main/InputFieldForMessage";
import { ChatMessage } from '../../../dto/chatms';
import { getItemFromStorage } from '../../../utils/securest';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {jwtDecode} from 'jwt-decode';
import { View, Text } from 'react-native';
import Entypo from  "react-native-vector-icons/Entypo";
type ChatMessages = {
    messages: ChatMessage[],
    triggerScroll: boolean,
    onViewChange: (event: any) => void
}



const ChatMessages = ({messages, triggerScroll, onViewChange}: ChatMessages) => {
      const accessToken = useSelector((state: RootState) => state.data.access_token);
        const reversedMessages = React.useMemo(() => messages ? [...messages].reverse() : [], [messages]);
      const userId = useMemo(() => {
      if (!accessToken) return null;
         try {
            return jwtDecode<{user_id: string}>(accessToken).user_id;
        } 
        catch {
            return null;
      }
        }, [accessToken]);
    
         const flatListRef = useRef<FlatList>(null);
         
         useEffect(() => {
             if (triggerScroll && reversedMessages.length > 0) {
        if (reversedMessages.length > 0) {
   
    flatListRef.current?.scrollToIndex({
      index: 0,
      animated: true,
      viewPosition: 1 
    });
  }
    }
         }, [triggerScroll])

       
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 500,
  });


  const renderItem = ({ item, index }: {item: ChatMessage, index: number}) => {
    if (userId === item.SenderId) {
      return (
        <Mymessage 

          key={index} 
          content={item.Content} 
          time={item.CreatedAt} 
          isRead={item.ReadAt} 
        />
      );
    }
    return (
      <Participantmessage 
        key={index}  
        content={item.Content} 
        time={item.CreatedAt}
      />
    );
  };

  const renderEmpty = () => (
    <View style={{padding: 15, position: 'absolute', transform: [{scaleY: -1}], height: '100%', alignItems: 'center', rowGap: 10}}>
        <Text style={{color: '#FF0C69', marginTop: 30, textAlign: 'center', fontSize: 18, fontWeight: 500, transform: [{scaleX: -1}]}}>Переписки пока нет, но вы можете это исправить!</Text>
        <Entypo size={40} name='emoji-flirt' color={'#DFA91F'}/>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={reversedMessages}
      inverted
       initialNumToRender={15}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 10}}
      onViewableItemsChanged={onViewChange}
      viewabilityConfig={viewabilityConfig.current}
      maxToRenderPerBatch={10}
     initialScrollIndex={15}
      getItemLayout={(data, index) => ({
    length: 100, // Фиксированная высота элемента
    offset: 80 * index,
    index
  })}

      onEndReachedThreshold={0.5}   
    />
  );
   
    
  
};

export default ChatMessages;







 // const scroll = useRef<ScrollView>(null)
   
   
    // useEffect(() => {
    //     const scrollToBottom = () => {
    //         scroll.current?.scrollToEnd({ animated: false });
    //     };
    //     scrollToBottom()

    // }, []);
    //   useEffect(() => {
    //     const scrollToBottom = () => {
    //         scroll.current?.scrollToEnd({ animated: true });
    //     };
    //     scrollToBottom()

    // }, [triggerScroll]);
//<ScrollView  ref={scroll} contentContainerStyle={{justifyContent: 'flex-end', flexGrow: 1, paddingBottom: 5}} >
        //     {messages.length !== 0 ?  (messages.map((message, index) => {
        //         if (userId === message.SenderId) {
        //             return (<Mymessage key={index} content={message.Content} time={message.CreatedAt} isRead={message.ReadAt} />)
        //         }
        //         return (<Participantmessage key={index}  content={message.Content} time={message.CreatedAt}/>)
        //     })) : (
        //         <View style={{padding: 15, position: 'absolute', height: '100%', alignItems: 'center', rowGap: 10}}>
        //             <Text style={{color: '#FF0C69', marginTop: 30, textAlign: 'center', fontSize: 18, fontWeight: 500}}>Переписки пока нет, но вы можете это исправить!</Text>
        //             <Entypo size={40} name='emoji-flirt' color={'#DFA91F'}/>
        //         </View>
        //     )}

        // </ScrollView>