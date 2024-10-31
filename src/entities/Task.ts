export interface Task {
    id: string;
    title: string;
    description: string;
}

export type CreateTask = Omit<Task, 'id' >;

export type TasksResponse = Task[];

export interface ListResponse<T> {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: T[]
}