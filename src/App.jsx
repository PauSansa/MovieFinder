import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { Loading } from './components/Loading'
import { useCallback, useEffect } from 'react'
import debounce from 'just-debounce-it'

function App() {
  const {search, updateSearch, error} = useSearch()
  const { movies, getMovies, loading } = useMovies({search})

  useEffect(() => {
    getMovies({search})
  },[])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 500)
    , [getMovies]
  )
  

  return (
    <div className='page'>

      <header>
        <h1 className='title'>Sansa's Movie Finder</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input value={search} onChange={handleChange} name='search' placeholder='Shutter Island, Inception, The Dark Knight' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {loading ? <Loading /> : <Movies movies={movies} /> }
      </main>

    </div>
  )
}

export default App
