import React from 'react'

import { Switch, Redirect } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'

import { useAuth0 } from '@auth0/auth0-react'

import Navbar from './utils/Navbar'
import Account from './Account'
import LogoutButton from './LogoutButton'
import { ConfirmationProvider } from './utils/ConfirmationProvider'
import ProtectedRoute from '../auth/ProtectedRoute'

import logo from '../images/star_brand.png'

function App(): React.ReactElement {
  const { isAuthenticated } = useAuth0()
  return (
    <>
      <ConfirmationProvider>
        <Flex w="100%" direction="column">
          <Navbar title={'Junto'} rightComponent={isAuthenticated ? <LogoutButton /> : null} />
          <Flex py={5} justify="center">
            <Switch>
              <ProtectedRoute path="/account" component={Account} />
              <Redirect to="/account" />
            </Switch>
          </Flex>
        </Flex>
      </ConfirmationProvider>
    </>
  )
}

export default App
