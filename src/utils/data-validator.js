
function isEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email);
}


function isEmpty(str) {
    return typeof str !== 'string' || str.trim() === '';
}

function isNullOrEmpty(str) {
    return str == null || str.trim() === '';
}


module.exports = { isEmpty, isNullOrEmpty, isEmail };