const { isEmpty } = require('../utils/data-validator');
const { isEmail } = require('../utils/data-validator');


class CreateUserDto {
    constructor(body) {
        this.firstName = body.firstName;
        this.lastName = body.lastName;
        this.email = body.email;
        this.password = body.password;
    }

    validate() {
        if (isEmpty(this.firstName)) {
            throw new Error('firstName is required and must be a non-empty string');
        }

        if (isEmpty(this.lastName)) {
            throw new Error('lastName is required and must be a non-empty string');
        }

        if (isEmpty(this.email)) {
            throw new Error('email is required');
        }

        if (!isEmail(this.email)) {
            throw new Error('Invalid email format');
        }

        if (isEmpty(this.password)) {
            throw new Error('password is required');
        }

        if (this.password.length < 6 || this.password.length > 30) {
            throw new Error('password must be between 6 and 30 characters');
        }
    }
}

module.exports = { CreateUserDto };
