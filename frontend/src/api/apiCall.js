import axios from 'axios';
import { DOMAIN_NAME } from '../utils/constants';

export const signupCall = async (name, email, password, confirmPassword) => {
	const options = {
		method: 'POST',
		url: `${DOMAIN_NAME}/api/auth/signup`,
		data: {
			name,
			email,
			password,
			confirmPassword
		}
	}
	return await axios(options);
}

export const loginCall = async (email, password) => {
	const options = {
		method: 'POST',
		url: `${DOMAIN_NAME}/api/auth/login`,
		data: {
			email,
			password
		}
	}
	return await axios(options);
}

export const logoutCall = async () => {
	const options = {
		method: 'POST',
		url: `${DOMAIN_NAME}/api/auth/logout`,
	}
	return await axios(options);
}

export const verifyCodeCall = async (code) => {
	const options = {

	}
}