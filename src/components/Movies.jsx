
function ListOfMovies({ movies }) {
    return (
    <ul className="movies">
        {movies.map(movie => (
            <li className="movie" key={movie.id}>
                <h3>{movie.title}</h3>
                <h4>{movie.year}</h4>
                <img src={movie.poster} alt={movie.title} />
            </li>
            ))
        }
    </ul>
      )
 }

function NoMoviesResults() {
    return (
    <p>No se encontraron peliculas</p>
    )
 }

 export function Movies({ movies }) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies 
        ? <ListOfMovies movies={movies} />
        : <NoMoviesResults />
    )
 }