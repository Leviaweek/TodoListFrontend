<script setup lang="ts">

import { Todo } from "../models/Todo";
import moment from "moment";
import { computed } from "vue";

const props = defineProps<{
    todo: Todo;
}>();
const deadline = computed(() => moment(props.todo.deadline))
const createdAt = computed(() => moment(props.todo.createdAt));
const completedAt = computed(() => moment(props.todo.completedAt));
const fmt = "YYYY/MM/DD HH:mm";
const isOverdue = computed(() => {
    return !props.todo.isCompleted && deadline.value.isBefore(moment());
});
</script>

<template>
    <div class="todo-preview">
        <div class="todo-preview__title">
            <h3 :class="{isCompleted: props.todo.isCompleted, isOverdue: isOverdue}" >{{ props.todo.title }}</h3>
        </div>
        <p>Created at {{ createdAt.format(fmt) }}</p>
        <p>Deadline: {{ deadline.format(fmt) }}</p>
        <p v-if="$props.todo.isCompleted"> Completed At: {{completedAt.format(fmt)}}</p>
    </div>
</template>


<style scoped>
    .todo-preview {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
    .todo-preview__title {
        text-overflow: ellipsis;
    }
    .isCompleted {
        text-decoration: line-through;
    }
    .isOverdue {
        color: rgb(233, 77, 77);
        text-decoration: line-through;
    }
</style>
