const { isNullOrEmpty } = require('../utils/data-validator');

class UpdateUserDto {
    constructor(body) {
        this.firstName = body.firstName;
        this.lastName = body.lastName;
    }

    validate() {
        if(isNullOrEmpty(this.firstName) && isNullOrEmpty(this.lastName)){
            throw new Error('no fields found');
        }
    }
}

module.exports = { UpdateUserDto };