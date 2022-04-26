import { fetchApi } from './utils'

const usersPath = '/users'
const balancesPath = '/balances'

export const getBalances = (token: string, userId: string): Promise<Balances | undefined> =>
  fetchApi(`${usersPath}/${userId}${balancesPath}`, 'GET', token)
