import axios from 'axios';

const SERVICE_ENDPOINT = 'projects/';

export default {

	get(id, params = {}) {
		return axios.get(SERVICE_ENDPOINT + ( id || '' ), { params });
	},

	create(data) {
		return axios.post(SERVICE_ENDPOINT, data);
	},

	save(data) {
		return axios.put(SERVICE_ENDPOINT + data._id, data);
	},

	remove(id) {
		return axios.delete(SERVICE_ENDPOINT + id);
	}

};