import React, { useEffect } from 'react';
import { Box, Text, Button, useToast, Icon } from '@chakra-ui/react';
import { MdError } from 'react-icons/md'; // Error icon

const ErrorAlert = ({ message, onClose }) => {
  const toast = useToast();
  
  useEffect(() => {
    if (message && !toast.isActive('error-toast')) {
      toast({
        id: 'error-toast', 
        position: 'bottom',
        duration: 5000,
        isClosable: true,
        render: () => (
          <Box 
            color="white" 
            p={3} 
            bg="red.600" 
            borderRadius="md" 
            boxShadow="md"
            display="flex" 
            alignItems="center"
            mb={4} 
          >
            <Icon as={MdError} w={6} h={6} mr={2} color="white" />
            <Text fontWeight="bold" flex="1">{message}</Text>
            <Button 
              size="sm" 
              ml={4} 
              colorScheme="red" 
              variant="outline" 
              onClick={onClose}
            >
              Close
            </Button>
          </Box>
        ),
      });
    }
  }, [message, onClose, toast]);

  return null; 
};

export default ErrorAlert;
