import axios from 'axios'
import { responseInterceptor, erroInterceptor } from './interceptors'

const Api = axios.create({
  baseURL: 'http://localhost:3000/'
})

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (Error) => erroInterceptor(Error)
)

export { Api }