import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Project, Task, SearchResults, User, Team } from "@/types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  endpoints: (build) => ({
    // Projects
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"]
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project
      }),
      invalidatesTags: ["Projects"]
    }),

    // Tasks
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }]
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task
      }),
      invalidatesTags: ["Tasks"]
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number, status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status }
      }),
      invalidatesTags: (_, __, { taskId }) => [
        { type: "Tasks", id: taskId }
      ]
    }),

    // Searchs
    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`
    }),

    // Users
    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"]
    }),

    // Teams
    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"]
    }),
  })
});

export const {
  // Projects
  useGetProjectsQuery,
  useCreateProjectMutation,

  //Tasks
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,

  // Searchs
  useSearchQuery,

  // Users
  useGetUsersQuery,

  // Teams
  useGetTeamsQuery
} = api;
