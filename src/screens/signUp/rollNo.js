import React, { useEffect, useState } from 'react';
import { 
  Container, VStack, Heading, Text, FormControl, FormLabel, Input, Button, 
  Center, Flex, Box, useToast
} from '@chakra-ui/react';
import { colors } from '../../theme/index';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../state';
import { useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import SendOtp from './signUpApi/sendOTPApi';
import ErrorAlert from '../../components/ErrorAlert';

const Login = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [rollNo, setRollNo] = useState('');
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const toast = useToast(); // Initialize toast

  useEffect(() => {
    if (executeRecaptcha) {
      setRecaptchaReady(true);
    }
  }, [executeRecaptcha]);

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, []);

  const handleContinue = async () => {
    setError('');

    if (!isOnline) {
      setError("Please connect to the internet.");
      return;
    } 

    if (rollNo.length !== 9 || rollNo.replace(/[^0-9]/g, "").length !== 9) {
      setError("Invalid Roll Number");
      return;
    }

    if (!recaptchaReady || !executeRecaptcha) {
      setError("Recaptcha is not ready");
      return;
    }

    if (!rollNo) {
      toast({
        title: "Missing Roll Number",
        description: "Please fill in all the required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    dispatch(signUpUser({ user_roll_no: rollNo })); 
    try {
      const reCaptchaToken = await executeRecaptcha();
      if (!rollNo || !reCaptchaToken) {
        setError("Please fill in all the fields.");
        return;
      }

      const sendOtpResponse = await SendOtp(rollNo, reCaptchaToken);
      localStorage.setItem("rollNo", rollNo);
      navigate("/register-otp");
    } catch (error) {
      setError(error.response?.data?.message || "An unknown error occurred.");
    }
  };

  return (
    <Container h="100vh" w="100%" mx={0} px={0}>
      <Center h="full">
        <VStack spacing={12}>
          <VStack spacing={[0.1, 0.5, 1]}>
            <Heading fontWeight={700}>Sign Up for Lynx</Heading>
            <Flex direction="row">
              <Text color={colors.secondary} fontWeight={400} fontSize={"0.85em"}>
                Already Registered?
              </Text>
              <Box width="3px" />
              <Button
                as="i"
                textDecoration="underline"
                variant="link"
                onClick={() => navigate('/login')}
              >
                <Text color={colors.secondary} fontWeight={400} fontSize={"0.85em"}>
                  Login
                </Text>
              </Button>
            </Flex>
          </VStack>
          <VStack spacing={4} w="100%">
            <FormControl>
              <FormLabel>ROLL NUMBER</FormLabel>
              <Input
                pr="4.5rem"
                type="number"
                variant="filled"
                borderRadius="4px"
                onChange={(e) => setRollNo(e.target.value)}
                value={rollNo}
              />
            </FormControl>
            <Button
              w="full"
              colorScheme="brand"
              borderRadius="4px"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </VStack>
        </VStack>
      </Center>
      {error && <ErrorAlert message={error} onClose={() => setError('')} />}
    </Container>
  );
}

export default function RollScreen() {
  const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={SITE_KEY}
      scriptProps={{ async: true, defer: true }}
    >
      <Login />
    </GoogleReCaptchaProvider>
  );
}
