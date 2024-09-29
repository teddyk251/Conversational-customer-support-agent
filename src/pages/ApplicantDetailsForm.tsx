import React from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Radio,
    RadioGroup,
    Stack,
    Grid,
    GridItem,
    Heading,
} from '@chakra-ui/react';

interface ApplicantDetailsFormProps {
    surname: string;
    otherNames: string;
    dateOfBirth: Date;
    setSurname: (surname: string) => void;
    setOtherNames: (otherNames: string) => void;
    setDateOfBirth: (dateOfBirth: Date) => void;
}

const ApplicantDetailsForm: React.FC<ApplicantDetailsFormProps> = (
    { surname, otherNames, dateOfBirth, setSurname, setOtherNames, setDateOfBirth }
) => {
    return (
        <Box borderRadius="lg" className="bg-white shadow-md rounded-lx w-full mt-5 border border-blue-700">
            <Heading as="h2" borderTopRadius="lg" size="lg" className="mb-6 bg-blue-300 p-4 sm:p-6 border-b-2 border-b-blue-700" textAlign="left">Applicant Details</Heading>

            <Grid className='class p-4 sm:p-6' templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <Heading as="h3" size="md" className="mb-2" textAlign="left">Demographic details</Heading>
                </GridItem>

                <FormControl isRequired>
                    <FormLabel>Surname</FormLabel>
                    <Input placeholder="Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}


                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Other names</FormLabel>
                    <Input placeholder="Other names"
                        value={otherNames}
                        onChange={(e) => setOtherNames(e.target.value
                        )} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Date of birth</FormLabel>
                    <Input type="date"
                        value={dateOfBirth.toString()}
                        onChange={(e) => setDateOfBirth(new Date(e.target.value))}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Profession</FormLabel>
                    <Select placeholder="Select profession">
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Occupation</FormLabel>
                    <Select placeholder="Select occupation">
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </Select>
                </FormControl>

                <FormControl as="fieldset" isRequired>
                    <FormLabel as="legend">Gender</FormLabel>
                    <RadioGroup>
                        <Stack direction="row">
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Civil Status</FormLabel>
                    <Select placeholder="Select civil status">
                        <option>Single</option>
                        <option>Married</option>
                        <option>Divorced</option>
                        <option>Widowed</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Father's name</FormLabel>
                    <Input placeholder="Enter father's names" />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Mother's name</FormLabel>
                    <Input placeholder="Enter mother's names" />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Country of Birth</FormLabel>
                    <Select placeholder="Select country">
                        <option>Country 1</option>
                        <option>Country 2</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>City of Birth</FormLabel>
                    <Input placeholder="City of Birth" />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Nationality</FormLabel>
                    <Select placeholder="Select country">
                        <option>Country 1</option>
                        <option>Country 2</option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Other Nationality</FormLabel>
                    <Select placeholder="Select country">
                        <option>Country 1</option>
                        <option>Country 2</option>
                    </Select>
                </FormControl>

                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <Heading as="h3" size="md" className="mb-2 mt-4" textAlign="left">Residence Details</Heading>
                </GridItem>

                <FormControl isRequired>
                    <FormLabel>Province</FormLabel>
                    <Select placeholder="Select province">
                        <option>Province 1</option>
                        <option>Province 2</option>
                    </Select>
                </FormControl>

                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <Heading as="h3" size="md" className="mb-2 mt-4" textAlign="left">Contact Details</Heading>
                </GridItem>

                <FormControl isRequired>
                    <FormLabel>Telephone number for contact</FormLabel>
                    <Input type="tel" placeholder="+250 781234567" />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" placeholder="Email address" />
                </FormControl>
            </Grid>
        </Box>
    );
};

export default ApplicantDetailsForm;