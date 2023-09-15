import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies, mapMovies } from '../services/movies.js'
import mainMovies from '../data/main-movies.json'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  

  const [, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === '' | !search) {
      const mappedMovies = mapMovies(mainMovies.movies)
      setMovies(mappedMovies)
      return
    }
    if (search === previousSearch.current) return
    // search es ''

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      // tanto en el try como en el catch
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}