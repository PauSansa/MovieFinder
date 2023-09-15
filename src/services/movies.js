const API_KEY = '18d86288'

export function mapMovies (movies) {
    return movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }))

}

export const searchMovies = async ({search}) => {
    if(search === '') return null

    search = encodeURIComponent(search)
    const uri = `https://omdbapi.com/?apikey=${API_KEY}&s=${search}`

    try {
        const response = await fetch(uri)
        const json = await response.json()

        const movies = json.Search
        return mapMovies(movies)
        
    } catch (e) {
        throw new Error('Error Searching Movies')
    }

    
    
}