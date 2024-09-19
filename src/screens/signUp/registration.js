import React, { useState, useEffect } from 'react';
import { Container, VStack, Heading, Text, FormControl, Input, Button, Center, HStack } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { formatISO } from 'date-fns'; // Import date-fns for ISO string formatting
import 'react-datepicker/dist/react-datepicker.css'; // Import the default styles for react-datepicker
import { colors } from '../../theme/index';
import { useDispatch, useSelector } from 'react-redux';
import { dobUser, updateToken } from '../../state'; 
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LynxSplash } from './lynx_spash.svg'; 
import ErrorAlert from '../../components/ErrorAlert';

const DOBScreen = () => {
  const [dob, setDob] = useState(new Date()); // Initialize with current date
  const [address, setAddress] = useState('');
  const [error, setError] = useState(''); // State to manage error messages
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(updateToken(token));
    }
  }, [token, dispatch]);

  const handleContinue = () => {
    if (!address || !dob) { // Check if address or dob is missing
      setError("Please fill in all the required fields.");
      return;
    }

    if (!token) {
      setError("Token is missing. Cannot proceed with DOB and address update.");
      return;
    }

    // Clear error message
    setError('');

    // Format DOB to ISO string
    const formattedDOB = formatISO(dob);

    dispatch(dobUser({ user_dob: formattedDOB, user_address: address }));

    navigate('/register-profile-images'); 
  };

  const handleBack = () => {
    navigate('/register-details'); 
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
              <Text color={colors.secondary} fontWeight={400} fontSize={"0.85em"}>
                Basic Information
              </Text>
            </VStack>
            <VStack spacing={4} w="100%">
              {error && (
                <ErrorAlert 
                  message={error}
                  onClose={() => setError('')} // Clear error message on close
                />
              )}
              <FormControl>
                <DatePicker
                  selected={dob}
                  onChange={(date) => setDob(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date of Birth"
                  className="react-datepicker-wrapper"
                  customInput={<Input placeholder="Date of Birth" variant="filled" size="lg" borderRadius="4px" p='1.5%' />}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder='Permanent Address'
                  _placeholder={{ fontWeight: "600" }}
                  pr="4.5rem"
                  type="text"
                  variant="filled"
                  borderRadius="4px"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  size="lg"
                  w="full"
                  p='1.5%'
                />
              </FormControl>
              <Button
                w="full"
                colorScheme="brand"
                borderRadius="4px"
                marginTop="15px"
                width="full"
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

export default DOBScreen;
