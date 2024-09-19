import React from 'react';
import { Container, VStack, Heading, Text, Button, Center, PinInput, PinInputField, HStack, Spacer, Box, IconButton } from '@chakra-ui/react';
import { colors } from '../../theme/index';
import { useDispatch, useSelector } from 'react-redux'; 
import { verifyUser, setLogin } from '../../state'; 
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import VerifyOtp from './signUpApi/verifyAccountApi';
import { ReactComponent as LynxSplash } from './lynx_spash.svg'; 
import ErrorAlert from '../../components/ErrorAlert';

const VerifyScreen = () => {
  const [showPassword, setShowPassword] = React.useState(true);
  const [error, setError] = React.useState(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rollNo = useSelector((state) => state.registration.user_roll_no);
  const otp = useSelector((state) => state.registration.user_otp);

  const handleContinue = async () => {
    try {
      const response = await VerifyOtp(rollNo, otp);
      console.log("Response from OTP verification:", response);

      if (response.token) {
        dispatch(setLogin({ user: response.user, token: response.token }));
        console.log("Token set in Redux state after OTP verification:", response.token);
        navigate("/register-details");
      }
    } catch (error) {
      console.error("OTP Verification Failed:", error);
      setError(error.response?.data?.message || 'Invalid otp.'); 
    }
  };

  const handleView = () => {
    setShowPassword(!showPassword);
  };

  const handlePrev = () => {
    navigate("/register-rollNo");
  };

  return (
    <HStack justify={"center"} spacing={0} h={"100vh"}>
      <Container h="100vh" w="100%" mx={0} px={0}>
        <Center h="full">
          <VStack spacing={12}>
            <VStack spacing={[0.1, 0.5, 1]}>
              <Heading fontWeight={700}>Verify your Account</Heading>
              <Text color={colors.secondary} fontWeight={400} fontSize={"0.85em"}>
                Enter the OTP sent on your webmail
              </Text>
            </VStack>
            <VStack spacing={4} w="100%">
              {error && <ErrorAlert message={error} />} {/* Display the error alert if there's an error */}
              <Box w="full" maxW="50%" p='1%'>
                <HStack>
                  <Center>
                    <PinInput
                      size="md"
                      otp
                      mask={showPassword}
                      onChange={(value) => dispatch(verifyUser({ user_otp: value }))}
                    >
                      <PinInputField w="10%" mx="1%" />
                      <PinInputField w="10%" mx="1%" />
                      <PinInputField w="10%" mx="1%" />
                      <PinInputField w="10%" mx="1%" />
                      <PinInputField w="10%" mx="1%" />
                      <PinInputField w="10%" mx="1%" />
                    </PinInput>
                    <IconButton
                      aria-label={showPassword ? 'Show Password' : 'Hide Password'}
                      icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      size='md'
                      onClick={handleView}
                    />
                  </Center>
                </HStack>
              </Box>
              <Spacer h='1%' />
              <Button
                w="full"
                maxW="50%"
                colorScheme="brand"
                borderRadius="4px"
                onClick={handleContinue}
              >
                Continue
              </Button>
              <Button
                w={"full"}
                maxW="50%"
                variant={"ghost"}
                borderRadius={"4px"}
                onClick={handlePrev}
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

export default VerifyScreen;
