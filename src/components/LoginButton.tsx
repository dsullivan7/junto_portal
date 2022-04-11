import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { Button } from '@chakra-ui/react'

function LoginButton(): React.ReactElement {
  const { loginWithRedirect } = useAuth0()

  return <Button onClick={() => loginWithRedirect()}>Create Account - Log In</Button>
}

export default LoginButton
