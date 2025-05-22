
const { isEmail } = require('../../utils/data-validator');
const { isEmpty } = require('../../utils/data-validator');
const { isNullOrEmpty } = require('../../utils/data-validator');

describe('isEmail', () => {
    it('should return true for valid email addresses', () => {
        expect(isEmail('test@example.com')).toBe(true);
        expect(isEmail('user.name@domain.co')).toBe(true);
        expect(isEmail('name+tag@sub.domain.com')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
        expect(isEmail('')).toBe(false);
        expect(isEmail('plainaddress')).toBe(false);
        expect(isEmail('@@.com')).toBe(false);
        expect(isEmail('user@.com')).toBe(false);
        expect(isEmail('user@com')).toBe(false);
        expect(isEmail('user@com.')).toBe(false);
        expect(isEmail('user@com..com')).toBe(false);
    });

    it('should return false for null or undefined', () => {
        expect(isEmail(null)).toBe(false);
        expect(isEmail(undefined)).toBe(false);
    });
});



describe('isEmpty', () => {
    it('should return true for null', () => {
        expect(isEmpty(null)).toBe(true);
    });

    it('should return true for undefined', () => {
        expect(isEmpty(undefined)).toBe(true);
    });

    it('should return true for non-string types', () => {
        expect(isEmpty(123)).toBe(true);
        expect(isEmpty({})).toBe(true);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty(true)).toBe(true);
    });

    it('should return true for empty string', () => {
        expect(isEmpty('')).toBe(true);
    });

    it('should return true for whitespace-only string', () => {
        expect(isEmpty('   ')).toBe(true);
    });

    it('should return false for non-empty strings', () => {
        expect(isEmpty('hello')).toBe(false);
        expect(isEmpty('  world  ')).toBe(false);
    });
});


describe('isNullOrEmpty', () => {
    it('should return true for null', () => {
        expect(isNullOrEmpty(null)).toBe(true);
    });

    it('should return true for undefined', () => {
        expect(isNullOrEmpty(undefined)).toBe(true);
    });

    it('should return true for empty string', () => {
        expect(isNullOrEmpty('')).toBe(true);
    });

    it('should return true for whitespace-only string', () => {
        expect(isNullOrEmpty('   ')).toBe(true);
    });

    it('should return false for non-empty strings', () => {
        expect(isNullOrEmpty('hello')).toBe(false);
        expect(isNullOrEmpty('  world  ')).toBe(false);
    });
});
