<template>
	<div class="col-md-4 col-sm-6">
		<form class="card mb-4 box-shadow bg-light p-lg-5 p-2" @submit.prevent="create()">
			<div class="card-body">
				<h3 class="card-title text-center">Create a new Project</h3>
				<input type="text" v-model="name" class="form-control my-3" placeholder="Project name" required />
				<button type="submit" class="btn btn-lg btn-block btn-primary">Create Project</button>
				<p v-if="error" class="text-danger">{{ error }}</p>
			</div>
		</form>
	</div>
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
					const { data } = await project.create({ name: this.name });
					this.$emit('add', data);
					this.name = '';
				} catch(err) {
					console.error('Error:project:create', err, err.response);
					this.error = err.response && err.response.data && err.response.data.message || err.message;

					if ( Array.isArray(this.error) ) {
						this.error = this.error.map( err => err.message).join(',');
					}
				}
			}
		}
	};
</script>