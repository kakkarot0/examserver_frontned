import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
} from "reactstrap";

const Course = ({ test }) => {
  const navigate = useNavigate();
  const [duplicateTab, setDuplicateTab] = useState(null);
  const [testStarted, setTestStarted] = useState(false);

  // Function to extract testId dynamically from testLink
  const extractTestId = (testLink) => {
    try {
      const url = new URL(testLink);
      return url.pathname.split('/').pop(); // Extract the last segment of the path
    } catch (error) {
      console.error("Invalid test link provided:", testLink);
      return null;
    }
  };

  const handleClick = (testLink) => {
    const testId = extractTestId(testLink);

    if (!testId) {
      alert("Unable to start the test. Invalid test link.");
      return;
    }

    if (duplicateTab && !duplicateTab.closed) {
      // Focus on the already opened tab
      duplicateTab.focus();
    } else {
      // Open the test in a new tab with the dynamic testId
      const newTab = window.open(`/quiz/${testId}?fromDuplicateTab=true`, "_blank");
      setDuplicateTab(newTab);
      setTestStarted(true);
    }
  };

  const handleShowResult = () => {
    if (test.hideTestInfo) {
      alert("Result will be updated soon.");
      return;
    }
    const testId = test.testId;
    if (!testId) {
      alert("Unable to fetch results. Invalid test link.");
      return;
    }
    navigate(`/results?testId=${testId}`); // Navigate to the results page with the testId
  };

  return (
    <Card className="text-center shadow">
      <CardBody>
        <CardTitle tag="h5">{test.testName || "Test Name Not Available"}</CardTitle>
        {test.startTime && (
          <CardSubtitle className="mb-2 text-muted">
            Start Time: {new Date(test.startTime).toLocaleString()}
          </CardSubtitle>
        )}
        <CardText>
          Provided by: <strong>{test.providerName || "Unknown Provider"}</strong>
        </CardText>
        <Container>
          <Button
            color={testStarted ? "primary" : "success"}
            className="m-2"
            onClick={() => handleClick(test.testLink)}
          >
            {testStarted ? "Resume Test" : "Start Test"}
          </Button>
          <Button color="info" className="m-2" onClick={handleShowResult}>
            Show Results
          </Button>
        </Container>
      </CardBody>
    </Card>
  );
};

export default Course;

