import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Naming, RegistrationREQ, RegistrationREQState } from "../dto/reg";
import { ChatMessage, ChatMessageDTOClient } from "../dto/chatms";

//СИНХРОНИЗИРОВАТЬ!!!

const initialRegState: RegistrationREQState = {
        naming: {
            name: "",
            lastname: ""
        },
        phonenumber: "",
        password: ""
}
 
const initialSomeData: {access_token: string} = {
    access_token: ''
}

const initialSomeEvents: {clampingContacts: string[], deleting: boolean, search: {value: string, isActive: boolean}, searchhome: {value: string, isActive: boolean}} = {
    clampingContacts: [],
    deleting: false,
    search: {
        value: '',
        isActive: false
    },
    searchhome: {
        value: '',
        isActive: false
    }
}
   
const initialMessages: {messages: ChatMessage[]} = {
    messages: []
}


const initialWebsocketMeta: {isActive: boolean} = {
    isActive: false
}


export const WebSocketSlice = createSlice({
    name: "websocketslice",
    initialState: initialWebsocketMeta,
    reducers: {
      setStatus(state, action: PayloadAction<boolean>) {
        state.isActive = action.payload
      }
    },
})



export const RegistrationSlice = createSlice({
    name: "regslice",
    initialState: initialRegState,
    reducers: {
        setNaming(state, action: PayloadAction<Naming>) {
            state.naming = action.payload
        },
        setPhonenumber(state, action: PayloadAction<string>) {
            state.phonenumber = action.payload
        },
         setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload
        },

    },
})

export const ChatMessagesSlice = createSlice({
    name: "chatslice",
    initialState: initialMessages,
    reducers: {
        setMessages(state, action: PayloadAction<ChatMessage[]>) {
            state.messages = action.payload
        }

    },
})





export const EventsContactsSlice = createSlice({
    name: 'eventslice',
    initialState: initialSomeEvents,
    reducers: {
        setContactClamping(state, action: PayloadAction<string[]>) {
            state.clampingContacts = [...new Set(action.payload)]
        },
        setDeleting(state, action: PayloadAction<boolean>) {
            state.deleting = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.search.value = action.payload
        },
        setSearchActive(state, action: PayloadAction<boolean>) {
            state.search.isActive = action.payload
        },
        setHomeSearchValue(state, action: PayloadAction<string>) {
            state.searchhome.value = action.payload
        },
        setHomeSearchActive(state, action: PayloadAction<boolean>) {
            state.searchhome.isActive = action.payload
        },

    }
})

export const SomeDataSlice = createSlice({
    name: 'dataslice',
    initialState: initialSomeData,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>) {
            state.access_token = action.payload
        }
    }
})





export const Reducer1 = RegistrationSlice.reducer;
export const Reducer2 = EventsContactsSlice.reducer;
export const Reducer3 = SomeDataSlice.reducer;

export const Reducer5 = WebSocketSlice.reducer;
export const {setNaming, setPhonenumber, setPassword} = RegistrationSlice.actions;
export const {setContactClamping, setDeleting, setSearchValue, setSearchActive, setHomeSearchValue, setHomeSearchActive} = EventsContactsSlice.actions
export const {setAccessToken} = SomeDataSlice.actions;
export const {setStatus} = WebSocketSlice.actions