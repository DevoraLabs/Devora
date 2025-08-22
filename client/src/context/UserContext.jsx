import { createContext, useContext, useState, useEffect } from 'react';
import $api from '../http/index';

const UserContext = createContext(undefined);

function parseJwt(token) {
	try {
		const base64Payload = token.split('.')[1];
		const payload = atob(base64Payload);
		return JSON.parse(payload);
	} catch (e) {
		return null;
	}
}

export function UserProvider({ children }) {
	const [username, setUsername] = useState(undefined);

	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			const userData = parseJwt(token);
			if (userData?.username) {
				setUsername(userData.username);
			}
		}
	}, []);

	return (
		<UserContext.Provider value={{ username, setUsername }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	return useContext(UserContext);
}
