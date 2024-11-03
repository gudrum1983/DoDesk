import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CreateTask, Types, TasksResponse, UpdateTask} from "./types.ts";
import {v4 as uuidv4} from 'uuid';

const defaultBaseUrl = 'https://render-json-db-toso.onrender.com/';
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL || defaultBaseUrl;


export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
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
    getTask: builder.query<Types, string>({
      query: (id) => `tasks/${id}`,
    }),
    addTask: builder.mutation<Types, CreateTask>({
      query: (newTask) => {
        const id: string = uuidv4()
        const taskWithId = {...newTask, id};

        return {
          url: 'tasks',
          method: 'POST',
          body: taskWithId,
        };
      },
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    }),
    updateTask: builder.mutation<Types, { id: string } & UpdateTask>({
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
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useGetTaskQuery,
  useDeleteTaskMutation,
} = tasksApi;