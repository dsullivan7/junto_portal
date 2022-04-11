import React, { useCallback } from 'react'
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from 'react-plaid-link'
import { Button } from '@chakra-ui/react'

interface Props {
  title: string | null
  token: string | null
  onSuccess: (publicToken: string) => void
}

function PlaidLink({ title, token, onSuccess }: Props): React.ReactElement {
  const onSuccessCallback = useCallback<PlaidLinkOnSuccess>(onSuccess, [])

  if (token === null) {
    return <></>
  }

  const config: PlaidLinkOptions = {
    token,
    onSuccess: onSuccessCallback,
  }

  const { open, ready } = usePlaidLink(config)

  return (
    <Button onClick={() => open()} disabled={!ready}>
      {title || 'Connect a bank account'}
    </Button>
  )
}

export default PlaidLink
