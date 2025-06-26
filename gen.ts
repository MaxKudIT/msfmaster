export const generateStrongPassword = (length: number = 10): string => {
    const adjustedLength = Math.max(6, Math.min(length, 32));

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';


    const firstChar = (lowercase + uppercase)[Math.floor(Math.random() * 52)];

    const mandatoryChars = [
        lowercase[Math.floor(Math.random() * lowercase.length)],
        uppercase[Math.floor(Math.random() * uppercase.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ].join('');


    const allChars = lowercase + uppercase + numbers + symbols;
    let remainingChars = '';
    for (let i = 0; i < adjustedLength - 5; i++) {
        remainingChars += allChars[Math.floor(Math.random() * allChars.length)];
    }

    const password = (firstChar + mandatoryChars + remainingChars)
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');

    return password.slice(0, adjustedLength);
};

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}