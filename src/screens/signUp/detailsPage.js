import React, { useState, useEffect } from 'react';
import { Container, VStack, Heading, Text, FormControl, Input, Button, Center, Flex, Box, HStack, InputGroup, InputRightElement, Select } from '@chakra-ui/react';
import { colors } from '../../theme/index';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, updateToken } from '../../state';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LynxSplash } from './lynx_spash.svg';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ErrorAlert from '../../components/ErrorAlert'; // Import the ErrorAlert component

const DetailsPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [error, setError] = useState(''); // State to manage error messages

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(updateToken(token));
      console.log("Token updated in Redux:", token);
    }
  }, [token, dispatch]);

  const handleContinue = () => {
    if (!firstName || !lastName || !department || !phoneNumber || !gender || !countryOfOrigin) {
      setError('Please fill in all the required fields.');
      return;
    }

    if (!token) {
      setError('Token is missing. Cannot proceed with registration.');
      return;
    }

    // Clear error message
    setError('');

    // Dispatching action to update the Redux store with user details
    dispatch(registerUser({
      user_first_name: firstName,
      user_last_name: lastName,
      user_department: department,
      user_country_code: phoneNumber.slice(0, phoneNumber.indexOf(' ')), // Extract country code from phone number
      user_phone_number: phoneNumber.slice(phoneNumber.indexOf(' ') + 1), // Extract phone number from phone number
      user_gender: gender,
      user_country_of_origin: countryOfOrigin
    }));

    console.log("User details updated in Redux:", {
      firstName, lastName, department, phoneNumber, gender, countryOfOrigin
    });

    navigate('/register-dob-details');
  };

  const handleBack = () => {
    navigate('/register-otp');
  };

  return (
    <HStack justify={"center"} spacing={0} h={"100vh"}>
      <Container h="100vh" w="100%" mx={0} px={0}>
        <Center h="full">
          <VStack spacing={12}>
            <VStack spacing={[0.1, 0.5, 1]}>
              <Heading fontWeight={700}>
                Registration
              </Heading>
              <Flex direction="row">
                <Text color={colors.secondary} fontWeight={400} fontSize={"0.85em"}>
                  Basic Information
                </Text>
                <Box width="3px" />
              </Flex>
            </VStack>
            <VStack spacing={4} w="100%">
              {error && (
                <ErrorAlert 
                  message={error}
                  onClose={() => setError('')} // Clear error message on close
                />
              )}
              <FormControl>
                <Input
                  placeholder='First Name'
                  _placeholder={{ fontWeight: "600" }}
                  pr="4.5rem"
                  type="text"
                  variant="filled"
                  borderRadius="4px"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder='Last Name'
                  _placeholder={{ fontWeight: "600" }}
                  pr="4.5rem"
                  type="text"
                  variant="filled"
                  borderRadius="4px"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder='Department'
                  _placeholder={{ fontWeight: "600" }}
                  pr="4.5rem"
                  type="text"
                  variant="filled"
                  borderRadius="4px"
                  onChange={(e) => setDepartment(e.target.value)}
                  value={department}
                />
              </FormControl>
              <FormControl>
                <ReactPhoneInput
                  placeholder='Enter phone number'
                  defaultCountry='IN'
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value)}
                />
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    placeholder='Gender'
                    _placeholder={{ fontWeight: "600" }}
                    pr="4.5rem"
                    type="text"
                    variant="filled"
                    borderRadius="4px"
                    value={gender}
                    readOnly
                  />
                  <InputRightElement width="8rem">
                    <Select
                      placeholder='Select'
                      onChange={(e) => setGender(e.target.value)}
                      size="sm"
                      border="none"
                      borderRadius="4px"
                      _focus={{ boxShadow: 'none' }}
                    >
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='other'>Other</option>
                    </Select>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <Input
                  placeholder='Country of Origin'
                  _placeholder={{ fontWeight: "600" }}
                  pr="4.5rem"
                  type="text"
                  variant="filled"
                  borderRadius="4px"
                  onChange={(e) => setCountryOfOrigin(e.target.value)}
                  value={countryOfOrigin}
                />
              </FormControl>
              <Button
                w="full"
                colorScheme="brand"
                borderRadius="4px"
                marginTop="15px"
                width="90%"
                onClick={handleContinue}
              >
                Continue
              </Button>
              <Button
                w={"full"}
                variant={"ghost"}
                borderRadius={"4px"}
                onClick={handleBack}
              >
                Back
              </Button>
            </VStack>
          </VStack>
        </Center>
      </Container>
      <Center h={"full"} m={0} p={0}>
        <LynxSplash style={{ height: "90%" }} />
      </Center>
    </HStack>
  );
};

export default DetailsPage;
