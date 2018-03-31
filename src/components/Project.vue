<template>
	<div class="card mb-4 box-shadow">
		<div class="card-header">
			<h4 class="card-title my-0 font-weight-normal">{{project.name}}</h4>
		</div>
		<div class="card-body">
			
			<ul class="list-unstyled mt-3 mb-4">
				<li v-for="task in project.tasks" :key="task._id" >
					{{task.name}}
				</li>
			</ul>

			<button type="button" class="btn btn-lg btn-block btn-outline-primary">Add</button>
		</div>
	</div>
</template>

<script>
	import auth from '../services/auth';

	export default {
		data() {
			return {
				error: ''
			};
		},
		props: ['project']
	};
</script>