type Todo = {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    deadline: string;
    createdAt: string;
    completedAt: string | null;
};

export type { Todo };