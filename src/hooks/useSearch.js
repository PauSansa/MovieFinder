import { useEffect, useState, useRef } from "react"

export function useSearch () {
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)
  
    useEffect(() => {
      if(isFirstInput.current) {
        isFirstInput.current = search === ''
        return
      }

      if (search === '') return
  
      if (search.match(/^\d+$/)) {
        setError('No se puede buscar una película con un número')
      }
  
      if (search.length < 3) {
        setError('La búsqueda debe tener más de 3 caracteres')
        return
      }
  
      setError(null)
    }, [search])
  
    return {search, updateSearch, error}
    
  }