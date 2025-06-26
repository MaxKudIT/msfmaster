
export type AuthDataRES = {
    Id: string
    Tokens: TokenDTO
    Name: string
    PhoneNumber: string
}

export type AuthDataREQ = {
    Phonenumber : string
    Password  : string
}


type TokenDTO = {
    access_token: string
    refresh_token: string
}



export type FI = {
    name: string
    lastname: string
}

