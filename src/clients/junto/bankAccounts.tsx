import { fetchApi } from './utils'

const bankAccountsPath = '/bank-accounts'

export const listBankAccounts = (token: string, query?: { user_id?: string }): Promise<BankAccount[]> =>
  fetchApi(bankAccountsPath, 'GET', token, query)

export const getBankAccount = (token: string, bankAccountId: string): Promise<BankAccount | undefined> =>
  fetchApi(`${bankAccountsPath}/${bankAccountId}`, 'GET', token)

export const createBankAccount = (
  token: string,
  payload: {
    user_id: string
    plaid_public_token: string
  },
): Promise<BankAccount> => fetchApi(bankAccountsPath, 'POST', token, {}, payload)

export const modifyBankAccount = (
  token: string,
  bankAccountId: string,
  payload: { user_id: string },
): Promise<BankAccount> => fetchApi(`${bankAccountsPath}/${bankAccountId}`, 'PUT', token, {}, payload)

export const deleteBankAccount = (token: string, bankAccountId: string): Promise<BankAccount | undefined> =>
  fetchApi(`${bankAccountsPath}/${bankAccountId}`, 'DELETE', token)
