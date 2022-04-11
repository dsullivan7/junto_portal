import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../../components/App'

test('renders Tcher Voice brand', () => {
  render(<App />)
  const linkElement = screen.getByText(/Tcher Voice/i)
  expect(linkElement).toBeInTheDocument()
})
