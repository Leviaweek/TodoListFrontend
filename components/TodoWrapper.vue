<script setup lang="ts">
</script>


<template>
    <div class="todo-wrapper">
        <slot></slot>
    </div>
</template>


<style scoped>
    .todo-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
</style>