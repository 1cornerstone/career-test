const { isEmpty } = require('../utils/data-validator');
const { isEmail } = require('../utils/data-validator');


class LoginDto {
    constructor(body) {
        this.email = body.email;
        this.password = body.password;
    }

    validate() {
        if (isEmpty(this.email)) {
            throw new Error('Email is required');
        }

        if (!isEmail(this.email)) {
            throw new Error('Invalid email format');
        }

        if (isEmpty(this.password)) {
            throw new Error('Password is required');
        }
    }
}

module.exports = { LoginDto };
