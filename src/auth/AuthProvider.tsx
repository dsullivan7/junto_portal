import React from 'react'
import { useHistory } from 'react-router-dom'
import { Auth0Provider, AppState, Auth0ProviderOptions } from '@auth0/auth0-react'

function Auth0ProviderWithHistory({
  domain,
  clientId,
  audience,
  redirectUri,
  children,
}: Auth0ProviderOptions): React.ReactElement {
  const history = useHistory()

  const onRedirectCallback = (appState?: AppState) => {
    history.push(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      screen_hint="signup"
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory
