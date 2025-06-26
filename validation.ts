import {FieldType} from "./components/form/Input";

export type ValidType = {
    fieldname?: FieldType
    result: boolean | "none"
    message: string
}

export const validatePassword = (password: string): ValidType => {
    if (password.length < 6) {
        return {result: false, message: "Поле не должно иметь менее 6 символов!"}
    }

    return {result: true, message: ""}
}

export const validatePhonenumber = (pn: string): ValidType => {
    if (!/^(7|8)\d{10}$/.test(pn)) {
        console.log(pn)
        return {result: false, message: "Поле не соответствует формату!"}
    }
    return {result: true, message: ""}
}

export const validateDefaultFields = (field: string): ValidType => {
    if (field.length === 0) {
        return {result: false, message: "Заполните поле!"}
    }
    return {result: true, message: ""}
}


export const Validate = (type: FieldType, field: string)=> {
    switch (type) {
        case "phonenumber":
            return validatePhonenumber(field);

        case "normalfield":
            return validateDefaultFields(field)

        case "password":
            return validatePassword(field)

    }

}