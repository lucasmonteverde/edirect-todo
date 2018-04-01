<template>
	<header>
		<nav class="navbar navbar-expand navbar-dark bg-dark">
			<a class="navbar-brand" href="#">EDirectInsure TODO List</a>
			
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			
			<div class="collapse navbar-collapse" id="navbar">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item dropdown" @click="active()" :class="{show: isActive}">
						<a class="nav-link dropdown-toggle" href="#">{{user.name}}</a>
						<div class="dropdown-menu dropdown-menu-right" :class="{show: isActive}">
							<a href="#" class="dropdown-item" @click="logout()">Logout</a>
						</div>
					</li>
				</ul>
			</div>
	 	</nav>
	</header>
</template>

<script>
	import auth from '../services/auth';

	export default {
		data() {
			return {
				isActive: false
			}
		},
		computed: {
			user () {
				return auth.getUser();
			}
		},
		methods: {
			logout() {
				auth.logout();
				this.$router.push('/login');
			},
			active() {
				this.isActive = !this.isActive;
			}
		}
	};
</script>