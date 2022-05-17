import { fetchApi } from './utils'

const bankTransfersPath = '/bank-transfers'

export const listBankTransfers = (token: string, query?: { bank_account_id?: string }): Promise<BankTransfer[]> =>
  fetchApi(bankTransfersPath, 'GET', token, query)

export const getBankTransfer = (token: string, bankTransferId: string): Promise<BankTransfer | undefined> =>
  fetchApi(`${bankTransfersPath}/${bankTransferId}`, 'GET', token)

export const createBankTransfer = (
  token: string,
  payload: {
    bank_account_id: string
    amount: number
  },
): Promise<BankTransfer> => fetchApi(bankTransfersPath, 'POST', token, undefined, payload)

export const modifyBankTransfer = (
  token: string,
  bankTransferId: string,
  payload: { bank_account_id: string },
): Promise<BankTransfer> => fetchApi(`${bankTransfersPath}/${bankTransferId}`, 'PUT', token, undefined, payload)

export const deleteBankTransfer = (token: string, bankTransferId: string): Promise<BankTransfer | undefined> =>
  fetchApi(`${bankTransfersPath}/${bankTransferId}`, 'DELETE', token)
