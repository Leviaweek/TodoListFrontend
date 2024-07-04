<script setup lang="ts">
import Header from './Header.vue';

import { User } from '../models/User';
import TodoList from './TodoList.vue';
import { Todo } from '../models/Todo';

const props = defineProps<{
    user: User | null
    onTodoClick: (todo: Todo) => void
    openModal: () => void
    todos: Todo[]
}>();

const emits = defineEmits<{
    onIsAuthorized: [authorized: boolean];
    onUser: [usr: User | null];
    onTodos: [todos: Todo[]];
}>();

</script>

<template>
    <Header
    @on-user="emits('onUser', $event)"
    @on-is-authorized="emits('onIsAuthorized', $event)"
    :openModal="props.openModal"
    :user="props.user"/>
    <TodoList :on-todo-click="onTodoClick"
    :user="props.user!"
    :todos="todos"/>
</template>


<style scoped>
    
</style>