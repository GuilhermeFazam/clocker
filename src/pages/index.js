import { Container, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Login, Schedule } from "../components";
import { firebaseClient } from "../config/firebase";

export default function Home() {
    // const authenticatedUser = firebase.auth().currentUser;

    const [auth, setAuth] = useState({
        loading: true,
        user: false,
    });

    useEffect(() => {
        firebaseClient.auth().onAuthStateChanged((user) => {
            setAuth({ loading: false, user });
        });
    }, []);

    if (auth.loading) {
        return (
            <Container p={8} centerContent>
                <Spinner />
            </Container>
        );
    }
    return auth.user ? <Schedule /> : <Login />;
}
