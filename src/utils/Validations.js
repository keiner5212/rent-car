//validate string contains only letters
export function validateOnlyLetters(name) {
    return /^[a-zA-Z]+$/.test(name);
}

//validate only numbers
export function validateOnlyNumbers(name) {
    return /^[0-9]+$/.test(name);
}
