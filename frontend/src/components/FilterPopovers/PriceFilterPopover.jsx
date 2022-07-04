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
    const handleAddPrice = e => onSetPrice('add', e.target.innerText);
    const handleRemovePrice = e => onSetPrice('remove', e.target.innerText);
    const handleResetAllPrice = () => onSetPrice('reset');

    return (
        <HStack gap={2}>
            <Text fontWeight="bold">價錢</Text>
            <Popover variant="responsive">
                {({ isOpen, onClose }) => (
                    <>
                        <PopoverTrigger>
                            {price.length === 0 ? (
                                <Button size="sm" rightIcon={<BsChevronDown />}>
                                    選擇價錢範圍
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    rightIcon={<BsChevronDown />}
                                    color="teal.500"
                                >
                                    {price.length <= 1
                                        ? price.join('、')
                                        : `已選擇 ${price.length} 範圍`}
                                </Button>
                            )}
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody>
                                <ButtonGroup size="xs" isAttached>
                                    {price_range.map(obj =>
                                        price.includes(obj) ? (
                                            <Button onClick={handleRemovePrice} isActive>
                                                {obj}
                                            </Button>
                                        ) : (
                                            <Button onClick={handleAddPrice}>
                                                {obj}
                                            </Button>
                                        )
                                    )}
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
