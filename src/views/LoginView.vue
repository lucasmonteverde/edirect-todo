<template>
	<section class="login text-center">
		<form class="form-login" @submit.prevent="login()">
			<h1 class="h3 mb-3 font-weight-normal">Login</h1>

			<input type="email" v-model="email" class="form-control" placeholder="Email address" required autofocus>

			<input type="password" v-model="password" class="form-control" placeholder="Password" required minlength="6">

			<button type="submit" class="btn btn-lg btn-primary btn-block">Sign in</button>

			<p v-if="error" class="text-danger">{{ error }}</p>
		</form>
	</section>
</template>

<script>
	import auth from '../services/auth';

	export default {
		data() {
			return {
				email: 'test@test.com',
				password: '123456',
				error: ''
			};
		},
		methods: {
			async login() {

				const data = {
					email: this.email,
					password: this.password
				};

				 try {
					await auth.login(this.email, this.password);
					//this.$router.push(this.$route.query.redirect || '/');
					this.$router.replace({ path: this.$route.query.redirect || '/'});

					console.log('push route');
				} catch (err) {
					console.error('Login Error', err, err.response);
					this.error = err.response && err.response.data && err.response.data.message || err.message;
				}
			}
		}
	};
</script>

<style lang="scss">
	@import '../styles/style';

	.form-login {
		width: 100%;
		max-width: 330px;
		padding: 15px;
		margin: 0 auto;

		.email {
			margin-bottom: -1px;
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
		}

		.password {
			margin-bottom: 10px;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		}
	}

	.form-control {
		position: relative;
		box-sizing: border-box;
		height: auto;
		padding: 10px;
		font-size: 16px;

		&:focus { z-index: 2; }
	}
</style>
