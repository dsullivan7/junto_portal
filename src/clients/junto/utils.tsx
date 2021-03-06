import qs from 'querystring'

import config from '../../config'

class JuntoAPIException extends Error {
  error: {
    code: string
    message: string
  }
  constructor(error: { message: string; code: string }) {
    super('Junto api error')
    this.error = error
  }
}

const endpointUrl = (path: string, query?: Record<string, string>) =>
  `${config.tchrVoiceApiUrl}${path}${query ? `?${qs.stringify(query)}` : ''}`

export const fetchApi = (
  path: string,
  method: string,
  token: string,
  query?: Record<string, string>,
  body?: Record<string, unknown>,
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
  const url = endpointUrl(path, query)
  return fetch(url, { headers, method, body: JSON.stringify(body) }).then((response) => {
    if (response.status === 204) {
      return Promise.resolve()
    }

    if (response.ok) {
      return response.json()
    }

    return response.json().then((json) => {
      throw new JuntoAPIException(json)
    })
  })
}
