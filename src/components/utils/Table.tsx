import React from 'react'

import { Flex, Text, Table, Thead, Th, Tbody, Tr, Td } from '@chakra-ui/react'

type Props = {
  headers?: { value: string }[]
  entries: {
    value: string | React.ReactElement
  }[][]
}

function TableComponent({ headers, entries }: Props): React.ReactElement {
  const headerComponent = headers ? (
    <Thead>
      <Tr>
        {headers.map((header, idx) => (
          <Th key={`header-${idx}`} bg="gray.50" text="gray.500">
            {header.value}
          </Th>
        ))}
      </Tr>
    </Thead>
  ) : null

  const entryComponent = entries.map((row, idx) => (
    <Tr key={`row-${idx}`} _hover={{ background: 'gray.50' }}>
      {row.map((entry, idx) => {
        return (
          <Td key={`entry-${idx}`} px="6" py="4">
            <Flex align="center">{typeof entry.value === 'string' ? <Text>{entry.value}</Text> : entry.value}</Flex>
          </Td>
        )
      })}
    </Tr>
  ))

  return (
    <>
      <Table>
        {headerComponent}
        <Tbody>{entryComponent}</Tbody>
      </Table>
    </>
  )
}

export default TableComponent
