<script setup lang="ts">
import { ref } from "vue";
import { Api } from "../api";
import { UserDto } from "../dtos/UserDto";
import { User } from "../models/User";

const state = ref<"Login" | "Register">("Login");
const repeatPassword = ref<string>("");
const userDto = ref<UserDto>({
  login: "",
  password: "",
  name: "",
});
const errorMessage = ref<string | null>(null);

const emit = defineEmits<{
  onIsAuthorized: [authorized: boolean];
  onUser: [usr: User];
}>();

const loginSumbit = async (e: Event) => {
  e.preventDefault();
  const resultUser = await Api.login(userDto.value);
  if (typeof resultUser === "object") {
    emit("onIsAuthorized", true);
    emit("onUser", resultUser);
    
    errorMessage.value = null;
    return;
  }
  if ((resultUser as string) !== undefined) {
    errorMessage.value = resultUser as string;
  }
};

const registerSumbit = async (e: Event) => {
  e.preventDefault();
  if (userDto.value.password !== repeatPassword.value) {
    errorMessage.value = "Passwords do not match";
    return;
  }
  const resultUser = await Api.createUser(userDto.value);
  if (typeof resultUser === "object") {
    emit("onIsAuthorized", true);
    emit("onUser", resultUser as User);
    errorMessage.value = null;
    return;
  }
  if ((resultUser as string) !== undefined) {
    errorMessage.value = resultUser as string;
  }
};
</script>

<template>
  <div class="authorize-form">
    <div class="switch">
      <div class="state left">
        <button @click="state = 'Login'">Login</button>
      </div>
      <div class="state right">
        <button @click="state = 'Register'">Register</button>
      </div>
    </div>
    <div v-if="state === 'Login'" class="authorize-form__inner">
      <form @submit="loginSumbit" class="login-form">
        <input required type="text" placeholder="Login" v-model="userDto.login" />
        <input
          required
          type="password"
          placeholder="Password"
          v-model="userDto.password"
        />
        <button type="submit" class="submit-button">Authorize</button>
      </form>
    </div>
    <div v-else class="authorize-form__inner">
      <form @submit="registerSumbit" class="register-form">
        <input required type="text" placeholder="Name" v-model="userDto.name" />
        <input required type="text" placeholder="Login" v-model="userDto.login" />
        <input
          required
          type="password"
          placeholder="Password"
          v-model="userDto.password"
        />
        <input
          required
          type="password"
          placeholder="Repeat password"
          v-model="repeatPassword"
        />
        <button type="submit" class="submit-button">Register</button>
      </form>
    </div>
    <div class="error-message" :class="{ show: errorMessage }">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.switch {
  display: flex;
  justify-content: center;
}
.switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.state {
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 100%;
}

.state button{
  width: 100%;
  height: 100%;
}

.right{
  padding-right: 0px;
}
.left{
  padding-left: 0px;
}

.login-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.register-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.error-message{
  opacity: 0;
  height: 24px;
}

.show {
  opacity: 1;
}

.authorize-form input{
  height: 100%;
  width: 250px;
  padding: 10px;
  padding-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.authorize-form input:focus{
  background-color: #ffffff;
  border-color: #0969da;
  transition: 0.3s;
}

.authorize-form button{
  font-weight: 500;
  font-size: 0.875rem;
}

.submit-button{
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%
}

</style>
