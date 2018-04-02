<template>
	<section class="auth text-center h-100 d-flex align-items-center bg-light">
		<div class="container">
			<h1 class="h1 mb-5 font-weight-normal">EDirectInsure TODO List</h1>

			<div class="row">
				<div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3">
					<form class="card" @submit.prevent="submit()">

						<h4 class="h4 font-weight-normal card-header">{{type | capitalize}}</h4>

						<div class="card-body">
							<input type="text" v-model="name" class="form-control form-control-lg mb-3" placeholder="Name" required autofocus v-if="type === 'register'">

							<input type="email" v-model="email" class="form-control form-control-lg mb-3" placeholder="Email address" required autofocus>

							<input type="password" v-model="password" class="form-control form-control-lg mb-3" placeholder="Password" required minlength="6">

							<button type="submit" class="btn btn-lg btn-primary btn-block mb-3">{{type === 'login' ? 'Sign in': 'Sign Up'}}</button>

							<p v-if="error" class="text-danger">{{ error }}</p>

							<button type="button" class="btn btn-link" @click="type = 'register'" v-if="type === 'login'">Don't have an account? Register</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import auth from '../services/auth';

	export default {
		data() {
			return {
				type: 'login',
				name: '',
				email: 'test@test.com',
				password: '123456',
				error: ''
			};
		},
		methods: {
			async submit() {

				 try {
					await auth[this.type]({
						name: this.name,
						email: this.email,
						password: this.password
					});
					this.$router.replace( this.$route.query.redirect || '/');
				} catch (err) {
					console.error('Auth Error', err, err.response);
					this.error = err.response && err.response.data && err.response.data.message || err.message;

					if ( Array.isArray(this.error) ) {
						this.error = this.error.map( err => err.message).join(',');
					}
				}
			}
		}
	};
</script>

<style lang="scss">
	html, body { height: 100%; }
</style>
