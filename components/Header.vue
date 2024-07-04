<script setup lang="ts">

import { User } from '../models/User';

const emit = defineEmits<{
  onIsAuthorized: [authorized: boolean];
  onUser: [usr: User | null];
}>();

const props = defineProps<{
	user: User | null
	openModal: () => void
}>();

const logout = () => {
	emit("onIsAuthorized", false);
	emit("onUser", null);
}

</script>


<template>

<div class="Header">
	<div class="Header__add-todo">
		<button @click="openModal">Add Todo</button>
	</div>
	<div class="Header__auth">
		<div class="Header__auth-user">{{ props.user?.name }}</div>
		<div class="Header__auth-logout" @click="logout">Logout</div>
	</div>
</div>

</template>


<style scoped>

.Header {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 1rem;
	gap: 12px;
	background-color: #f6f8fa;
	box-shadow: 0 0 1px rgba(0, 0, 0, 1)
}
.Header__auth-user {
	font-weight: 600;
}

.Header__auth {
	display: flex;
	align-items: center;
	padding-right: 10px;
	padding-left: 10px;
}

.Header__auth-logout {
	cursor: pointer;
	padding-right: 10px;
	padding-left: 10px;
}

.Header__auth-logout:hover {
	text-decoration: underline;
}

</style>