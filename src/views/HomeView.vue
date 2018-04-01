<template>
	<section class="home">
		<Header />

		<div class="container-fluid">

			<div class="row my-5">
				<Project v-for="project in projects" :key="project._id" v-bind:project="project" v-on:remove="remove" />
				
				<NewProject v-on:add="add" />
			</div>
		</div>
	</section>
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
		methods: {
			add(project) {
				this.projects.push(project);
			},
			remove(project) {
				this.projects.splice(this.projects.indexOf(project), 1);
			}
		},
		async created() {
			const { data } = await project.get();

			console.log('projects', data);

			this.projects = data;
		}
	}
</script>