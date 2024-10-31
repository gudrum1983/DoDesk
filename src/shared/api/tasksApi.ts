import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CreateTask, Task, TasksResponse} from "../../entities/Task.ts";
import {v4 as uuidv4} from 'uuid';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
  endpoints: (builder) => ({
    getTasks: builder.query<TasksResponse, string>({
      query: (urlParams) => urlParams ? `tasks?${urlParams}` : "tasks",
      providesTags: (result) =>
        result
          ? [
            ...result.map(({id}) => ({type: 'Tasks' as const, id})),
            {type: 'Tasks', id: 'LIST'},
          ]
          : [{type: 'Tasks', id: 'LIST'}],
    }),
    addTask: builder.mutation<Task, CreateTask>({
      query: (newTask) => {

        const {title, description} = newTask
        const id: string = uuidv4()
        const taskWithId = {title, description, id};

        return {
          url: 'tasks',
          method: 'POST',
          body: taskWithId,
        };
      },
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    }),
    updateTask: builder.mutation({
      query: ({id, ...updatedTask}) => ({
        url: `tasks/${id}`,
        method: 'PUT',
        body: updatedTask,
      }),
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    }),
    listTasks: builder.query<TasksResponse, string>({
      query: (limit = "") => `tasks?${limit && `_limit=${limit}`}`,
    }),

  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useListTasksQuery
} = tasksApi;