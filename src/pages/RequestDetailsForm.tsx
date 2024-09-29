import React from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Select,
    Input,
    Grid,
    GridItem,
    Heading,
    Text,
    Radio,
    RadioGroup,
    Stack,
} from '@chakra-ui/react';

interface RequestDetailsFormProps {
    passportNumber: string;
    setPassportNumber: (passportNumber: string) => void;
    issuedDate: Date;
    setIssuedDate: (issuedDate: Date) => void;
    expiryDate: Date;
    setExpiryDate: (expiryDate: Date) => void;
}


const RequestDetailsForm: React.FC<RequestDetailsFormProps> = ({
    passportNumber,
    setPassportNumber,
    issuedDate,
    setIssuedDate,
    expiryDate,
    setExpiryDate,
}) => {
    return (
        <Box borderRadius="lg" className="bg-white shadow-md rounded-lg w-full mt-5 border border-blue-700">
            <Heading as="h2" borderTopRadius="lg" size="lg" className="mb-6 bg-blue-300 p-4 sm:p-6 border-b-2 border-b-blue-700" textAlign="left">
                Request & Travel Details
            </Heading>

            <Grid className='p-4 sm:p-6' templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <Heading as="h3" size="md" className="mb-2" textAlign="left">Desired permit details</Heading>
                </GridItem>

                <FormControl isRequired>
                    <FormLabel>Permit Type</FormLabel>
                    <Select placeholder="Select permit type">
                        <option>Study and Research</option>
                        <option>Diplomat</option>
                        <option>Dependant</option>
                        <option>Business Innovator</option>
                        <option>Employment</option>
                        <option>Other Permit Categories</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Class</FormLabel>
                    <Select placeholder="Select class">
                        <option>H7 Recherche
                            professionnelle (la
                            personne n'est
                            accreditee dans aucune
                            école, centre de
                            formation
                            professionnelle ou de
                            recherche, ou toute
                            autre institution
                            d'apprentissage)</option>
                        <option>U2 Stagiaire
                            professionnel. Un
                            étranger qui entreprend
                            une formation ou une
                            recherche academique
                            dans le but de valoriser
                            ses competences
                            professionnelles.</option>
                        <option>P2 Student (of a
                            recognized institution of
                            high learning in
                            Rwanda working during
                            his/her holidays)</option>
                        <option>U1 Etudiant (qui est au
                            Rwanda a des fins
                            d'études)</option>

                    </Select>
                </FormControl>

                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <Heading as="h3" size="md" className="mb-2 mt-4" textAlign="left">Current travel document details</Heading>
                </GridItem>

                <FormControl isRequired>
                    <FormLabel>Document type</FormLabel>
                    <Select placeholder="Select document type">
                        <option>Ordinary passport</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Document number</FormLabel>
                    <Input placeholder="Enter document number" defaultValue="674835906"
                        onChange={(e) => setPassportNumber(e.target.value)}
                        value={passportNumber}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Issued date</FormLabel>
                    <Input type="date"
                        defaultValue="2020-10-08"
                        onChange={(e) => setIssuedDate(new Date(e.target.value))}
                        value={issuedDate.toDateString()}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Expiry Date</FormLabel>
                    <Input type="date" defaultValue="2030-10-08"
                        onChange={(e) => setExpiryDate(new Date(e.target.value))}
                        value={expiryDate.toDateString()}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Collection Office</FormLabel>
                    <Select placeholder="Select collection office" disabled={true}>
                        <option>Collection Office</option>
                    </Select>
                </FormControl>

                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <Heading as="h3" size="md" className="mb-2 mt-4" textAlign="left">Dependent Details</Heading>
                </GridItem>

                <FormControl as="fieldset">
                    <FormLabel as="legend">Do you have dependents?</FormLabel>
                    <RadioGroup defaultValue="No">
                        <Stack direction="row">
                            <Radio value="Yes">Yes</Radio>
                            <Radio value="No">No</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>

                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <Text className="text-right text-sm text-gray-600">Service Fee: RWF 20000</Text>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default RequestDetailsForm;