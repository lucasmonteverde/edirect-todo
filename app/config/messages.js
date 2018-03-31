const AUTH_MESSAGES = {
	USER_INATIVE: 'Inactive user',
	USER_NOT_FOUND: 'User not found',
	WRONG_PASSWORD: 'Wrong password'
};

const VALIDATION_MESSAGES = {
	NAME: 'Name is required',
	EMAIL: 'Invalid email',
	PASSWORD: 'Invalid password',
	EXISTS: 'A user with the given username is already registered'
};

module.exports = {
	auth: AUTH_MESSAGES,
	validation: VALIDATION_MESSAGES
};