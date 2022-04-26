import { fetchApi } from './utils'

const ordersPath = '/orders'

export const listOrders = (token: string, query?: { user_id?: string }): Promise<Order[]> =>
  fetchApi(ordersPath, 'GET', token, query)

export const getOrder = (token: string, orderId: string): Promise<Order | undefined> =>
  fetchApi(`${ordersPath}/${orderId}`, 'GET', token)

export const createOrder = (
  token: string,
  payload: {
    user_id: string
    amount: number
    side: string
  },
): Promise<Order> => fetchApi(ordersPath, 'POST', token, {}, payload)

export const modifyOrder = (token: string, orderId: string, payload: { user_id: string }): Promise<Order> =>
  fetchApi(`${ordersPath}/${orderId}`, 'PUT', token, {}, payload)

export const deleteOrder = (token: string, orderId: string): Promise<Order | undefined> =>
  fetchApi(`${ordersPath}/${orderId}`, 'DELETE', token)
