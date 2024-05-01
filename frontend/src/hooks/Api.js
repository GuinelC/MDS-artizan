import { useEffect, useState } from 'react'
// import axios from 'axios'

const useFetch = (url) => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const _response = await fetch(url)
      const _responseJSON = await _response.json()
      setResponse(_responseJSON.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setError(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return { response, error, isLoading }
}

export {
  useFetch
}
