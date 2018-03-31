<template>
	<header>
		<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
			<div class="container">
				<a class="navbar-brand" href="#">EDirectInsure TODO List</a>
				
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				
				<div class="collapse navbar-collapse" id="navbar">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item dropdown active">
							<a class="nav-link" href="#">{{user.name}}</a>
							<div class="dropdown-menu dropdown-menu-right">
								<a class="dropdown-item active" href="#">Logout</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
	 	</nav>
	</header>
</template>

<script>
	import auth from '../services/auth';

	export default {
		computed: {
			user () {
				return auth.getUser();
			}
		}
	};
</script>