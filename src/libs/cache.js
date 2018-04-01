
export default {

	has(key) {
		return localStorage.getItem(key);
	},

	get(key) {
		return JSON.parse( localStorage.getItem(key) );
	},

	set(key, value) {
		localStorage.setItem(key, JSON.stringify(value) );
	}
}