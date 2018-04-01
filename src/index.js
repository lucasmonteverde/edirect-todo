import Vue from 'vue';
import axios from 'axios';
import router from './router';
import auth from './services/auth';
import * as filters from './libs/filters';
import App from './App';

Object.keys(filters).forEach(filter => {
	Vue.filter(filter, filters[filter]);
});

//set authorization headers
axios.interceptors.request.use( req => {
	if ( auth.loggedIn() ) req.headers['Authorization'] = auth.getAuthHeader();
	return req;
}, error => Promise.reject(error) );

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});
