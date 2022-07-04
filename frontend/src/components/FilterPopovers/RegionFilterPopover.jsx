import React from 'react';
import {
    HStack,
    Text,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverCloseButton,
    PopoverHeader,
    PopoverFooter,
    PopoverTrigger,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    Spacer,
    useDisclosure,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import { area_city, city_district } from '../../data/city_district';

const CityDistrictMap = new Map(city_district.map(obj => [obj.CityName, obj.AreaList]));

export default function RegionFilterPopover({ city, onSetCity, section, onSetSection }) {
    const {
        isOpen: isOpenCity,
        onClose: onCloseCity,
        onToggle: onToggleCity,
    } = useDisclosure();
    const {
        isOpen: isOpenSection,
        onOpen: onOpenSection,
        onClose: onCloseSection,
        onToggle: onToggleSection,
    } = useDisclosure();

    const handleSetCity = e => {
        onCloseSection();
        onSetCity(e.target.textContent);
        onSetSection('reset');
        onCloseCity();
        onOpenSection();
    };

    const handleAddSection = e => onSetSection('add', e.target.textContent);
    const handleRemoveSection = e => onSetSection('remove', e.target.textContent);
    const handleResetAllSection = () => onSetSection('reset');

    return (
        <HStack gap={2}>
            <Text fontWeight="bold">地區</Text>
            <Flex>
                {/* 選擇縣市 */}
                <Popover isOpen={isOpenCity} variant="responsive">
                    <PopoverTrigger>
                        {city === '' ? (
                            <Button
                                size="sm"
                                rightIcon={<BsChevronDown />}
                                onClick={onToggleCity}
                            >
                                選擇縣市
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                rightIcon={<BsChevronDown />}
                                onClick={onToggleCity}
                                color="teal.500"
                            >
                                {city}
                            </Button>
                        )}
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody>
                            {area_city.map(obj => (
                                <HStack key={`area-${obj.area}`} gap={1}>
                                    <Text
                                        fontSize="xs"
                                        fontWeight="medium"
                                        color="gray.400"
                                    >
                                        {obj.area}
                                    </Text>
                                    <ButtonGroup
                                        size="xs"
                                        variant="ghost"
                                        onClick={handleSetCity}
                                    >
                                        {obj.cityList.map(cityStr =>
                                            cityStr === city ? (
                                                <Button
                                                    key={`btn-city-${cityStr}`}
                                                    isActive
                                                >
                                                    {cityStr}
                                                </Button>
                                            ) : (
                                                <Button key={`btn-city-${cityStr}`}>
                                                    {cityStr}
                                                </Button>
                                            )
                                        )}
                                    </ButtonGroup>
                                </HStack>
                            ))}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                <Spacer m={1} />
                {/* 選擇區域 */}
                <Popover isOpen={isOpenSection}>
                    <PopoverTrigger>
                        {section.length === 0 ? (
                            <Button
                                size="sm"
                                rightIcon={<BsChevronDown />}
                                onClick={onToggleSection}
                                isDisabled={city === ''}
                            >
                                選擇區域
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                rightIcon={<BsChevronDown />}
                                onClick={onToggleSection}
                                color="teal.500"
                            >
                                {section.length <= 2
                                    ? section.join('、')
                                    : `已選擇 ${section.length} 區域`}
                            </Button>
                        )}
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody>
                            {city === '' ? (
                                ''
                            ) : (
                                <ButtonGroup size="xs" variant="ghost">
                                    <Wrap spacing={0.5}>
                                        {CityDistrictMap.get(city).map(obj =>
                                            section.includes(obj.AreaName) ? (
                                                <WrapItem>
                                                    <Button
                                                        key={`btn-sec-${obj.AreaName}`}
                                                        onClick={handleRemoveSection}
                                                        isActive
                                                    >
                                                        {obj.AreaName}
                                                    </Button>
                                                </WrapItem>
                                            ) : (
                                                <WrapItem>
                                                    <Button
                                                        key={`btn-sec-${obj.AreaName}`}
                                                        onClick={handleAddSection}
                                                    >
                                                        {obj.AreaName}
                                                    </Button>
                                                </WrapItem>
                                            )
                                        )}
                                    </Wrap>
                                </ButtonGroup>
                            )}
                        </PopoverBody>
                        <PopoverFooter display="flex" justifyContent="space-between">
                            <Spacer />
                            <ButtonGroup size="xs">
                                <Button colorScheme="teal" onClick={onCloseSection}>
                                    確認
                                </Button>
                                <Button variant="ghost" onClick={handleResetAllSection}>
                                    清空
                                </Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
            </Flex>
        </HStack>
    );
}
