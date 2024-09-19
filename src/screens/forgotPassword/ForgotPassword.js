import React, { useState, useEffect } from 'react';
import { Container, VStack, HStack, Heading, Text, FormControl, FormLabel, Input, Button, Center, Alert, AlertIcon, Flex, Box, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { generateOtpForPasswordReset, validateOtpForPasswordReset, resetPasswordForStudent } from './forgotPasswordApi';
import { ReactComponent as LynxSplash } from '../../res/lynx_spash.svg'; // Assuming the SVG is available at this path
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: New Password
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
	const { executeRecaptcha } = useGoogleReCaptcha();


  const splashRender = useBreakpointValue({ base: false, lg: true }); // To conditionally render image

  const handleGenerateOtp = async () => {
    try {
      if ( !executeRecaptcha) {
        setError("Recaptcha is not ready");
        return;
      }

      const reCaptchaToken = await executeRecaptcha();
      if ( !reCaptchaToken) {
        setError("Recaptcha token error.");
        return;
      }
      await generateOtpForPasswordReset(email, reCaptchaToken);
      setStep(2);
      setSuccessMessage('OTP sent to your email.');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccessMessage('');
    }
  };

  const handleValidateOtp = async () => {
    try {
      const data = await validateOtpForPasswordReset(email, otp);
      setToken(data.token);
      setStep(3);
      setSuccessMessage('OTP validated. Enter your new password.');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccessMessage('');
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPasswordForStudent(email, newPassword, token);
      setSuccessMessage('Password reset successful. Please log in with your new password.');
      setError('');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <HStack justify={"center"} spacing={0} h={"100vh"}>
      <Container overflowX={"hidden"} h={"full"} m={0} p={0}>
        <HStack style={{ transition: "1s" }}>
          <Container h="100vh" w="100%" mx={0} px={0}>
            <Center h="full">
              <VStack spacing={12}>
                <VStack spacing={[0.1, 0.5, 1]}>
                  <Heading fontWeight={700}>Forgot Password</Heading>
                  <Text color="gray.500" fontWeight={400} fontSize={"0.85em"}>
                    {step === 1 && 'Enter your email to receive an OTP'}
                    {step === 2 && 'Enter the OTP sent to your email'}
                    {step === 3 && 'Set your new password'}
                  </Text>
                </VStack>
                <VStack spacing={4} w="100%">
                  {error && (
                    <Alert status="error" w="full">
                      <AlertIcon />
                      {error}
                    </Alert>
                  )}
                  {successMessage && (
                    <Alert status="success" w="full">
                      <AlertIcon />
                      {successMessage}
                    </Alert>
                  )}
                  {step === 1 && (
                    <>
                      <FormControl id="email" isRequired w="full">
                        <FormLabel>Email</FormLabel>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          variant="filled"
                          borderRadius="4px"
                          placeholder="Enter your email"
                          w="full"  // Ensure input is full width
                        />
                      </FormControl>
                      <Button w="full" colorScheme="blue" borderRadius="4px" onClick={handleGenerateOtp}>
                        Send OTP
                      </Button>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <FormControl id="otp" isRequired w="full">
                        <FormLabel>OTP</FormLabel>
                        <Input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          variant="filled"
                          borderRadius="4px"
                          placeholder="Enter the OTP"
                          w="full"  // Ensure input is full width
                        />
                      </FormControl>
                      <Button w="full" colorScheme="blue" borderRadius="4px" onClick={handleValidateOtp}>
                        Validate OTP
                      </Button>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <FormControl id="new-password" isRequired w="full">
                        <FormLabel>New Password</FormLabel>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          variant="filled"
                          borderRadius="4px"
                          placeholder="Enter your new password"
                          w="full"  // Ensure input is full width
                        />
                      </FormControl>
                      <Button w="full" colorScheme="blue" borderRadius="4px" onClick={handleResetPassword}>
                        Reset Password
                      </Button>
                    </>
                  )}
                  <Button w="full" variant="ghost" borderRadius="4px" onClick={() => navigate('/login')}>
                    Back to Login
                  </Button>
                </VStack>
              </VStack>
            </Center>
          </Container>
        </HStack>
      </Container>
      {splashRender && (
        <Center h={"full"} m={0} p={0}>
          <LynxSplash style={{ height: "90%" }} />
        </Center>
      )}
    </HStack>
  );
};

export default ForgotPassword;
