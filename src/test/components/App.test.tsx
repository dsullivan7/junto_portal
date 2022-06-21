import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../../components/App'

test('renders Junto brand', () => {
  render(<App />)
  const linkElement = screen.getByText(/Junto/i)
  expect(linkElement).toBeInTheDocument()
})
