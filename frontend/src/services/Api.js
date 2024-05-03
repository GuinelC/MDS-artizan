import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

/**
 *
 * @param {object} credential { identifier, password}
 * @return {object} { jwt,user }
 */
const loginApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local', credentials)
  return response?.data
}

const registerApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local/register', credentials)
  return response?.data
}

const updateUserApi = async (userInfo, userId, jwt) => {
  const response = await axiosInstance.put(`/users/${userId}`, userInfo, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'

    }
  })
  return response.data
}

const deleteUserApi = async (userId, jwt) => {
  const response = await axiosInstance.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  return response.data
}

export { loginApi, registerApi, updateUserApi, deleteUserApi }
