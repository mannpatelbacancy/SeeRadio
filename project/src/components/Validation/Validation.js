import {regex} from './ValidateRegex';

export const validationHandler = (name, value) => {
    return regex[name].test(value)
}