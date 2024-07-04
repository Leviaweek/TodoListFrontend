<script setup lang="ts">

import { ref } from 'vue';

const title = ref('');
const description = ref('');
const deadline = ref('');

const props = defineProps<{
    addTodo: (title: string, description: string, deadline: string) => Promise<boolean>;
}>();

const clearFields = () => {
    title.value = '';
    description.value = '';
    deadline.value = '';
}

const onClick = async () => {
    const result = await props.addTodo(title.value, description.value, deadline.value);
    if (result) {
        clearFields();
    }
}

</script>

<template>
    <div class="add-todo-form">
        <input type="text" placeholder="Title" v-model="title" />
        <textarea placeholder="Description" v-model="description" />
        <input type="datetime-local" v-model="deadline" />
        <button @click="onClick">Add</button>
    </div>
</template>

<style scoped>
    .add-todo-form{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }

    .add-todo-form input, textarea, p, button {
        margin: 5px;
        padding: 5px;
        border-radius: 6px;
    }
    .add-todo-form textarea {
        resize: vertical;
        max-height: 300px;
        min-height: 100px;
    }
    .add-todo-form p{
        text-align: center;
    }
</style>