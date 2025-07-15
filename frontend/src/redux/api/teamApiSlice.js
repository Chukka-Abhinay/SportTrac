import { TEAM_URL, UPLOAD_URL } from "../features/constants";

import { apiSlice } from "./apiSlice";

export const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: ({ keyword }) => ({
        url: `${TEAM_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Team"],
    }),
    allTeams: builder.query({
      query: () => `${TEAM_URL}/allteams`,
    }),
    getTeamById: builder.query({
      query: (teamId) => `${TEAM_URL}/${teamId}`,
      providesTags: (result, error, teamId) => [{ type: "Team", id: teamId }],
    }),
    createTeam: builder.mutation({
      query: (data) => ({
        url: `${TEAM_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),
    updateTeam: builder.mutation({
      query: ({ teamId, formData }) => ({
        url: `${TEAM_URL}/${teamId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    uploadTeamLogo: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteTeam: builder.mutation({
      query: (teamId) => ({
        url: `${TEAM_URL}/${teamId}`,
        method: "DELETE",
      }),
      providesTags: ["Team"],
    }),
    addPlayer: builder.mutation({
      query: ({ teamId, playerData }) => ({
        url: `${TEAM_URL}/${teamId}/players`,
        method: "POST",
        body: playerData,
      }),
      invalidatesTags: ["Team"],
    }),
    updatePlayer: builder.mutation({
      query: ({ teamId, playerId, playerData }) => ({
        url: `${TEAM_URL}/${teamId}/players/${playerId}`,
        method: "PUT",
        body: playerData,
      }),
      invalidatesTags: ["Team"],
    }),
    deletePlayer: builder.mutation({
      query: ({ teamId, playerId }) => ({
        url: `${TEAM_URL}/${teamId}/players/${playerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useAllTeamsQuery,
  useGetTeamByIdQuery,
  useDeleteTeamMutation,
  useUpdateTeamMutation,
  useCreateTeamMutation,
  useUploadTeamLogoMutation,
  useAddPlayerMutation,
  useDeletePlayerMutation,
  useUpdatePlayerMutation,
} = teamApiSlice;
