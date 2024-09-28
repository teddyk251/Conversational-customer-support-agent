import React from 'react';
import {
    Box,
    VStack,
    Heading,
    Text,
    Alert,
    AlertIcon,
    Flex,
} from '@chakra-ui/react';
import { IoMdAddCircleOutline } from "react-icons/io";

interface AttachmentItemProps {
    label: string;
    isRequired?: boolean;
}

const AttachmentItem = ({ label, isRequired = true }
    : AttachmentItemProps
) => (
    <Flex align="center" className="mb-2">
        <Text className={`flex-grow ${isRequired ? 'text-black' : 'text-gray-600'}`}>
            {label}
            {isRequired && <span className="text-red-500">*</span>}
        </Text>
        <Box
            as="button"
            className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
            <IoMdAddCircleOutline />
        </Box>
    </Flex>
);

const AttachmentsForm = () => {
    const requiredAttachments = [
        'Photo with white background',
        'Copy of passport biodata page',
        'Recommendation letter from school for enrolled students',
        'Original police clearance for students above 18 years of age'
    ];

    const optionalAttachments = [
        'Photo with white background',
        'Recommendation letter from employer',
        'Copy of passport biodata page'
    ];

    return (
        <Box borderRadius="lg" className="bg-white shadow-md rounded-lg w-full mt-5 border border-blue-700">
            <Heading as="h2" borderTopRadius="lg" size="lg" className="mb-6 bg-blue-300 p-4 sm:p-6 border-b-2 border-b-blue-700" textAlign="left">
                Attachments
            </Heading>

            <VStack spacing={4} align="stretch" className="p-4 sm:p-6">
                <Alert status="info" variant="subtle" className="mb-4">
                    <AlertIcon />
                    Passport photo must be a jpeg or jpg file and not exceed 200kb. Other attachments must be pdf files and not exceed 500kb.
                </Alert>

                <Heading as="h3" size="md" className="mb-2">Attachments</Heading>
                {requiredAttachments.map((attachment, index) => (
                    <AttachmentItem key={index} label={`${index + 1}. ${attachment}`} />
                ))}

                <Heading as="h3" size="md" className="mb-2 mt-4">Optional Attachments</Heading>
                {optionalAttachments.map((attachment, index) => (
                    <AttachmentItem key={index} label={`${index + 1}. ${attachment}`} isRequired={false} />
                ))}
            </VStack>
        </Box>
    );
};

export default AttachmentsForm;