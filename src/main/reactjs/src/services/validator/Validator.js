class Validator {
    containNumberOnly(text) {
        return /^\d+$/.test(text);
    }

    isPhoneNumberValid(phoneNumber) {
        if (phoneNumber.length < 10 || phoneNumber.length > 15) return false;
        return /^\d+$/.test(phoneNumber);
    }

    isUserNameValid(username) {
        return /^\S+$/.test(username);
    }

    isPasswordValid(password) {
        return /^\S{7,20}$/.test(password);
    }

    isEmpty(value) {
        if (value === "" || value === NaN || value === undefined || value === null || value === "None" || value == "-1") {
            return true;
        } 
        return false;
    }
}

export default new Validator();