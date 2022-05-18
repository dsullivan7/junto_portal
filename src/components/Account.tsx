import React, { useState, useEffect } from 'react'

import {
  Flex,
  Button,
  Text,
  Box,
  Spacer,
  Progress,
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
  const [accountLoading, setAccountLoading] = useState<boolean>(false)
  const [userCurrent, setUserCurrent] = useState<User | null>(null)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [balances, setBalances] = useState<Balances | null>(null)
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
        if (e.error.code === 'not_found' && user && user.sub) {
          userFound = await juntoClient.createUser(token, { auth0_id: user.sub })
          setUserCurrent(userFound)
        }
      }

      if (userFound) {
        const [plaidTokenRes, bankAccountsRes, balancesRes] = await Promise.all([
          juntoClient.createPlaidToken(token, { user_id: userFound.user_id }),
          juntoClient.listBankAccounts(token, { user_id: userFound.user_id }),
          juntoClient.getBalances(token, userFound.user_id),
        ])

        setPlaidToken(plaidTokenRes.value)
        setBankAccounts(bankAccountsRes)
        setBalances(balancesRes)
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

  async function handleBankTransferCreate(data: { amount: number }) {
    setShowTransferForm(false)
    setAccountLoading(true)
    const token = await getAccessTokenSilently()
    if (token && userCurrent && bankAccounts.length) {
      await juntoClient.createBankTransfer(token, {
        bank_account_id: bankAccounts[0].bank_account_id,
        amount: data.amount * 100,
      })
      await juntoClient.createOrder(token, {
        user_id: userCurrent.user_id,
        amount: data.amount * 100,
        side: 'buy',
      })

      const balancesRes = await juntoClient.getBalances(token, userCurrent.user_id)
      setBalances(balancesRes)
    }
    setAccountLoading(false)
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

  let bankAccountsComponent

  if (bankAccounts.length) {
    bankAccountsComponent = (
      <Box width="30%">
        <Flex py={3} px={20} borderRadius={5} boxShadow="md" direction="column" align="center">
          <Text color="gray.500">Linked account</Text>
          <Text fontSize="4xl">{bankAccounts[0].name}</Text>
        </Flex>
        <Box py={3}>
          <Button onClick={() => setShowTransferForm(true)}>Transfer funds</Button>
        </Box>
      </Box>
    )
  } else {
    bankAccountsComponent = (
      <Box py={3}>
        <PlaidLink title="Link bank account" token={plaidToken} onSuccess={handlePlaidLinkSuccess} />
      </Box>
    )
  }

  const accountComponent = (
    <Flex
      borderRadius={5}
      p={3}
      boxShadow="md"
      direction="column"
      align="center"
      justify="center"
      width="40%"
      backgroundColor="brand.primary.500"
    >
      <Text color="white" borderBottomWidth={3} borderBottomColor="brand.secondary.300">
        Account balance
      </Text>
      {accountLoading ? (
        <Box p={6} width="100%">
          <Progress size="xs" colorScheme="brand.primary" isIndeterminate />
        </Box>
      ) : (
        <>
          <Box>
            <Text py={2} color="white" fontSize="4xl">
              {balances ? `$${(balances.total / 100).toFixed(2)}` : '$0.00'}
            </Text>
          </Box>
          <Flex width="100%" py={5}>
            <Spacer />
            <Box align="center">
              <Text fontSize="sm" color="white">
                Total invested
              </Text>
              <Text color="white" fontSize="lg">
                {balances ? `$${(balances.principal / 100).toFixed(2)}` : '$0.00'}
              </Text>
            </Box>
            <Spacer />
            <Box align="center">
              <Text fontSize="sm" color="white">
                Current return
              </Text>
              <Text color="white" fontSize="md">
                {balances ? `$${(balances.interest / 100).toFixed(2)}` : '$0.00'}
              </Text>
            </Box>
            <Spacer />
          </Flex>
        </>
      )}
    </Flex>
  )

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
      <Element title="Overview">
        <Flex>
          {bankAccountsComponent}
          <Spacer />
          {accountComponent}
        </Flex>
      </Element>
    </>
  )
}

export default Account
