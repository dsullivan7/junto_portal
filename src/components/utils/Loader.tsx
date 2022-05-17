import React from 'react'

import { CircularProgress } from '@chakra-ui/react'

function Loader(): React.ReactElement {
  return <CircularProgress isIndeterminate color="brand.secondary.500" />
}

export default Loader
