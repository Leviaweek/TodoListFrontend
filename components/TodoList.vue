<script setup lang="ts">

import { Todo } from "../models/Todo";
import { User } from "../models/User"
import TodoPreview from "./TodoPreview.vue";

const props = defineProps<{
    user: User;
    onTodoClick: (todo: Todo) => void;
    todos: Todo[];
}>();


</script>


<template>
    <div class="todo-list">
        <div class="todo-list__body">
            <div v-for="todo in props.todos" :key="todo.id" class="todo-list__item">
                <TodoPreview @click="() => props.onTodoClick(todo)" :todo="todo" />
            </div>
        </div>
    </div>
</template>


<style scoped>
    .todo-list{
        padding: 75px;
        overflow: scroll;
    }
    .todo-list__body{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        grid-auto-rows: 1fr;
    }
    .todo-list__item{
        display: flex;
        margin: 5px;
        padding: 5px;
    }
    .todo-list__item:hover{
        box-shadow: 0 0 3px #0969da;
        border-radius: 6px;
        cursor: pointer;
    }
</style>