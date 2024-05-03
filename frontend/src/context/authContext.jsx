// Votre fichier authContext.js

import { createContext, useReducer, useContext, useEffect } from 'react'
import { loginApi, registerApi, updateUserApi } from '../services/Api'
import { toast } from 'react-toastify'

const AuthContext = createContext()

const actionTypes = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  RESET: 'RESET',
  UPDATE_USER: 'UPDATE_USER'
}

const initialState = {
  jwt: null,
  user: null,
  loading: false,
  isLoggedIn: false,
  error: null
}

const authReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
    case actionTypes.LOGIN:
      return {
        jwt: action.data.jwt,
        user: action.data.user,
        loading: false,
        isLoggedIn: true,
        error: null
      }
    case actionTypes.ERROR:
      return {
        jwt: null,
        user: null,
        loading: false,
        isLoggedIn: false,
        error: action.data.error
      }
    case actionTypes.LOADING:
      return {
        ...prevState,
        loading: true
      }
    case actionTypes.UPDATE_USER:
      return {
        ...prevState,
        user: {
          ...prevState.user,
          ...action.data // Met à jour les informations de l'utilisateur avec celles fournies
        }
      }
    case actionTypes.RESET:
    case actionTypes.LOGOUT:
      return initialState
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const authFactory = (dispatch) => ({
  login: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await loginApi(credentials)
      dispatch({
        type: actionTypes.LOGIN,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      toast.error('Identitfiant ou mot de passe incorrect')
      console.error(error)
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: 'Identitfiant ou mot de passe incorrect'
        }
      })
    }
  },
  register: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await registerApi(credentials)
      dispatch({
        type: actionTypes.REGISTER,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Identfiant ou mot de passe incorrect')
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: 'Identifiant ou mot de passe incorrect'
        }
      })
    }
  },
  updateUserInfo: async (userInfo, userId, jwt) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      // Appelez updateUserApi avec les paramètres appropriés
      const updatedUser = await updateUserApi(userInfo, userId, jwt)

      // Mettez à jour l'utilisateur dans le state avec les données mises à jour
      dispatch({
        type: actionTypes.UPDATE_USER,
        data: updatedUser
      })

      // Affichez une notification de succès
      toast.success('Vos informations ont été mises à jour avec succès.')
    } catch (error) {
      // En cas d'erreur, affichez une notification d'erreur
      const errorMessage = error?.response?.data?.error?.message || 'Une erreur s\'est produite lors de la mise à jour de vos informations.'
      toast.error(errorMessage)

      // Dispatchez l'erreur pour la gérer dans le state
      dispatch({
        type: actionTypes.ERROR,
        data: { error: errorMessage }
      })
    }
  },
  logout: () => {
    dispatch({ type: actionTypes.LOGOUT })
  },
  dispatch // Ajout de dispatch dans l'objet retourné par authFactory
})

const AuthProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState

  const [state, dispatch] = useReducer(authReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, ...authFactory(dispatch) }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an <AuthProvider>')
  return context
}

export { AuthProvider, useAuth }
