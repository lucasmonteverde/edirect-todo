<template>
	<div class="col-md-4 col-sm-6">
		<div class="card mb-4 box-shadow">
			<div class="card-header">
				<h3 class="h3 card-title my-0 font-weight-normal d-inline-block" contentEditable="true" @blur="save" ref="title">{{project.name}}</h3>
				<span class="task-remove float-right m-1" @click="remove()">🗑️</span>
				<span class="task-remove float-right m-1" @click="edit()">🖊️</span>
			</div>
			<div class="card-body" v-if="project.tasks.length">
				<h4 class="h4">To Do</h4>
				<ul class="list-unstyled mt-3 mb-4">
					<Task v-for="task in todo" :key="task._id" v-bind:task="task" v-bind:project="project._id" v-on:remove="removeTask" v-on:complete="completeTask" />
				</ul>

				<h4 class="h4">Done</h4>
				<ul class="list-unstyled mt-3 mb-4">
					<Task v-for="task in done" :key="task._id" v-bind:task="task" v-bind:project="project._id" />
				</ul>
			</div>
			<form class="card-footer" @submit.prevent="addTask()">
				<div class="input-group">
					<input type="text" v-model="task.name" class="form-control" placeholder="Task" required>
					<div class="input-group-append">
						<button type="submit" class="btn btn-lg btn-primary">Add</button>
					</div>
				</div>
				<p v-if="error" class="text-danger">{{ error }}</p>
			</form>
		</div>
	</div>
</template>

<script>
	import Task from '../components/Task';

	import ProjectService from '../services/project';
	import TaskService from '../services/task';

	export default {
		components: {
			Task,
		},
		data() {
			return {
				task: {
					name: ''
				},
				error: ''
			};
		},
		props: ['project'],
		computed: {
			todo() {
				return this.project.tasks.filter( item => !item.finishedAt );
			},
			done() {
				return this.project.tasks.filter( item => item.finishedAt );
			}
		},
		methods: {
			edit() {
				this.$refs.title.focus();
			},
			removeTask(task) {
				this.project.tasks.splice(this.project.tasks.indexOf(task), 1);
			},
			completeTask(task) {
				this.project.tasks.splice(this.project.tasks.indexOf(task), 1, task);
			},
			async save(e) {
				if ( this.project.name === e.target.innerText ) return;

				try {
					this.project.name = e.target.innerText;
					const { data } = await ProjectService.save(this.project);
				} catch(err) {
					console.error('Error:project:edit', err, err.response);
				}
			},
			async remove() {
				try {
					const { data } = await ProjectService.remove(this.project._id);
					this.$emit('remove', this.project);
				} catch(err) {
					console.error('Error:project:edit', err, err.response);
				}
			},
			async addTask() {
				try {
					const { data } = await TaskService.update(this.project._id, this.task);
					this.project.tasks.push(data);
					this.task.name = '';
				} catch(err) {
					console.error('Error:task:addTask', err, err.response);
					this.error = err.response && err.response.data && err.response.data.message || err.message;
				}
			}
		}
	};
</script>