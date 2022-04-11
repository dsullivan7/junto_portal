import { fetchApi } from './utils'

const plaidTokenPath = '/plaid/token'

export const createPlaidToken = (token: string, payload: { user_id: string }): Promise<{ value: string }> =>
  fetchApi(plaidTokenPath, 'POST', token, {}, payload)
