import React, { useEffect, useState } from 'react';
import { Container, VStack, Heading, Text, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Center, HStack } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { colors } from '../../theme/index';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPassword, setLogin, updateToken } from '../../state';
import { useNavigate } from 'react-router-dom';
import StudentDetails from './signUpApi/studentDetailsApi';
import { getDepartmentAPI } from './signUpApi/getDepartmentId';
import { ReactComponent as LynxSplash } from './lynx_spash.svg'; // Import the splash image

const SetPasswordScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [departmentId, setDepartmentId] = useState(null); // Local state for departmentId

  // Fetch the necessary data from Redux
  const token = useSelector(state => state.auth.token);
  const userRollNumber=useSelector(state=>state.registration.user_roll_no);
  console.log(userRollNumber);
  const firstName = useSelector(state => state.registration.user_first_name);
  const lastName = useSelector(state => state.registration.user_last_name);
  const department = useSelector(state => state.registration.user_department);
  const dob = useSelector(state => state.registration.user_dob);
  const mobile_no = useSelector(state => state.registration.user_phone_number);
  const gender = useSelector(state => state.registration.user_gender);
  const nationality = useSelector(state => state.registration.user_country_of_origin);
  const countryCode = useSelector(state => state.registration.user_country_code || '91'); 
  const profileImg = useSelector(state => state.registration.user_profile_picture || 'default_profile_image.png'); 
  const passportImg = "";  
  

  useEffect(() => {
    if (password === confirmPassword && password.length > 0) {
      dispatch(setUserPassword(password));
    }
  }, [password, confirmPassword, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(updateToken(token));
    }
  }, [token, dispatch]);

  const handleSetPassword = async () => {
    try {
      if (!token) {
        console.error("No token available. Cannot make API request.");
        return;
      }

      const dept_id = await getDepartmentAPI(department,userRollNumber);
      console.log(dept_id)
console.log(dept_id);
      const payload = {
        first_name: firstName,
        last_name: lastName,
        department: department,
        dob: dob,
        mobile_no: mobile_no,
        gender: gender,
        nationality: nationality,
        new_password: password,
        confirm_password: confirmPassword,
        reg_token: "rollNo",  
        countryCode: countryCode,
        department_id: dept_id, 
      };
      
      const studentRegisterResponse = await StudentDetails(token, payload);
      console.log("Student registration response:", studentRegisterResponse);
      
      if (studentRegisterResponse.token) {
        dispatch(setLogin({ user: studentRegisterResponse.user, token: studentRegisterResponse.token }));
      }

      navigate("/security");
    } catch (error) {
      console.error("Failed to set password:", error);
    }
  };

  const handlePrev = () => {
    navigate("/register-profile-images");
  };

  return (
    <HStack justify={"center"} spacing={0} h={"100vh"}>
      <Container h="100vh" w="100%" mx={0} px={0}>
        <Center h="full">
          <VStack spacing={12}>
            <VStack spacing={[0.1, 0.5, 1]}>
              <Heading color={colors.primary} fontWeight={700}>
                Set a password
              </Heading>
              <Text color={colors.secondary} fontWeight={400} fontSize={"0.85em"}>
                Enter Your App Password
              </Text>
            </VStack>
            <VStack spacing={4} w="100%">
              <FormControl>
                <FormLabel color={colors.secondary} fontSize={"0.8em"} fontWeight={700}>
                  ENTER PASSWORD
                </FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    variant='filled'
                    borderRadius={"4px"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <InputRightElement width='3rem'>
                    {showPassword ? (
                      <ViewOffIcon onClick={() => setShowPassword(false)} />
                    ) : (
                      <ViewIcon onClick={() => setShowPassword(true)} />
                    )}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel color={colors.secondary} fontSize={"0.8em"} fontWeight={700}>
                  CONFIRM PASSWORD
                </FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant='filled'
                    borderRadius={"4px"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                  <InputRightElement width='3rem'>
                    {showConfirmPassword ? (
                      <ViewOffIcon onClick={() => setShowConfirmPassword(false)} />
                    ) : (
                      <ViewIcon onClick={() => setShowConfirmPassword(true)} />
                    )}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                w={"full"}
                colorScheme={"brand"}
                marginTop={5}
                borderRadius={"4px"}
                onClick={handleSetPassword}
                isDisabled={password !== confirmPassword || password.length === 0}
              >
                Continue
              </Button>
              <Button
                w={"full"}
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

export default SetPasswordScreen;
