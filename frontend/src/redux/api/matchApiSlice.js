import { MATCH_URL } from "../features/constants";
import { apiSlice } from "./apiSlice";

export const matchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMatch: builder.mutation({
      query: (data) => ({
        url: `${MATCH_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Match"],
    }),
    getAllMatches: builder.query({
      query: () => `${MATCH_URL}`,
    }),
    getMatchById: builder.query({
      query: (matchId) => `${MATCH_URL}/${matchId}`,
    }),
    updateMatchById: builder.mutation({
      query: ({ matchId, data }) => ({
        url: `${MATCH_URL}/${matchId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Match"],
    }),
    deleteMatchById: builder.mutation({
      query: (matchId) => ({
        url: `${MATCH_URL}/${matchId}`,
        method: "DELETE",
      }),
      providesTags: ["Match"],
    }),
  }),
});

export const {
  useCreateMatchMutation,
  useGetAllMatchesQuery,
  useGetMatchByIdQuery,
  useUpdateMatchByIdMutation,
  useDeleteMatchByIdMutation,
} = matchApiSlice;
