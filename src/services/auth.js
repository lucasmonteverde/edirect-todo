import axios from 'axios';
import decode from 'jwt-decode';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/': 'http://localhost:3000/';

const LOGIN_URL = '/auth/token';

export default {
	async login (email, password) {
		const { data } = await axios.post(LOGIN_URL, { email, password });

		console.log('login', data);

		localStorage.setItem('token', data.token);

		return data;
	},
  
	getToken () {
		return localStorage.token;
	},

	getUser() {
		return decode(this.getToken());
	},
  
	logout () {
		localStorage.removeItem('token');
	},
  
	loggedIn () {
		return !!localStorage.token;
	},

	getAuthHeader() {
		return  'Bearer ' + localStorage.getItem('token');
	}
};