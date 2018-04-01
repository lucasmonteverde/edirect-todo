import axios from 'axios';
import decode from 'jwt-decode';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/': 'http://localhost:3000/';

const LOGIN_URL = '/auth/token';
const REGISTER_URL = '/auth/register';

export default {
	async login ( auth ) {
		const { data } = await axios.post(LOGIN_URL, auth);

		localStorage.setItem('token', data.token);

		return data;
	},

	async register ( auth ) {
		const { data } = await axios.post(REGISTER_URL, auth);

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
		return  'Bearer ' + this.getToken();
	}
};