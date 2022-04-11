import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'

import { useAuth0 } from '@auth0/auth0-react'

import Navbar from './utils/Navbar'
import Account from './Account'
import LogoutButton from './LogoutButton'
import LoginButton from './LoginButton'
import Loader from './utils/Loader'
import { ConfirmationProvider } from './utils/ConfirmationProvider'
import ProtectedRoute from '../auth/ProtectedRoute'

import logo from '../images/star_brand.png'

function App(): React.ReactElement {
  const { isAuthenticated, isLoading } = useAuth0()
  return (
    <>
      <ConfirmationProvider>
        <Flex w="100%" direction="column">
          <Navbar title={'Junto'} rightComponent={isAuthenticated ? <LogoutButton /> : null} />
          <Flex py={5} justify="center">
            <Switch>
              <Route path="/" exact>
                {isLoading ? <Loader /> : isAuthenticated ? <Redirect to="/account" /> : <LoginButton />}
              </Route>
              <ProtectedRoute path="/account" component={Account} />
              <Redirect to="/" />
            </Switch>
          </Flex>
        </Flex>
      </ConfirmationProvider>
    </>
  )
}

export default App
