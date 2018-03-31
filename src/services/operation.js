import axios from 'axios';

const SERVICE_ENDPOINT = 'operations/';

export default {

	get() {

		if ( localStorage.getItem(SERVICE_ENDPOINT) ) {
			return Promise.resolve( JSON.parse( localStorage.getItem(SERVICE_ENDPOINT) ) );
		} else {
			return axios.get(SERVICE_ENDPOINT)
				.then(result => {
					localStorage.setItem(SERVICE_ENDPOINT, JSON.stringify(result.data) );
					return result.data;
				})
				.catch( err => {
					throw err;
				});
		}
	}

};