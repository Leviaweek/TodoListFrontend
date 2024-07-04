<script setup lang="ts">
import { ref, watch } from 'vue';
import { Todo } from '../models/Todo';
import moment from 'moment';

const props = defineProps<{
    todo: Todo;
}>();

const emit = defineEmits<{
    onTodoClick: [todo: Todo];
}>();
const datetimeLocalFmt = "YYYY-MM-DDTHH:mm";
const fmt = "YYYY/MM/DD HH:mm";
const deadline = ref<string>(moment(props.todo.deadline).format(datetimeLocalFmt));
const createdAt = ref<string>(moment(props.todo.createdAt).format(datetimeLocalFmt));
const completedAt = ref<string | null>(props.todo.isCompleted ? moment(props.todo.completedAt).format(fmt) : null);

const title = ref<string>(props.todo.title);
const description = ref<string>(props.todo.description);

watch (deadline, (newDeadline: string) => {
    emit('onTodoClick', {...props.todo, deadline: moment(newDeadline).toISOString()});
});

watch (createdAt, (newCreatedAt: string) => {
    emit('onTodoClick', {...props.todo, createdAt: moment(newCreatedAt).toISOString()});
});

watch (title, (newTitle: string) => {
    emit('onTodoClick', {...props.todo, title: newTitle});
});

watch (description, (newDescription: string) => {
    emit('onTodoClick', {...props.todo, description: newDescription});
});

</script>


<template>
    <div class="todo-edit">
        <input required type="text" placeholder="Title" v-model="title"/>
        <textarea required placeholder="Description" v-model="description"/>
        <input required type="datetime-local" placeholder="Deadline" v-model="deadline"/>
        <input required type="datetime-local" placeholder="Created At" v-model="createdAt"/>
        <div class="is-completed-wrapper">
            <label for="isCompleted">Is Completed: </label>
            <input required type="checkbox" placeholder="Is Completed" v-model="todo.isCompleted"/>
        </div>
        <p v-if="todo.isCompleted && completedAt !== null">{{completedAt}}</p>
    </div>
</template>


<style scoped>
    .todo-edit {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
    .todo-edit textarea {
        resize: vertical;
        max-height: 300px;
        min-height: 100px;
    }
    .todo-edit input, textarea, p, button {
        margin: 5px;
        padding: 5px;
        border-radius: 6px;
    }
    .todo-edit p {
        text-align: center;
    }
    .is-completed-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
    }
    .is-completed-wrapper input {
        margin: 0;
        margin-top: 5px;
    }
    .is-completed-wrapper label {
        margin-right: 5px;
    }
</style>