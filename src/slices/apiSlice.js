import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const base_url = 'https://api.themoviedb.org/3'
const api_key = process.env.REACT_APP_API_KEY

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: builder => ({
        getFilms: builder.query({
            query: ({filter, page}) => ({
                url: `/movie/${filter}`,
                params: {api_key, page}
            }),
        }),
        getGenres: builder.query({
            query: () => ({
                url: `/genre/movie/list`,
                params: {api_key}
            })
        }),
        getFilmDetails: builder.query({
            query: (filmId) => ({
                url: `/movie/${filmId}`,
                params: {api_key, append_to_response: 'credits,videos,similar'}
            })
        }),
        search: builder.mutation({
            query: ({query, page}) => ({
                url: '/search/movie',
                params: {api_key, query, page}
            })
        }),
        getFilmCredits: builder.mutation({
            query: (filmId) => ({
                url: `/movie/${filmId}/credits`,
                params: {api_key}
            })
        })
    })
})

export const {
    useGetFilmsQuery,
    useGetGenresQuery,
    useGetFilmDetailsQuery,
    useSearchMutation,
    useGetFilmCreditsMutation
} = apiSlice
