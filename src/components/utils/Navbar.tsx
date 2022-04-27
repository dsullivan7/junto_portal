import React from 'react'
import { Link } from 'react-router-dom'

import { Box, Flex, Spacer, Text, Image } from '@chakra-ui/react'

type Props = {
  logo?: string
  title: string
  rightComponent?: React.ReactNode
}

function Navbar({ logo, title, rightComponent }: Props): React.ReactElement {
  return (
    <>
      <Box boxShadow="lg">
        <Flex
          align="center"
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'center', md: 'start' }}
          p={3}
          bg="white"
        >
          <Link to="/">
            <Flex align="center" justify="center">
              {logo && <Image p={2} src={logo} h={20} />}
              <Text display={{ base: 'none', md: 'block' }} m={2} fontSize="5xl" borderBottomWidth={3} borderBottomColor="brand.secondary.300" color="brand.primary.500">
                {title}
              </Text>
            </Flex>
          </Link>
          <Spacer />
          {rightComponent}
        </Flex>
      </Box>
    </>
  )
}

export default Navbar
