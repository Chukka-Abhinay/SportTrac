import { apiSlice } from "./apiSlice";
import { SPORT_URL, UPLOAD_VIDEO_URL } from "../features/constants";

export const sportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSport: builder.mutation({
      query: (newSport) => ({
        url: `${SPORT_URL}`,
        method: "POST",
        body: newSport,
      }),
    }),

    updateSport: builder.mutation({
      query: ({ sportId, updatedSport }) => ({
        url: `${SPORT_URL}/${sportId}`,
        method: "PUT",
        body: updatedSport,
      }),
      invalidatesTags: ["Sport"],
    }),

    deleteSport: builder.mutation({
      query: (sportId) => ({
        url: `${SPORT_URL}/${sportId}`,
        method: "DELETE",
      }),
    }),

    fetchSports: builder.query({
      query: () => `${SPORT_URL}/sports`,
      providesTags: ["Sport"],
      keepUnusedDataFor: 5,
    }),
    uploadVideo: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_VIDEO_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSportMutation,
  useUpdateSportMutation,
  useDeleteSportMutation,
  useFetchSportsQuery,
  useUploadVideoMutation,
} = sportApiSlice;
