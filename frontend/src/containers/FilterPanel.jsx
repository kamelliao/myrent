import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Flex, HStack } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

import SrcFilterPopover from '../components/FilterPopovers/SrcFilterPopover';
import RegionFilterPopover from '../components/FilterPopovers/RegionFilterPopover';
import PriceFilterPopover from '../components/FilterPopovers/PriceFilterPopover';

import { setSrc, setCity, setSection, setPrice, resetAll } from '../reducers/filterSlice';
import { setIsLoading } from '../reducers/houseListSlice';
import { fetchHouseList } from '../action/action';

function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

function FilterPanel() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.filter);
    const isLoading = useSelector(state => state.houseList.isLoading);

    const onSetSrc = (type, value) => dispatch(setSrc(type, value));
    const onSetCity = value => dispatch(setCity(value));
    const onSetSection = (type, value) => dispatch(setSection(type, value));
    const onSetPrice = (type, value) => dispatch(setPrice(type, value));
    const onResetAll = () => dispatch(resetAll());

    const onSearch = async () => {
        dispatch(setIsLoading(true));
        await timeout(1500);

        const response = await fetch('/api/filters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                ...state,
            }),
        });

        if (response.ok) {
            console.log('response worked');
        }

        dispatch(fetchHouseList());

        // const request = await fetch("/api/data")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setRentList(data);
        //         setIsLoading(false);
        //     });
    };

    return (
        <Flex
            px={4}
            py={5}
            w="xs"
            borderRadius="md"
            backgroundColor="gray.50"
            flexDirection="column"
            gridGap={2}
        >
            {/* 房源 */}
            <SrcFilterPopover src={state.src} onSetSrc={onSetSrc} />
            {/* 地區 */}
            <RegionFilterPopover
                city={state.city}
                onSetCity={onSetCity}
                section={state.section}
                onSetSection={onSetSection}
            />
            {/* 價錢 */}
            <PriceFilterPopover price={state.price} onSetPrice={onSetPrice} />

            {/* 房型 */}
            {/* 格局 */}

            <HStack>
                <Button
                    width="full"
                    leftIcon={<AiOutlineSearch />}
                    colorScheme="teal"
                    isLoading={isLoading}
                    loadingText="搜尋中"
                    onClick={onSearch}
                >
                    搜尋
                </Button>
                <Button width="auto" variant="outline" onClick={onResetAll}>
                    重設條件
                </Button>
            </HStack>
        </Flex>
    );
}

export default FilterPanel;
