import React from 'react'

import { Box, FormControl, Input, Button, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import NumberFormat from 'react-number-format'

import { Controller, useForm } from 'react-hook-form'

function BankTransferForm(props: { onSubmit: (data: { amount: number }) => void }): React.ReactElement {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<{
    amount: number
  }>()

  return (
    <>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <Box py={1}>
          <FormControl isInvalid={!!errors.amount}>
            <FormLabel>Amount to transfer:</FormLabel>
            <Controller
              render={({ field: { onChange, value } }) => (
                <NumberFormat
                  allowNegative={false}
                  customInput={Input}
                  displayType={'input'}
                  thousandSeparator={true}
                  prefix={'$'}
                  decimalScale={2}
                  value={value}
                  onValueChange={(v) => onChange(v.floatValue)}
                />
              )}
              name="amount"
              control={control}
            />
            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>
        </Box>
        <Box py={4}>
          <Button type="submit">Begin transfer</Button>
        </Box>
      </form>
    </>
  )
}

export default BankTransferForm
