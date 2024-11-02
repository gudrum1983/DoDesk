export interface Task {
    id: string;
    title: string;
    description: string;
    highPriority: boolean;
    new: boolean;
}

export type CreateTask = Omit<Task, 'id' >;

export type TasksResponse = Task[];
