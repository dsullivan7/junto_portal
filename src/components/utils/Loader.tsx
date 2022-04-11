import React from 'react'

import { CircularProgress } from '@chakra-ui/react'

function Loader(): React.ReactElement {
  return <CircularProgress isIndeterminate color="brand.primary.500" size="80px" />
}

export default Loader
