
import { ChatMessage } from "./chatms"


export type ChatDataDTOServer = {
    chat: string | null
    headerdata: {
        Id: string
        Name: string
        AvatarUrl: string
        Status: boolean
    },
    messages: ChatMessage[]
}


export type ChatsPreviewDTOServer = {
        User: {
             Name: string
             AvatarUrl: string
             Status: boolean
        },
        MessageMeta: {
            Content: string
            CreatedAt: string
            IsRead: boolean
            IsMy: boolean,
            SenderId: string
            UnReadMessages: string[]
        },
        ChatId: string
        ParticipantId: string
        // DefaultColor: string //потом
}