import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { Logo } from "../components";
import firebase, { persistenceMode } from "../config/firebase";

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Email inválido")
        .required("Preenchimento obrigatório"),
    password: yup.string().required("Preenchimento obrigatório"),
});

export default function SignIn() {
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
            firebase.auth().setPersistence(persistenceMode);
            try {
                const user = await firebase
                    .auth()
                    .signInWithEmailAndPassword(values.email, values.password);
                console.log(user);
            } catch (error) {
                console.error("ERROR:", error);
            }
        },
        validationSchema,
        initialValues: {
            email: "",
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
                <Box p={4}>
                    <Button
                        colorScheme="blue"
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        width="100%"
                    >
                        Entrar
                    </Button>
                </Box>
            </Box>
            <Link href="/signup">Não tem conta? Cadastre-se aqui!</Link>
        </Container>
    );
}
