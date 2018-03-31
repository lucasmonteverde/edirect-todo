<template>
	<div class="col-sm-4">
		<div class="card mb-4 box-shadow">
			<div class="card-header">
				<h3 class="h3 card-title my-0 font-weight-normal d-inline-block" contentEditable="true" @blur="edit">{{project.name}}</h3>
				<span class="task-remove float-right m-1" @click="remove()">🗑️</span>
				<span class="task-remove float-right m-1" @click="edit()">🖊️</span>
			</div>
			<div class="card-body">
				<h4>To Do</h4>
				<ul class="list-unstyled mt-3 mb-4">
					<li v-for="task in todo" :key="task._id" :title="task.createdAt | formatDate" class="task-item">
						<div class="form-check">
							<input type="checkbox" :id="task.name" v-model="task.done" class="form-check-input" @change.once="completeTask(task)">
							<label class="form-check-label" :for="task.name">{{task.name}}</label>
							<span class="task-remove" @click="removeTask()">🗑️</span>
						</div>
					</li>
				</ul>

				<h4>Done</h4>
				<ul class="list-unstyled mt-3 mb-4">
					<li v-for="task in done" :key="task._id" :title="task.finishedAt | formatDate" >
						<div class="form-check">
							<input type="checkbox" class="form-check-input" checked readonly disabled>
							<label class="form-check-label">{{task.name}}</label>
						</div>
					</li>
				</ul>
				
			</div>
			<form class="card-footer" @submit.prevent="addTask()">
				<div class="input-group">
					<input type="text" v-model="task.name" class="form-control" placeholder="Task" required>
					<div class="input-group-append">
						<button type="submit" class="btn btn-lg btn-primary">Add</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import project from '../services/project';

	export default {
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
				return this.project.tasks.filter( item => !item.finishedAt);
			},
			done() {
				return this.project.tasks.filter( item => item.finishedAt);
			}
		},
		methods: {
			async edit() {
				try {
					this.project.name = event.target.innerText;
					const { data } = await project.save(this.project);
				} catch(err) {
					console.error('Error:project:edit', err, err.response);
				}
			},
			async remove() {
				try {
					const { data } = await project.remove(this.project._id);
					this.$emit('remove', this.project);
				} catch(err) {
					console.error('Error:project:edit', err, err.response);
				}
			},
			async addTask() {
				try {
					const { data } = await project.updateTask(this.project._id, this.task);
					this.project.tasks.push(data);
					this.task.name = '';
				} catch(err) {
					console.error('Error:task:addTask', err, err.response);
					this.error = err.response && err.response.data && err.response.data.message || err.message;
				}
			},
			async removeTask() {
				try {
					await project.removeTask(this.project._id, this.task);
					this.project.tasks.splice(this.project.tasks.indexOf(this.task), 1);
				} catch(err) {
					console.error('Error:task:removeTask', err, err.response);
				}
			},
			async completeTask(task) {
				try {
					task.finishedAt = new Date();
					const { data } = await project.updateTask(this.project._id, task);
				} catch(err) {
					console.error('Error:task:completeTask', err, err.response);
				}
			}
		}
	};
</script>

<style lang="scss">
	.task-remove{ cursor: pointer; }
	.task-item:not(:hover) .task-remove{ display: none; }
</style>
