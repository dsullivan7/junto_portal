import React, { useState, useEffect } from 'react'

import {
  Flex,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'

import { useAuth0 } from '@auth0/auth0-react'

import * as juntoClient from '../clients/junto'

import Element from './utils/Element'
import Loader from './utils/Loader'
import PlaidLink from './utils/PlaidLink'
import BankTransferForm from './forms/BankTransferForm'

function Account(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false)
  const [userCurrent, setUserCurrent] = useState<User | null>(null)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [plaidToken, setPlaidToken] = useState<string | null>(null)
  const [showTransferForm, setShowTransferForm] = useState<boolean>(false)

  const { user, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const token = await getAccessTokenSilently()

      let userFound
      try {
        userFound = await juntoClient.getUser(token, 'me')
        setUserCurrent(userFound)
      } catch (e) {
        if (e.error.code === 'non_existent' && user && user.sub) {
          userFound = await juntoClient.createUser(token, { auth0_id: user.sub })
          setUserCurrent(userFound)
        }
      }

      if (userFound) {
        const [plaidTokenRes, bankAccountsRes] = await Promise.all([
          juntoClient.createPlaidToken(token, { user_id: userFound.user_id }),
          juntoClient.listBankAccounts(token, { user_id: userFound.user_id }),
        ])

        setPlaidToken(plaidTokenRes.value)
        setBankAccounts(bankAccountsRes)
      }
    }

    fetchData().then(() => setLoading(false))
  }, [])

  async function handlePlaidLinkSuccess(plaidPublicToken: string) {
    setLoading(true)
    const token = await getAccessTokenSilently()

    if (token && userCurrent) {
      const bankAccount = await juntoClient.createBankAccount(token, {
        user_id: userCurrent.user_id,
        plaid_public_token: plaidPublicToken,
      })
      setBankAccounts([bankAccount])
    }

    setLoading(false)
  }

  async function handleBankTransferCreate(data: { amount: string }) {
    const token = await getAccessTokenSilently()

    if (token && userCurrent && bankAccounts.length) {
      console.log('data')
      console.log(data)
      // await juntoClient.createBankTransfer(token, {
      //   user_id: userCurrent.user_id,
      //   plaid_account_id: bankAccounts[0].plaid_account_id,
      //   plaid_access_token: bankAccounts[0].plaid_access_token,
      //   amount: data.amount,
      // })
    }
  }

  if (loading) {
    return (
      <>
        <Flex justify="center">
          <Loader />
        </Flex>
      </>
    )
  }

  return (
    <>
      <Modal isOpen={showTransferForm} onClose={() => setShowTransferForm(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">Deposit</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BankTransferForm onSubmit={handleBankTransferCreate} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Element title="My Account">
        <Text>Welcome to your account page</Text>
        <Text>You have {bankAccounts.length} connected accounts</Text>
        <PlaidLink title="Link bank account" token={plaidToken} onSuccess={handlePlaidLinkSuccess} />
        <Button onClick={() => setShowTransferForm(true)}>Make bank transfer</Button>
      </Element>
    </>
  )
}

export default Account