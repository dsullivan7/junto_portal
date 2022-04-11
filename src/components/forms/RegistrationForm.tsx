import React from 'react'

import { Box, Flex, Input, Select, Button, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'

import { useForm } from 'react-hook-form'

function RegistrationForm(props: {
  onSubmit: (data: {
    first_name: string
    last_name: string
    date_of_birth: string
    tax_id: string
    phone_number: string
    street_address: string
    city: string
    state: string
    postal_code: string
    funding_source: string
  }) => void
}): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    first_name: string
    last_name: string
    date_of_birth: string
    tax_id: string
    phone_number: string
    street_address: string
    city: string
    state: string
    postal_code: string
    funding_source: string
  }>()

  return (
    <>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <Flex py={1} justify="space-between">
          <Box w="100%">
            <Box w="95%">
              <FormControl isInvalid={!!errors.first_name}>
                <FormLabel>First name:</FormLabel>
                <Input {...register('first_name', { required: true })} />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
            </Box>
          </Box>
          <Box w="100%">
            <Box w="95%">
              <FormControl isInvalid={!!errors.last_name}>
                <FormLabel>Last name:</FormLabel>
                <Input {...register('last_name', { required: true })} />
                {errors.last_name && <FormErrorMessage>This field is required</FormErrorMessage>}
              </FormControl>
            </Box>
          </Box>
        </Flex>
        <Box py={1}>
          <FormControl isInvalid={!!errors.date_of_birth}>
            <FormLabel>Date of birth:</FormLabel>
            <Input type="date" {...register('date_of_birth', { required: true })} />
            {errors.date_of_birth && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
        </Box>
        <Box py={1}>
          <FormControl isInvalid={!!errors.tax_id}>
            <FormLabel>Social security number:</FormLabel>
            <Input {...register('tax_id', { required: true })} />
            {errors.tax_id && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
        </Box>
        <Box py={1}>
          <FormControl isInvalid={!!errors.phone_number}>
            <FormLabel>Phone number:</FormLabel>
            <Input {...register('phone_number', { required: true })} />
            {errors.phone_number && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
        </Box>
        <Box py={1}>
          <FormControl isInvalid={!!errors.street_address}>
            <FormLabel>Street address:</FormLabel>
            <Input {...register('street_address', { required: true })} />
            {errors.street_address && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
        </Box>
        <Box py={1}>
          <FormControl isInvalid={!!errors.city}>
            <FormLabel>City:</FormLabel>
            <Input {...register('city', { required: true })} />
            {errors.city && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
        </Box>
        <Box py={1}>
          <FormControl isInvalid={!!errors.state}>
            <FormLabel>State:</FormLabel>
            <Input {...register('state', { required: true })} />
            {errors.state && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
        </Box>
        <Box py={1}>
          <FormControl isInvalid={!!errors.postal_code}>
            <FormLabel>Post code:</FormLabel>
            <Input {...register('postal_code', { required: true })} />
            {errors.postal_code && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
        </Box>
        <Box py={1}>
          <FormControl isInvalid={!!errors.funding_source}>
            <FormLabel>Funding source:</FormLabel>
            <Select placeholder="Select option" {...register('funding_source', { required: true })}>
              <option value="employment_income">Employment income</option>
              <option value="investments">Investments</option>
              <option value="inheritance">Inheritance</option>
              <option value="business_income">Business income</option>
              <option value="savings">Savings</option>
              <option value="family">Family</option>
            </Select>
            {errors.funding_source && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
        </Box>
        <Box py={4}>
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </>
  )
}

export default RegistrationForm
