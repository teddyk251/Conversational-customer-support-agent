import React from 'react';
import { Box, Text, Flex, Icon } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';

interface ProgressStepProps {
    number: number;
    title: string;
    isActive: boolean;
    isCompleted: boolean;
}


const ProgressStep = ({ number, title, isActive, isCompleted }
    : ProgressStepProps
) => (
    <Flex direction="column" align="center" flex={1}>
        <Box
            w="10"
            h="10"
            borderRadius="full"
            bg={isActive ? 'blue.500' : isCompleted ? 'green.500' : 'gray.300'}
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            mb="2"
        >
            {number}
        </Box>
        <Text color={isActive ? 'blue.500' : 'gray.600'} fontWeight={isActive ? 'bold' : 'normal'}>
            {title}
        </Text>
    </Flex>
);

const PermitApplicationProgress = () => {
    return (
        <Box className="w-full ">
            <Flex align="center" mb="4">
                <Text fontSize="2xl" fontWeight="bold" mr="2">
                    Application for a permit
                </Text>
                <Icon as={FiEdit} boxSize="6" color="gray.500" />
            </Flex>
            <Flex align="center" justify="space-between">
                <ProgressStep number={1} title="Application" isActive={true} isCompleted={false} />
                <Box flex={1} h="1" bg="gray.200" mx="2" />
                <ProgressStep number={2} title="Summary" isActive={false} isCompleted={false} />
                <Box flex={1} h="1" bg="gray.200" mx="2" />
                <ProgressStep number={3} title="Payment" isActive={false} isCompleted={false} />
            </Flex>
        </Box>
    );
};

export default PermitApplicationProgress;