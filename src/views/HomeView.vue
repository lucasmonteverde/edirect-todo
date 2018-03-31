<template>
	<main>
		<Header />
		<div class="container">
			<h1 class="display-4 text-center my-5">Hello view</h1>

			<div class="card-deck mb-3 text-center">
				<Project v-for="project in projects" :key="project._id" v-bind:project="project" />
				<NewProject />
			</div>
		</div>
	</main>
</template>

<script>
	import Header from '../components/Header';
	import Project from '../components/Project';
	import NewProject from '../components/NewProject';

	import project from '../services/project';

	export default {
		components: {
			Header,
			Project,
			NewProject
		},
		data() {
			return {
				projects: []
			}
		},
		async created() {
			const { data } = await project.get();

			console.log('projects', data);

			this.projects = data;
		}
	}
</script>

<style lang="scss">
	@import '../styles/style';

</style>
