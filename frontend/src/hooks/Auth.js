import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

const useLogin = () => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async ({ identifier, password }) => {
    try {
      setIsLoading(true)
      const _response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }

      })
      const _responseJSON = await _response.json()
      if (_response.ok) {
        if (_responseJSON) {
          window.localStorage.setItem('AUTH', JSON.stringify(_responseJSON))
        }
        setResponse(_responseJSON)
      } else {
        setError(_responseJSON?.error?.message)
        toast.error(_responseJSON?.error?.message)
      }
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setError(error)
      setIsLoading(false)
    }
  }, [])

  return { response, error, isLoading, login }
}

export { useLogin }
