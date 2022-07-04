import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, VStack } from '@chakra-ui/react';
import { HouseItem } from '../components/HouseItem';

import SorrySVG from '../static/sorry.svg';
import { fetchHouseList } from '../action/action';

function HouseResultView() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.houseList);

    useEffect(() => {
        dispatch(fetchHouseList());
    }, []);

    return (
        <Box w="xl">
            {state.houseList.length === 0 ? (
                <VStack>
                    <Text fontSize="3xl" fontWeight="bold">
                        噢不！沒有找到符合條件的房子:(
                    </Text>
                    <img src={SorrySVG} alt="sorry" />
                    <a href="https://storyset.com/people">
                        <Text color="gray.400" fontSize="sm">
                            People illustrations by Storyset
                        </Text>
                    </a>
                </VStack>
            ) : (
                <VStack>
                    <Text width="full" color="gray.400" fontWeight="medium">
                        已找到 {state.houseList.length} 筆結果
                    </Text>
                    {state.houseList.map(obj => (
                        <HouseItem data={obj} key={`${obj.src}-${obj.pid}`} />
                    ))}
                </VStack>
            )}
        </Box>
    );
}

export default HouseResultView;
