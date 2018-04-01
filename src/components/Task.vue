<template>
	<li class="task-item" :title="(task.finishedAt || task.createdAt) | formatDate">
		<div class="form-check">
			<input type="checkbox" class="form-check-input" 
				:id="task._id"
				@change.once="complete()" 
				:checked="task.finishedAt" 
				:disabled="task.finishedAt" />
			<label class="form-check-label" :for="task._id">{{task.name}}</label>
			<span class="task-remove" @click="remove()" v-if="!task.finishedAt">🗑️</span>
		</div>
	</li>
</template>

<script>
	import TaskService from '../services/task';

	export default {
		props: ['task', 'project'],
		methods: {
			async remove() {
				try {
					await TaskService.remove(this.project, this.task._id);
					this.$emit('remove', this.task);
				} catch(err) {
					console.error('Error:task:removeTask', err, err.response);
				}
			},
			async complete() {
				try {
					this.task.finishedAt = new Date();
					const { data } = await TaskService.update(this.project, this.task);
					this.$emit('complete', this.task);
				} catch(err) {
					console.error('Error:task:completeTask', err, err.response);
				}
			}
		}
	}
</script>

<style lang="scss">
	.task-remove{ cursor: pointer; }
	.task-item:not(:hover) .task-remove{ display: none; }
</style>
