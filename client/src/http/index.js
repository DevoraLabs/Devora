import axios from 'axios';

export const API_URL = 'http://localhost:5000';

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
	return config;
});

$api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._isRetry) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.get(`${API_URL}/auth/refresh`, {
					withCredentials: true,
				});
				localStorage.setItem('accessToken', response.data.accessToken);
				originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
				return $api(originalRequest);
			} catch (err) {
				return Promise.reject(err);
			}
		}
		return Promise.reject(error);
	}
);

export default $api;
