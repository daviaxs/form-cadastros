import axios from 'axios'
import { Environments } from '../../../environments'
import { responseInterceptor, erroInterceptor } from './interceptors'

const Api = axios.create({
  baseURL: Environments.URL_BASE
})

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (Error) => erroInterceptor(Error)
)

export { Api }