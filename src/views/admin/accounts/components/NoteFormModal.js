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
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, date } from 'yup';
import axios from 'axios';

const validationSchema = object().shape({
    note: string().required('Note is required'),
    date: date().required('Date is required'),
});

const initialValues = {
    note: '',
    date: new Date().toISOString().substring(0, 10)
};

export default function NoteFormModal({ account, isOpen, onClose }) {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const sendToServer = (values, { setSubmitting }) => {
        const handleResponse = (message, data) => {
            setSubmitting(false);
            onClose();
        };
        console.log(values);
        if (account) {
            axios.post(`${backendUrl}/accounts/${account.id}/history/note`, values)
                .then(response => {
                    handleResponse('Successfully created item', response.data);
                })
                .catch(error => {
                    handleResponse('Error creating item', error);
                });
        };
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Note</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={sendToServer}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <FormControl isInvalid={errors.date && touched.date} mt={2}>
                                    <Field as={Input} id="date" name="date" placeholder="Date" type="date" variant="flushed" />
                                    <FormErrorMessage><ErrorMessage name="date" /></FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.note && touched.note}>
                                    <Field as={Input} id="note" name="note" placeholder="Note" type="text" variant="flushed" />
                                    <FormErrorMessage><ErrorMessage name="note" /></FormErrorMessage>
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
