import { fetchApi } from './utils'

const bankTransfersPath = '/bank-transfers'

export const listBankTransfers = (token: string, query?: { user_id?: string }): Promise<BankTransfer[]> =>
  fetchApi(bankTransfersPath, 'GET', token, query)

export const getBankTransfer = (token: string, bankTransferId: string): Promise<BankTransfer | undefined> =>
  fetchApi(`${bankTransfersPath}/${bankTransferId}`, 'GET', token)

export const createBankTransfer = (
  token: string,
  payload: {
    user_id: string
    amount: number
    plaid_account_id: string
    plaid_access_token: string
    plaid_originiation_account_id?: string
  },
): Promise<BankTransfer> => fetchApi(bankTransfersPath, 'POST', token, {}, payload)

export const modifyBankTransfer = (
  token: string,
  bankTransferId: string,
  payload: { user_id: string },
): Promise<BankTransfer> => fetchApi(`${bankTransfersPath}/${bankTransferId}`, 'PUT', token, {}, payload)

export const deleteBankTransfer = (token: string, bankTransferId: string): Promise<BankTransfer | undefined> =>
  fetchApi(`${bankTransfersPath}/${bankTransferId}`, 'DELETE', token)
