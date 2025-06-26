import { Avatar } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';

export type ContactReqDTO = { //add
    PhoneNumber: string
    // name: string
}

export type ContactResDTO = { //get
    UserId: string
    Avatar: string
    Name: string
}

