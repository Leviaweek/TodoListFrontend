import { UserDto } from "./dtos/UserDto";
import { Todo } from "./models/Todo";
import { User } from "./models/User";
import { AddTodoDto } from "./dtos/AddTodoDto";

const Api = {
    baseUrl : import.meta.env.VITE_API_URL,
    getTodo : async () => {
        const response = await fetch(`${Api.baseUrl}/todos`);
        return await response.json();
    },
    getAllTodos: async (userId: string): Promise<Todo[]> => {
        const response = await fetch(`${Api.baseUrl}/todos/all?userId=${userId}`);
        return await response.json();
    },
    addTodo: async (userId: string, title: string, description: string, deadline: string): Promise<Todo> => {
        const addTodoDto: AddTodoDto = {
            title: title,
            description: description,
            deadline: deadline,
        };
        const response = await fetch(`${Api.baseUrl}/todos?userId=${userId}`, {
            method: 'POST',
            body: JSON.stringify(addTodoDto),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const todoResponse: TodoResponse = await response.json();
        return todoResponse.todo;
    },
    updateTodo: async (todo: Todo, userId: string): Promise<Todo> => {
        const response = await fetch(`${Api.baseUrl}/todos/${todo.id}?userId=${userId}`, {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseJson: TodoResponse = await response.json();
        return responseJson.todo;
    },
    deleteTodo: async (userId: string, todoId: string): Promise<boolean> => {
        const response = await fetch(`${Api.baseUrl}/todos/${todoId}?userId=${userId}`, {
            method: 'DELETE',
        });
        const responseJson: DeleteTodoResponse = await response.json();
        return responseJson.isDeleted;
    },
    createUser: async (user: UserDto): Promise<User | string> => {
        const response = await fetch(`${Api.baseUrl}/users/web`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 404) {
            return 'User already exists';
        }
        const responseJson: LoginResponse = await response.json();
        return responseJson.user;
    },
    login: async (user: UserDto): Promise<User | string> => {
        const response = await fetch(`${Api.baseUrl}/users/web/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 404) {
            return 'Incorrect user or password';
        }
        const responseJson: LoginResponse = await response.json();
        return responseJson.user;
    }
} as const;

export { Api };

type LoginResponse = {
    user: User;
};

type TodoResponse = {
    todo: Todo;
}

type DeleteTodoResponse = {
    isDeleted: boolean;
};