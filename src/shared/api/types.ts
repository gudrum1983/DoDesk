export interface Types {
    id: string;
    title: string;
    description: string;
    highPriority: boolean;
    newStatus: boolean;
}

export type CreateTask = Omit<Types, 'id' >;

export type UpdateTask = Partial<CreateTask>;

export type TasksResponse = Types[];
