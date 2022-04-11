import React from 'react'
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import Loader from '../components/utils/Loader'

function ProtectedRoute({ component, ...props }: RouteProps): React.ReactElement {
  return (
    <Route
      component={withAuthenticationRequired(component as React.ComponentType<RouteComponentProps>, {
        onRedirecting: function Loading() {
          return <Loader />
        },
      })}
      {...props}
    />
  )
}

export default ProtectedRoute
