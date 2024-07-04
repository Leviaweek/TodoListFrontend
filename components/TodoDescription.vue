<script setup lang="ts">
import { Todo } from '../models/Todo';
import moment from 'moment';

const props = defineProps<{
    todo: Todo;
}>();


const deadline = moment(props.todo.deadline);
const createdAt = moment(props.todo.createdAt);
const completedAt = moment(props.todo.completedAt);
const fmt = "YYYY/MM/DD HH:mm";

</script>

<template>
    <div class="todo-description">
        <h3>{{ props.todo.title }}</h3>
        <p>{{ props.todo.description }}</p>
        <p>Created at {{ createdAt.format(fmt) }}</p>
        <p>Deadline: {{ deadline.format(fmt) }}</p>
        <p v-if="props.todo.isCompleted">Completed At: {{ completedAt.format(fmt) }}</p>
    </div>
</template>


<style scoped>
    .todo-description {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }

    .todo-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
</style>