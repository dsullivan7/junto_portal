import React from 'react'

import { Flex, Box, Spacer, Text } from '@chakra-ui/react'

function Element(props: {
  title: string
  children: React.ReactNode
  rightComponent?: React.ReactNode
}): React.ReactElement {
  return (
    <>
      <Box w="80%">
        <Box boxShadow="xl" rounded="md">
          <Flex direction="column" p={5}>
            <Box borderBottomWidth={2} borderBottomColor={'gray.100'}>
              <Flex align="center" justify="center">
                <Text fontSize="2xl">{props.title}</Text>
                <Spacer />
                {props.rightComponent ? props.rightComponent : <></>}
              </Flex>
            </Box>
            <Box flexGrow={1} py={4}>
              {props.children}
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  )
}

export default Element
