import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Project } from "@/types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  reducerPath: "api",
  tagTypes: ["Projects"],
  endpoints: (build) => ({
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
    })
  })
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation
} = api;
