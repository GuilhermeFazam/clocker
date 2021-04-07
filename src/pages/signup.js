import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { Logo } from "../components";
import { firebaseClient } from "../config/firebase/client";

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Email inválido")
        .required("Preenchimento obrigatório"),
    password: yup.string().required("Preenchimento obrigatório"),
    username: yup.string().required("Preenchimento obrigatório"),
});

export default function Home() {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = useFormik({
        onSubmit: async (values, form) => {
            try {
                const user = await firebaseClient
                    .auth()
                    .createUserWithEmailAndPassword(
                        values.email,
                        values.password
                    );
                console.log(user);
            } catch (error) {
                console.error("ERROR:", error);
            }
        },
        validationSchema,
        initialValues: {
            email: "",
            username: "",
            password: "",
        },
    });
    return (
        <Container p={4} centerContent>
            <Logo />
            <Box p={4} mt={8}>
                <Text>Crie sua agenda compartilhada!</Text>
            </Box>
            <Box>
                <FormControl p={4} id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        size="lg"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.email && (
                        <FormHelperText textColor="#e74c3c">
                            {errors.email}
                        </FormHelperText>
                    )}
                </FormControl>

                <FormControl p={4} id="password" isRequired>
                    <FormLabel>Senha</FormLabel>
                    <Input
                        size="lg"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.password && (
                        <FormHelperText textColor="#e74c3c">
                            {errors.password}
                        </FormHelperText>
                    )}
                </FormControl>

                <FormControl p={4} id="username" isRequired>
                    <InputGroup size="lg">
                        <InputLeftAddon children="clocker.work/" />
                        <Input
                            size="lg"
                            type="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </InputGroup>
                    {touched.username && (
                        <FormHelperText textColor="#e74c3c">
                            {errors.username}
                        </FormHelperText>
                    )}
                </FormControl>
                <Box p={4}>
                    <Button
                        colorScheme="blue"
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        width="100%"
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Box>
            <Link href="/">Já tem conta? Entre aqui!</Link>
        </Container>
    );
}
