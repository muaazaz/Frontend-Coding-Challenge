import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const filmApi = createApi({
  reducerPath: "filmApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  }),
  endpoints: (builder) => ({
    getFilms: builder.mutation({
      query() {
        const query = `
          {
            allFilms {
              films {
                title
              }
            }
          }
          `;
        return {
          method: "POST",
          body: { query },
        };
      },
    }),
  }),
});

export const { useGetFilmsMutation } = filmApi;
