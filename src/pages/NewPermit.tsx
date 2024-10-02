import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    VStack,
    Input,
    Text
} from "@chakra-ui/react";
import PermitApplicationProgress from "./PermitApplicationProgress";
import ApplicantDetailsForm from "./ApplicantDetailsForm";
import RequestDetailsForm from "./RequestDetailsForm";
import AttachmentsForm from './AttacmentsForm';
import axios from 'axios';

interface OCRResults {
    dob: string;
    expiry_date: string;
    gender: string;
    issue_date: string;
    nationality: string;
    other_names: string;
    passport_number: string;
    surname: string;
}

interface ParsedOCRResults {
    dateOfBirth: Date;
    expiryDate: Date;
    gender: string;
    issueDate: Date;
    nationality: string;
    otherNames: string;
    passportNumber: string;
    surname: string;
}

export function parseOCRResults(ocrResults: OCRResults): ParsedOCRResults {
    const parseDate = (dateStr: string): Date => {
        const [month, day, year] = dateStr.split(' ')[0].split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    return {
        dateOfBirth: parseDate(ocrResults.dob),
        expiryDate: parseDate(ocrResults.expiry_date),
        gender: ocrResults.gender,
        issueDate: parseDate(ocrResults.issue_date),
        nationality: ocrResults.nationality,
        otherNames: ocrResults.other_names,
        passportNumber: ocrResults.passport_number,
        surname: ocrResults.surname,
    };
}
const apiUrl = import.meta.env.VITE_API_URL
function NewPermit() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [passportImage, setPassportImage] = useState(null);
    const [surname, setSurname] = useState('');
    const [otherNames, setOtherNames] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [passportNumber, setPassportNumber] = useState('');
    const [issuedDate, setIssuedDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        onOpen(); // Open the modal when the component mounts
    }, []);

    const handleImageUpload = (event: any) => {
        const file = event.target.files[0];
        setPassportImage(file);
    };

    const handleSubmitImage = async () => {
        if (!passportImage) return;

        setIsLoading(true);
        const formData = new FormData();
        console.log(passportImage);

        const blob = new Blob([passportImage], { type: 'image/jpeg' });

        formData.append('image', blob, "passport-image.jpg");
        formData.append('lang', 'en');
        try {
            const response = await axios.post(`${apiUrl}submit-form`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': '*/*',
                    },
                    params: {
                        lang: 'en',
                    }
                },
            );

            const rawData: OCRResults = response.data.image.ocr_results;
            console.log(rawData);
            const parsedData = parseOCRResults(rawData);
            setSurname(parsedData.surname);
            setOtherNames(parsedData.otherNames);
            setDateOfBirth(parsedData.dateOfBirth);
            setPassportNumber(parsedData.passportNumber);
            setIssuedDate(parsedData.issueDate);
            setExpiryDate(parsedData.expiryDate);
            onClose();
            window.alert('Please Verify the extracted data before proceeding');
        } catch (error) {

        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-full w-full p-4 lg:px-80 flex flex-col items-start justify-start">
            <div className="mt-32 mb-5 flex items-start">
                <Link to="/" className="text-blue-500">Home</Link> / <span className="font-bold">New Permit</span>
            </div>
            {/* <PermitApplicationProgress /> */}
            {/* <div></div> */}
            <ApplicantDetailsForm
                surname={surname}
                otherNames={otherNames}
                dateOfBirth={dateOfBirth}
                setSurname={setSurname}
                setOtherNames={setOtherNames}
                setDateOfBirth={setDateOfBirth}
            />
            <RequestDetailsForm
                passportNumber={passportNumber}
                setPassportNumber={setPassportNumber}
                issuedDate={issuedDate}
                setIssuedDate={setIssuedDate}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}


            />
            <AttachmentsForm />
            <div className="flex justify-end mt-5">
                <Button colorScheme="blue">Next</Button>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload Passport Image</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Text>Please upload an image of your passport for automatic data extraction.</Text>
                            <Input type="file" accept="image/*" onChange={handleImageUpload} />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmitImage} isLoading={isLoading}>
                            Submit
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default NewPermit;