import { fetchApi } from './utils'

const usersPath = '/users'

export const listUsers = (token: string, query?: { user_id?: string }): Promise<User[]> =>
  fetchApi(usersPath, 'GET', token, query)

export const getUser = (token: string, userId: string): Promise<User> =>
  fetchApi(`${usersPath}/${userId}`, 'GET', token)

export const createUser = (
  token: string,
  payload: { first_name?: string; last_name?: string; email?: string; auth0_id: string },
): Promise<User> => fetchApi(usersPath, 'POST', token, {}, payload)

export const modifyUser = (token: string, userId: string, payload: { user_id: string }): Promise<User> =>
  fetchApi(`${usersPath}/${userId}`, 'PUT', token, {}, payload)

export const deleteUser = (token: string, userId: string): Promise<void> =>
  fetchApi(`${usersPath}/${userId}`, 'DELETE', token)
