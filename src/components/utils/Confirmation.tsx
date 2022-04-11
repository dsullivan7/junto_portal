import React from 'react'

import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'

type Props = {
  onConfirm: () => void
  onClose: () => void
  isOpen: boolean
  title?: string
}

function Confirmation({ onConfirm, onClose, isOpen, title }: Props): React.ReactElement {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>
          <>
            <Button mr={2} colorScheme="brand.danger" onClick={onConfirm}>
              delete
            </Button>
            <Button ml={2} colorScheme="gray" onClick={onClose}>
              cancel
            </Button>
          </>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Confirmation
