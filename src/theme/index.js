import {
    extendBaseTheme,
    theme as chakraTheme,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const {
    Button, Container, VStack, Heading, Text, FormControl, FormLabel, Input, InputGroup, InputRightElement,
    Card, CardBody, CardHeader, CardFooter, Avatar, AvatarBadge, AvatarGroup, Flex, HStack, Tag, TagLabel
} = chakraTheme.components;

//color mode support
export const theme = extendBaseTheme({
    config: {
        initialColorMode: 'light', 
        useSystemColorMode: false, 
    },
    colors: {
        brand: {
            100: "#7084B6",
            200: "#4C6AA6",
            300: "#325090",
            400: "#2A4684",
            500: "#1E509E",
            600: "#1A478E",
            700: "#153D7D",
            800: "#10346D",
            900: "#0B2A5D",
        },
    },
    components: {
        Button, Container, VStack, Heading, Text, FormControl, FormLabel, Input, InputGroup, InputRightElement,
        Card, CardBody, CardHeader, CardFooter, Avatar, AvatarBadge, AvatarGroup, Flex, HStack, Tag, TagLabel
    },
    fonts: {
        body: `Inter, ${chakraTheme.fonts.body}`,
        heading: `Inter, ${chakraTheme.fonts.heading}`,
    },
    styles: {
        global: (props) => ({
            body: {
                bg: mode('white', 'gray.900')(props),
                color: mode('gray.800', 'white')(props),
            },
        }),
    },
});

export const colors = {
    primary: "#1D2D44",
    secondary: "#50555F",
    tagGrey: "#A3A3A3",
    passwordGrey: "#3E5C76",
};
