export interface RegistrationREQState {
    naming: Naming
    phonenumber: string
    password: string
}

export type RegistrationREQ = {
    name: string
    lastname: string
    phonenumber: string
    password: string
}

export type RegistrationRES = {
    
}


export type Naming = {
    name: string,
    lastname: string
}
