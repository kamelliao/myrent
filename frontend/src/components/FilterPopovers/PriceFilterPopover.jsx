import React from 'react';
import {
    Button,
    ButtonGroup,
    HStack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverTrigger,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import price_range from '../../data/price_range';

export default function PriceFilterPopover({ price, onSetPrice }) {
    const handleSetPrice = e => onSetPrice(e.target.innerText);
    const handleResetAllPrice = () => onSetPrice('');

    return (
        <HStack gap={2}>
            <Text fontWeight="bold">價錢</Text>
            <Popover variant="responsive">
                {({ isOpen, onClose }) => (
                    <>
                        <PopoverTrigger>
                            {price === '' ? (
                                <Button size="sm" rightIcon={<BsChevronDown />}>
                                    選擇價錢範圍
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    rightIcon={<BsChevronDown />}
                                    color="teal.500"
                                >
                                    {price}
                                </Button>
                            )}
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody>
                                <ButtonGroup size="xs" onClick={onClose} isAttached>
                                    {price_range.map(obj => (
                                        <Button
                                            onClick={handleSetPrice}
                                            isActive={obj === price}
                                        >
                                            {obj}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </PopoverBody>
                            <PopoverFooter display="flex" justifyContent="space-between">
                                <Spacer />
                                <ButtonGroup size="xs">
                                    <Button colorScheme="teal" onClick={onClose}>
                                        確認
                                    </Button>
                                    <Button variant="ghost" onClick={handleResetAllPrice}>
                                        清空
                                    </Button>
                                </ButtonGroup>
                            </PopoverFooter>
                        </PopoverContent>
                    </>
                )}
            </Popover>
        </HStack>
    );
}
