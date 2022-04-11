import React from 'react'

import { Box, FormControl, NumberInput, NumberInputField, Button, FormErrorMessage, FormLabel } from '@chakra-ui/react'

import { useForm } from 'react-hook-form'

function InvestmentForm(props: { onSubmit: (data: { amount: number }) => void }): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    amount: number
  }>()

  return (
    <>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <Box py={1}>
          <FormControl isInvalid={!!errors.amount}>
            <FormLabel>Amount to invest:</FormLabel>
            <NumberInput>
              <NumberInputField {...register('amount', { required: true, valueAsNumber: true })} />
            </NumberInput>
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
        </Box>
        <Box py={4}>
          <Button type="submit">Invest</Button>
        </Box>
      </form>
    </>
  )
}

export default InvestmentForm
