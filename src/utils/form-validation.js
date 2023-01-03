export const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[-!@$%^*])(?=.*[!"$%*,-.\/:;=@^_])[a-zA-Z0-9!"$%*,-.\/:;=@^_]{8,}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const numericRegex = /^[0-9]*$/
const alphaNumeric = /^[0-9a-zA-Z]*$/

export const validateRequired = (value) => {
    console.log('validateRequired', value)
    if (value && value.length > 0 && value !== undefined && value !== null) {
        return {
            isError: false,
            error: ''
        }
    }
    return {
        isError: true,
        error: 'Field is required'
    }
}

export const validateEmail = (value) => {
    console.log('validateEmail', value)
    if (!validateRequired(value).isError) {
        if (value.match(emailRegex)) {
            return {
                isError: false,
                error: ''
            }
        }
        return {
            isError: true,
            error: 'Email is invalid'
        }
    } else {
        return {
            isError: true,
            error: 'Field is required'
        }
    }
}

export const validateMobileNumber = (value) => {
    console.log('validateMobileNumber', value)
    if (!validateRequired(value).isError) {
        if (value.match(numericRegex)) {
            if ((Number(value[0]) === 0 ? value.length === 11 : value.length === 10)) {
                return {
                    isError: false,
                    error: ''
                }
            } else {
                return {
                    isError: true,
                    error: 'Phone number is invalid'
                }
            }
        } else {
            return {
                isError: true,
                error: 'Phone number must be numeric'
            }
        }
    } else {
        return {
            isError: true,
            error: 'Field is required'
        }
    }
}

export const validateNumeric = (value) => {
    if (value.match(numericRegex)) {
        return {
            isError: false,
            error: ''
        }
    } else {
        return {
            isError: true,
            error: 'Field accepts numeric only'
        }
    }
}

export const validateAlphaNumeric = (value) => {
    if (value.match(alphaNumeric)) {
        return {
            isError: false,
            error: ''
        }
    } else {
        return {
            isError: true,
            error: 'Field accepts alpha-numeric only'
        }
    }
}

