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

const updateMeApi = async (userInfos, userId, jwt) => {
  const response = await axiosInstance.put(`/users/${userId}`, userInfos, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  console.log(response?.data)
  return response?.data
}

export { loginApi, registerApi, updateMeApi }
