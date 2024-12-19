import React, { useState, useEffect } from "react";
import axios from "axios"; // To fetch data from the backend
import Course from "./course";
import { Container, Row, Col } from "reactstrap";

const LiveContests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch test data from the backend
  useEffect(() => {
    document.title = "All Tests";
    axios
      .get("http://localhost:8808/api/tests/showLiveTest") // Replace with your backend URL
      .then((response) => {
        setTests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tests", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <h1 className="text-center my-4">Live Quizzes</h1>
      <p className="text-center">List of available tests:</p>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : tests.length > 0 ? (
        <Row>
          {tests.map((test) => (
            <Col key={test.testId} sm="12" md="6" lg="4" className="mb-4">
              <Course test={test} />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No tests available</p>
      )}
    </Container>
  );
};

export default LiveContests;
