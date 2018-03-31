<template>
	<form class="card mb-4 box-shadow w-50 bg-light p-5" @submit.prevent="create()">
		<div class="card-body">
			<h3 class="card-title">Create a new Project</h3>
			<input type="text" v-model="name" class="form-control my-3" placeholder="Project name" required />
			<button type="button" class="btn btn-lg btn-block btn-primary">Create Project</button>
		</div>
	</form>
</template>

<script>
	import project from '../services/project';

	export default {
		data() {
			return {
				name: '',
				error: ''
			}
		},
		methods: {
			async create() {
				try {
					await project.create(this.name);
				} catch(err) {
					console.error('Login Error', err, err.response);
					this.error = err.response && err.response.data && err.response.data.message || err.message;
				}
			}
		}
	};
</script>