export interface Task {
    id: string;
    title: string;
    description: string;
    highPriority: boolean;
    newStatus: boolean;
}

export type CreateTask = Omit<Task, 'id' >;

export type UpdateTask = Partial<CreateTask>;



export type TasksResponse = Task[];
