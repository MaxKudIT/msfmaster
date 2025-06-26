export type ChatMessage = {
    Id: string
    Type: 'text' | 'image' | 'file' | 'link' | 'audio' | 'video'
    Content: string
    CorrespondenceType: 'chat' | 'group' | 'channel'
    ChatId: string | null
    CreatedAt: Date
    UpdatedAt?: Date
    ReadAt: Date | null
    SenderId: string
    RecieverId: string
}

export type ChatMessageDTOClient = {
    Id: string
    Type: 'text' | 'image' | 'file' | 'link' | 'audio' | 'video'
    Content: string
    CorrespondenceType: 'chat' | 'group' | 'channel'
    ChatId: string | null
    SenderId: string
    RecieverId: string
}