import { Spinner, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Login, Schedule } from "../components";
import firebase from "../config/firebase";

export default function Home() {
    // const authenticatedUser = firebase.auth().currentUser;

    const [auth, setAuth] = useState({
        loading: true,
        user: false,
    });

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
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

    // console.log(authenticatedUser);
    return auth.user ? <Schedule /> : <Login />;
}
