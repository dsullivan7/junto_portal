import React, { useState } from 'react'

import Confirmation from './Confirmation'

interface IState {
  isOpen: boolean
  config: { actionCallback?: (res: boolean) => void; title?: string }
}

type Props = {
  children?: React.ReactNode
}

type ConfirmationArgs = {
  actionCallback: (res: boolean) => void
  title?: string
}

type Context = {
  openConfirmation: (args: ConfirmationArgs) => void
}

const ConfirmationContext = React.createContext<Context>({
  openConfirmation: () => Error('openConfirmation not assigned'),
})

function ConfirmationProvider({ children }: Props): React.ReactElement {
  const [state, setState] = useState<IState>({
    isOpen: false,
    config: {},
  })

  function openConfirmation({ actionCallback, title }: ConfirmationArgs) {
    setState({
      ...state,
      isOpen: true,
      config: { actionCallback, title },
    })
  }

  function onConfirm() {
    setState({
      ...state,
      isOpen: false,
      config: {},
    })

    if (state.config.actionCallback) state.config.actionCallback(true)
  }

  function onClose() {
    setState({
      ...state,
      isOpen: false,
      config: {},
    })

    if (state.config.actionCallback) state.config.actionCallback(false)
  }

  return (
    <ConfirmationContext.Provider value={{ openConfirmation }}>
      <Confirmation title={state.config.title} isOpen={state.isOpen} onConfirm={onConfirm} onClose={onClose} />
      {children}
    </ConfirmationContext.Provider>
  )
}

function useConfirmation(): { getConfirmation: (options: { title?: string }) => Promise<boolean> } {
  const { openConfirmation } = React.useContext(ConfirmationContext)

  const getConfirmation = ({ ...options }) => {
    return new Promise((resolve: (result: boolean) => void) => {
      openConfirmation({ actionCallback: resolve, ...options })
    })
  }

  return { getConfirmation }
}

export { ConfirmationProvider, useConfirmation }
