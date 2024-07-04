<script setup lang="ts">
import { ref, watch } from "vue";
import { User } from "./models/User";
import MainPage from "./components/MainPage.vue";
import Modal from "./components/Modal.vue";
import TodoDescription from "./components/TodoDescription.vue";
import TodoWrapper from "./components/TodoWrapper.vue";
import TodoEdit from "./components/TodoEdit.vue";
import AddTodoForm from "./components/AddTodoForm.vue";
import AuthorizeForm from "./components/AuthorizeForm.vue";
import { Todo } from "./models/Todo";
import { Api } from "./api";
import deepEqual from "deep-equal";
import moment from "moment";

const isAuthorized = ref<boolean>(false);
const user = ref<User | null>(null);

const isOpenEditModal = ref<boolean>(false);
const openEditModal = () => {
  isOpenEditModal.value = true;
};
const isOpenAddModal = ref<boolean>(false);
const openAddModal = () => {
  isOpenAddModal.value = true;
};
const closeAddModal = () => {
  isOpenAddModal.value = false;
};

const currentTodo = ref<Todo | null>(null);

const tempTodo = ref<Todo | null>(currentTodo.value);

const onTodoClick = (todo: Todo) => {
  currentTodo.value = todo;
  tempTodo.value = {...todo};
  openEditModal();
};
const closeEditModal = () => {
  isOpenEditModal.value = false;
  currentTodo.value = null;
  tempTodo.value = null;
  isEditMode.value = false;
};

const todos = ref<Todo[]>([]);

const submitEdit = async () => {
  if (deepEqual(tempTodo.value, currentTodo.value)) {
    console.log("No changes");
    closeEditModal();
    return;
  }
  const result = await Api.updateTodo(tempTodo.value!, user.value!.userId);
  currentTodo.value = result;
  tempTodo.value = result;
  for (let i = 0; i < todos.value.length; i++) {
    if (todos.value[i].id === result.id) {
      todos.value[i] = result;
    }
  }
  closeEditModal();
};

watch(user, async (newUser) => {
  if (newUser !== null) {
    const result = await Api.getAllTodos(newUser.userId);
    todos.value = result;
  }
});

const addTodo = async (title: string, description: string, deadline: string): Promise<boolean> => {
	if (!user.value) {
		alert("You need to login first");
		return false;
	}
	if (!title || !description || !deadline) {
		alert("Please fill all fields");
		return false;
	}
  const deadlineMoment = moment(deadline).utc();
  if (deadlineMoment.isBefore(moment().utc())) {
    alert("Deadline can't be in the past");
    return false;
  }
	const todo: Todo = await Api.addTodo(user.value.userId, title, description, deadlineMoment.toISOString());
	todos.value = [todo, ...todos.value];
  return true;
}

const deleteTodo = async () => {
  const result = await Api.deleteTodo(user.value!.userId, currentTodo.value!.id);
  if (result) {
    todos.value = await Api.getAllTodos(user.value!.userId);
  }
  closeEditModal();
};

const isEditMode = ref<boolean>(false);

</script>

<template>
  <div class="App">
    <Modal v-if="currentTodo" :is-open="isOpenEditModal" :close-on-overlay="false" :close="closeEditModal">
      <TodoWrapper>
        <TodoDescription v-if="!isEditMode" :todo="tempTodo!" />
        <TodoEdit v-else :todo="tempTodo!" 
        @on-todo-click="(todo: Todo) => tempTodo = todo"/>
        <div class="todo-wrapper__buttons">
          <button @click="isEditMode = !isEditMode">✎</button>
          <button v-if="isEditMode" @click="submitEdit">✓</button>
          <button @click="deleteTodo">🗑️</button>
          <button @click="closeEditModal">✕</button>
        </div>
      </TodoWrapper>
    </Modal>
    <Modal :is-open="isOpenAddModal" :close-on-overlay="true" :close="closeAddModal">
      <AddTodoForm :addTodo="addTodo"/>
    </Modal>
    <div v-if="!isAuthorized || user === null" class="AuthorizeForm-wrapper">
      <AuthorizeForm
        @on-is-authorized="(authorized: boolean) => isAuthorized = authorized"
        @on-user="(usr: User) => user = usr"
      />
    </div>
    <div v-else class="MainPage-wrapper">
      <MainPage
        @on-is-authorized="(authorized: boolean) => isAuthorized = authorized"
        @on-user="(usr: User | null) => user = usr"
        :on-todo-click="onTodoClick"
        :user="user"
        :todos="todos"
        :openModal="openAddModal"
      />
    </div>
  </div>
</template>

<style scoped>

  .App{
    height: 100%;
    width: 100%;
  }
  .AuthorizeForm-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  .MainPage-wrapper{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .todo-wrapper button {
    width: 30px;
    height: 30px;
    padding: 5px;
    margin: 5px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
