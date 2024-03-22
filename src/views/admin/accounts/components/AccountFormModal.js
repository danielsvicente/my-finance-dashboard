import React from 'react';
import { 
    Modal, 
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    FormControl,
    Input,
    FormErrorMessage,
    Select,
    useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    type: Yup.string().required('Type is required'),
    balance: Yup.number().required('Balance is invalid').typeError('Balance must be a number'),
    currency: Yup.string().required('Currency is required'),
});

export default function AccountFormModal({ account, isOpen, onClose }) {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const sendToServer = (values, setSubmitting) => {
        const handleResponse = (message, data) => {
            setSubmitting(false);
            onClose();
        };
        if (account) {
            axios.put(`${backendUrl}/accounts/${account.id}`, values)
                .then(response => {
                    handleResponse('Successfully created item', response.data);
                })
                .catch(error => {
                    handleResponse('Error creating item', error);
                });
            } else {
                axios.post(`${backendUrl}/accounts`, values)
                .then(response => {
                    handleResponse('Successfully created item', response.data);
                })
                .catch(error => {
                    handleResponse('Error creating item', error);
                });
        }
    };

    const textColor = useColorModeValue("secondaryGray.900", "white");
    
      return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{account ? "Edit account" : "Create account"}</ModalHeader>
                <ModalCloseButton />
          {/* <Modal.Header toggle={toggle}>Operation Modal</Modal.Header> */}
            <ModalBody>
                <Formik
                    initialValues={{ 
                        name:     ( account ? account.name : '' ),
                        type:     ( account ? account.type : '' ), 
                        balance:  ( account ? account.balance : '' ), 
                        currency: ( account ? account.currency : '' ),
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        sendToServer(values, setSubmitting);
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <FormControl isInvalid={errors.name && touched.name}>
                            {/* <FormLabel htmlFor="name">Name</FormLabel> */}
                            {/* <Field as={Input} id="name" name="name" placeholder="Name" type="text" borderRadius="12px"/> */}
                            <Field as={Input} id="name" name="name" placeholder="Name" type="text" variant="flushed" />
                            <FormErrorMessage><ErrorMessage name="name" /></FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.type && touched.type} mt={2}>
                            {/* <FormLabel htmlFor="type">Type</FormLabel>
                            <Field as={Input} id="type" name="type" placeholder="Type" type="text" borderRadius="12px" /> */}
                            <Field as={Select} id="type" name="type" placeholder="Type" type="text" variant="flushed" >
                                <option>CURRENT</option>
                                <option>INVESTMENT</option>
                            </Field>
                            <FormErrorMessage><ErrorMessage name="type" /></FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.balance && touched.balance} mt={2}>
                            {/* <FormLabel htmlFor="balance">Balance</FormLabel>
                            <Field as={Input} id="balance" name="balance" placeholder="Balance" type="number" borderRadius="12px" /> */}
                            <Field as={Input} id="balance" name="balance" placeholder="Balance" type="number" variant="flushed" />
                            <FormErrorMessage><ErrorMessage name="balance" /></FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.currency && touched.currency} mt={2}>
                            {/* <FormLabel htmlFor="currency">Currency</FormLabel>
                            <Field as={Input} id="currency" name="currency" placeholder="Currency" type="text" borderRadius="12px" /> */}
                            <Field as={Select} id="currency" name="currency" placeholder="Currency" type="text" variant="flushed" >
                                <option>BRL</option>
                                <option>EUR</option>
                            </Field>
                            <FormErrorMessage><ErrorMessage name="currency" /></FormErrorMessage>
                            </FormControl>

                            <Flex mt={10} direction="row-reverse">
                                <Button colorScheme="brand" isLoading={isSubmitting} type="submit">
                                    Save
                                </Button>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );

};
