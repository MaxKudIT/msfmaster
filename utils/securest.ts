import * as SecureStorage from 'expo-secure-store'

export const saveItemInStorage = async (key: string, value: any) => {
    await SecureStorage.setItemAsync(key, value)
}

export const getItemFromStorage = async (key: string) => {
    const item = await SecureStorage.getItemAsync(key);
    return item;
}

export const deleteItemFromStorage = async (key: string) => {
    await SecureStorage.deleteItemAsync(key);
}