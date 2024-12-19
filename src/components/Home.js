import React, { useEffect, useState } from "react";
import { CardTitle, CardText, CardBody, Button, Container, Row } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Home";
        // Check if token exists in localStorage
        const token = localStorage.getItem('userToken');
        if (!token) {
        navigate('/login'); // Redirect to login if no token
        }

        // Optionally fetch user data using the token
        const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Or fetch from an API
        if (userInfo) {
            setUser(userInfo); // Set user info to state
        }
     }, [navigate]);

    return(
        <div className="text-center">
        <h1>Welcome {user?.userName}</h1> {/* Display user's name */}
        <CardBody className=" p-5 bg-secondary text-white rounded" >
            <CardTitle className="display-5">Learncodewith Durgesh</CardTitle>
            <CardText>This is developed by Learncodewith Durgesh for learning purpose. Its backend is on spring boat and frontend on react.js.</CardText>
            <Container>
                <Button color="dark" outline> Go somewhere</Button>
            </Container>
        </CardBody>
        </div>
    );
}

export default Home;