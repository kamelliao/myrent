import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

function MainLogo(props) {
    return (
        <Box {...props}>
            <Heading
                bgGradient="linear(to-l, #4FD1C5, #68D391)"
                bgClip="text"
                fontWeight="extrabold"
                fontSize="6xl"
            >
                MyRent
            </Heading>
            <Text fontWeight="bold" textColor="gray.500" align="center">
                你的租屋小幫手
            </Text>
        </Box>
    );
}

export default MainLogo;
