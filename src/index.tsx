import React from 'react'
import ReactDOM from 'react-dom'

import '@fontsource/roboto/900.css'

import { BrowserRouter as Router } from 'react-router-dom'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import config from './config'
import App from './components/App'
import Auth0Provider from './auth/AuthProvider'
import reportWebVitals from './reportWebVitals'

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'gray.700',
        lineHeight: 1.25,
      },
    },
  },
  fonts: {
    body: 'Roboto',
  },
  colors: {
    brand: {
      primary: {
        100: '#99d6ff',
        200: '#4db8ff',
        300: '#0099ff',
        400: '#006bb3',
        500: '#003d66',
        600: '#001f33',
      },
      secondary: {
        100: '#edf6f8',
        200: '#c8e5ea',
        300: '#a3d3db',
        400: '#7ec1cd',
        500: '#37a8b8',
        600: '#47a7b8',
      },
      danger: {
        500: '#F56565',
        600: '#E53E3E',
      },
    },
  },
  components: { Button: { baseStyle: { _focus: { boxShadow: 'none' } } } },
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
        domain={config.auth0Domain}
        clientId={config.auth0ClientId}
        audience={config.auth0Audience}
        redirectUri={window.location.origin}
      >
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Auth0Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
