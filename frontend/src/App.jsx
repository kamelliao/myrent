import React from 'react';
import { ChakraProvider, Flex, Box, extendTheme, VStack } from '@chakra-ui/react';
import MainLogo from './components/MainLogo';
import FilterPanel from './containers/FilterPanel';
import HouseResultView from './containers/HouseResultView';

const theme = extendTheme({
    components: {
        Popover: {
            variants: {
                responsive: {
                    content: { width: 'unset' },
                },
            },
        },
        Skeleton: {
            defaultProps: {
                startColor: 'gray.100',
                endColor: 'gray.200',
                speed: 0.2,
            },
            variants: {
                rounded: {
                    borderRadius: 'xl',
                },
            },
        },
    },
});

function App() {
    const navHeight = '60px';

    return (
        <ChakraProvider theme={theme}>
            <Flex
                h="100vh"
                py={navHeight}
                gridGap={10}
                justifyContent="center"
                flexDirection={{ base: 'column', lg: 'row' }}
            >
                <Flex
                    px={5}
                    py={7}
                    position={['sticky', '-webkit-sticky']}
                    justifyContent="center"
                    boxShadow="lg"
                    borderRadius="xl"
                >
                    <VStack>
                        <MainLogo />
                        <FilterPanel />
                    </VStack>
                </Flex>
                <Flex px={5} py={7} overflow="auto" justifyContent="center">
                    <HouseResultView />
                </Flex>
            </Flex>
        </ChakraProvider>
    );
}

export default App;
