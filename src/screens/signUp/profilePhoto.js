import React, { useEffect } from 'react';
import { Container, VStack, Heading, Text, Button, Avatar, Center, Input, HStack } from '@chakra-ui/react';
import { colors } from '../../theme/index';
import { useDispatch, useSelector } from 'react-redux';
import { photoUser, updateToken } from '../../state';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LynxSplash } from './lynx_spash.svg'; 

const PhotoScreen = () => {
  const [photo, setPhoto] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
 
  const photoUrl = useSelector(state => state.registration.user_photo);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    console.log("Current token from Redux:", token);
    if (token) {
      dispatch(updateToken(token)); 
    }
  }, [token, dispatch]);

  const handleContinue = () => {
   
    if (photo) {
      dispatch(photoUser({ user_photo: photo }));
    }

    console.log("Photo updated in Redux:", photo);

    navigate('/register-setPassword'); 
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
                Profile Photo
              </Heading>
              <Text color={colors.secondary} fontWeight={400} fontSize={"0.85em"}>
                Upload a profile photo
              </Text>
              <Text color={colors.secondary} fontWeight={400} fontSize={"0.85em"}>
                This will be used by NIT Trichy for official purposes
              </Text>
            </VStack>
            <VStack spacing={4} w="100%">
              <Avatar size='2xl' src={photoUrl} />
              <Input
                type='file'
                onChange={(e) => setPhoto(e.target.files[0] || '')} 
                my="1.5%"
                borderRadius="4px"
              />
              <Text color={colors.secondary} fontWeight={400} fontSize={"0.85em"} maxW="60%" textAlign="center">
                This step is optional. Your profile picture can be changed at any time.
              </Text>
              <Button
                w="full"
                colorScheme="brand"
                borderRadius="4px"
                onClick={handleContinue}
                mt="1%"
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
}

export default PhotoScreen;
