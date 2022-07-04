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
} from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import rent_source from '../../data/rent_source';

export default function srcFilterPopover({ src, onSetSrc }) {
    const handleSrcAdd = e => onSetSrc('add', e.target.getAttribute('data-id'));
    const handleSrcRemove = e => onSetSrc('remove', e.target.getAttribute('data-id'));
    const handleSrcResetAll = () => onSetSrc('reset');

    return (
        <HStack gap={2}>
            <Text fontWeight="bold">房源</Text>
            <Popover>
                {({ isOpen, onClose }) => (
                    <>
                        <PopoverTrigger>
                            {src.length === 0 ? (
                                <Button size="sm" rightIcon={<BsChevronDown />}>
                                    選擇房源
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    rightIcon={<BsChevronDown />}
                                    color="teal.500"
                                >
                                    已選擇 {src.length} 房源
                                </Button>
                            )}
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverCloseButton />
                            <PopoverArrow />
                            <PopoverHeader>
                                <Flex>
                                    <Text fontSize="sm">已選擇房源：</Text>
                                    <ButtonGroup
                                        size="xs"
                                        colorScheme="teal"
                                        onClick={handleSrcRemove}
                                    >
                                        {rent_source
                                            .filter(({ id, label }) => src.includes(id))
                                            .map(({ id, label }) => (
                                                <Button
                                                    key={id}
                                                    data-id={id}
                                                    rightIcon={<IoMdClose />}
                                                >
                                                    {label}
                                                </Button>
                                            ))}
                                    </ButtonGroup>
                                </Flex>
                            </PopoverHeader>
                            <PopoverBody>
                                <FormControl>
                                    <ButtonGroup
                                        size="xs"
                                        colorScheme="teal"
                                        variant="outline"
                                        onClick={handleSrcAdd}
                                    >
                                        {rent_source
                                            .filter(({ id, label }) => !src.includes(id))
                                            .map(({ id, label }) => (
                                                <Button key={id} data-id={id}>
                                                    {label}
                                                </Button>
                                            ))}
                                    </ButtonGroup>
                                </FormControl>
                            </PopoverBody>
                            <PopoverFooter display="flex" justifyContent="space-between">
                                <Spacer />
                                <ButtonGroup size="xs">
                                    <Button colorScheme="teal" onClick={onClose}>
                                        確認
                                    </Button>
                                    <Button variant="ghost" onClick={handleSrcResetAll}>
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
