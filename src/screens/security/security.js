import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  Avatar,
  Flex,
  VStack,
  Heading,
  Button,
  Wrap,
  Tag,
  TagLabel,
  Box,
  Icon,
} from "@chakra-ui/react";
import { MdError, MdContentCopy } from "react-icons/md"; // Importing error icon
import { colors } from "../../theme";
import SecurityCodesFetch from "./securityCodesApi";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

const SecurityCodes = () => {
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  const [securityCodes, setSecurityCodes] = useState(null); // State for fetched security codes
  const [error, setError] = useState(null); // State for any errors
  const toast = useToast(); // Initialize Chakra UI's toast for error messages
  const permissions = {};
  const initialCount = 2;
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };
  const sampleCards = [
    {
      name: "Spider NITT",
      app_name: "lynx",
      avatar_name: "dan abramov",
      avatar_url: "https://bit.ly/dan-abramov",
      data: [
        "Name",
        "Password",
        "Address",
        "DoB",
        "ATM Pin",
        "Social Security Number",
        "Mother's Maiden Name",
        "Legal Background",
        "Preferred Deodorant",
      ],
      otp: "123456",
    },
  ];

  const obj = {
    Address: false,
    DepartmentId: true,
    Dob: false,
    Gender: true,
    MobileNo: false,
    Name: true,
    Nationality: false,
    PictureUrl: false,
    RollNo: true,
  };

  useEffect(() => {
    const fetchSecurityCodes = async () => {
      try {
        if (!token) {
          throw new Error("No token found. Please log in again.");
        }

        const fetchedData = await SecurityCodesFetch(token); // Fetch security codes with token
        setSecurityCodes(fetchedData); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Set error message in state
      }
    };

    fetchSecurityCodes();
  }, [token]);

  const displayedEntries = showMore
    ? Object.entries(obj)
    : Object.entries(obj).slice(0, initialCount);
  console.log(displayedEntries); ///CHANGE obj TO permissions  FINALLY
  useEffect(() => {
    if (error && !toast.isActive("error-toast")) {
      // If there's an error and no existing toast is active
      toast({
        id: "error-toast", // Unique ID to prevent duplicate toasts
        position: "bottom",
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
            <Text fontWeight="bold" flex="1">
              {error}
            </Text>
            <Button
              size="sm"
              ml={4}
              colorScheme="red"
              variant="outline"
              onClick={() => setError(null)} // Clear error when button is clicked
            >
              Close
            </Button>
          </Box>
        ),
      });
    }
  }, [error, toast]);

  const cardsToDisplay = securityCodes; // Use fetched data or sample data
  return (
    <Flex height={"100vh"} direction={"column"}>
      <Heading
        textAlign={"center"}
        fontWeight={800}
        mx={0}
        py={30}
        fontSize={"1.5rem"}
      >
        Security Codes
      </Heading>
      <Container w={["100%", "80%", "50%"]} overflow={"auto"}>
        {!cardsToDisplay || cardsToDisplay.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            height="100%"
            textAlign="center"
            p={4}
          >
            <Text fontSize="lg" fontWeight="bold">
              No OTPs yet
            </Text>
            <Text mt={2}>
              It looks like there are no security codes available at the moment.
            </Text>
          </Flex>
        ) : (
          cardsToDisplay.map((card, index) => (
            <Card
              key={index}
              mt={4}
              borderRadius={"24px"}
              pt={2}
              boxShadow={"0px 0px 20px rgba(0, 0, 0, 0.15)"}
            >
              <CardHeader py={2}>
                <Flex alignItems="center" gap="2">
                  <Avatar name={card.avatar_name} src={card.avatar_url} />
                  <VStack alignItems={"flex-start"} mx={1} spacing={0}>
                    <Heading fontSize={"1.5rem"} my={0}>
                      {card.clientName}
                    </Heading>
                    <Text>
                      '{card.app_name}' requires access to the following
                      information
                    </Text>
                  </VStack>
                </Flex>
              </CardHeader>
              <CardBody py={1}>
                <Wrap>
                  {card.data.map((data, index) => (
                    <Tag
                      key={index}
                      size="sm"
                      borderRadius="full"
                      variant="outline"
                      border={"1px solid"}
                      borderColor={colors.tagGrey}
                    >
                      <TagLabel>{data}</TagLabel>
                    </Tag>
                  ))}
                </Wrap>
              </CardBody>
              <CardFooter py={5}>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                >
                  <Text>
                    Your OTP is <Text as={"b"}> {card.otp} </Text>{" "}
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    ml={2}
                    onClick={() => {
                      navigator.clipboard.writeText(card.otp);
                      toast({
                        title: "OTP copied.",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: "top-right",
                        render: () => (
                          <Box
                            color="black"
                            p={3}
                            bg="#81e6d8"
                            borderRadius="md"
                            boxShadow="md"
                            display="flex"
                            alignItems="center"
                            mb={4}
                            width={"fit-content"}
                          >
                            <Icon
                              as={MdContentCopy}
                              w={6}
                              h={6}
                              mr={2}
                              color="black"
                            />
                            <Text flex="1">Otp Copied</Text>
                          </Box>
                        ),
                      });
                    }}
                  >
                    <Icon as={MdContentCopy} w={5} h={5} />
                  </Button>
                </Flex>
              </CardFooter>
            </Card>
          ))
        )}
      </Container>
    </Flex>
  );
};

export default SecurityCodes;
