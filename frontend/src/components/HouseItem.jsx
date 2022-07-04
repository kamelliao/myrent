import React from 'react';
import {
    Box,
    Heading,
    Text,
    chakra,
    HStack,
    Badge,
    Skeleton,
    SkeletonText,
} from '@chakra-ui/react';
import { GoLocation } from 'react-icons/go';
import NumberFormat from 'react-number-format';

const Card = chakra('div', {
    baseStyle: {
        px: '4',
        py: '5',
        rounded: 'xl',
        // shadow: 'md',
        backgroundColor: 'gray.100',
        transition: 'transform .2s',
        _hover: {
            transform: 'scale(1.02)',
        },
    },
});

function HouseItemSkeleton(props) {
    return (
        <Card w="xl" bg="gray.50">
            <HStack gap={4}>
                <Box>
                    <Skeleton h="9rem" w="9rem" />
                </Box>
                <Box w="full">
                    <Skeleton h="3rem" />
                    <SkeletonText mt={4} noOfLines={4} spacing={4} />
                </Box>
            </HStack>
        </Card>
    );
}

// TODO: add carousel
function HouseItemPhoto(props) {
    return <></>;
}

function HouseItemContent(props) {
    return (
        <Box>
            <Badge colorScheme="gray">{props.src}</Badge>
            <Text fontSize="2xl" fontWeight="semibold">
                {props.title}
            </Text>
            <Text color="gray.500" fontWeight="semibold" fontSize="sm">
                {props.htype}
                {props.rooms?.bedroom ? ` • ${props.rooms?.bedroom}房` : null}
                {props.rooms?.livingroom ? ` • ${props.rooms?.livingroom}廳` : null}
                {props.rooms?.bathroom ? ` • ${props.rooms?.bathroom}衛` : null}
            </Text>
            <HStack>
                <GoLocation />
                <Text>{props.location.complete}</Text>
            </HStack>
            <HStack as="span">
                <Text fontSize="2xl">
                    <NumberFormat
                        value={props.price}
                        displayType="text"
                        thousandSeparator={true}
                    />
                </Text>
                <Text>元/月</Text>
            </HStack>
        </Box>
    );
}

function HouseItemBtns() {
    return;
}

function HouseItem(props) {
    return (
        <Card w="xl">
            {/* <HouseItemPhoto/> */}
            <HouseItemContent
                src={props.data.src}
                title={props.data.title}
                price={props.data.price}
                location={props.data.location}
                htype={props.data.htype}
                rooms={props.data.rooms}
            />
            <HouseItemBtns />
        </Card>
    );
}

export { HouseItem, HouseItemSkeleton };
