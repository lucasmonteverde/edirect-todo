import axios from 'axios';

const SERVICE_ENDPOINT = 'projects/';

export default {

	update(project, data) {
		return axios.put(SERVICE_ENDPOINT + project + '/tasks', data);
	},

	remove(project, id) {
		return axios.delete(SERVICE_ENDPOINT + project + '/tasks/' + id);
	}

};