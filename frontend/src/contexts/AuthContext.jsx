import { createContext, useState } from "react";
import axios from "axios";
import { DOMAIN_NAME } from "../utils/constants";


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [token, _setToken] = useState(localStorage.getItem('BearerToken'));
	const api = axios.create();

	const setToken = (token) => {
		_setToken(token);
		localStorage.setItem('BearerToken', token);
	}

	const signup = async (userData) => {
		const data = await api.post(`${DOMAIN_NAME}/users/signup`, userData);
		console.log(data);
		return data;
	}

	const login = async (userData) => {
		const data = await api.post(`${DOMAIN_NAME}/users/login`, userData);
		console.log(data);
		return data;
	}

	// const getUser = async () => {
	// 	const data = await api.get('http://localhost:5000/api/auth/user', {
	// 		headers: {
	// 			'Authorization': `Bearer ${token}`
	// 		}
	// 	});
	// 	console.log(data);
	// 	return data;
	// }

	const logout = async () => {

	}

	return <AuthContext.Provider value={{ token, setToken, signup, login, logout }}>
		{children}
	</AuthContext.Provider>
}

export default AuthContextProvider