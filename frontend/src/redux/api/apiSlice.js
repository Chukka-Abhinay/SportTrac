import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../features/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   headers.set("Authorization", `Bearer ${token}`);
    // }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Team", "Match", "User", "Sport"],
  endpoints: () => ({}),
});
