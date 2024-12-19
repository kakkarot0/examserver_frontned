import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import UploadResult from "./uploadResult"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

const CreateTest = () => {
  const [testInfo, setTestInfo] = useState({
    testName: "",
    testLink: "",
    testType: "Practice", // Initialize with "Practice" by default
    testDesc: "",
    startTime: "",
    endTime: "",
    timeDuration: 0,
    userId: "",
    testTotalMarks: 0,
  });

  const [isLiveTest, setIsLiveTest] = useState(false); // To toggle between Live Test and Practice Test
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [testId, setTestId] = useState(""); // For uploading the result CSV

  useEffect(() => {
    // Set testType conditionally without causing re-render loop
    const updatedTestType = isLiveTest ? "Live" : "Practice"; // Map isLiveTest to "Live" or "Practice"
    setTestInfo((prev) => ({
      ...prev,
      testType: updatedTestType,
    }));
  }, [isLiveTest]); // Trigger only when `isLiveTest` changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestInfo({
      ...testInfo,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleTestTypeChange = (e) => {
    const selectedType = e.target.value;
    setIsLiveTest(selectedType === "Live");
    setTestInfo({
      ...testInfo,
      testType: selectedType, // Directly update testType based on the selected option
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const testPayload = isLiveTest
      ? {
          testName: testInfo.testName,
          testDesc: testInfo.testDesc,
          testType: "RankBooster",
          startTime: testInfo.startTime,
          endTime: testInfo.endTime,
          testLink: testInfo.testLink,
          userId: testInfo.userId,
        }
      : {
          testName: testInfo.testName,
          testDesc: testInfo.testDesc,
          testType: testInfo.testType,
          startTime: testInfo.startTime,
          testLink: testInfo.testLink,
          timeDuration: testInfo.timeDuration,
          testTotalMarks: testInfo.testTotalMarks,
          userId: testInfo.userId,
        };

    try {
      const res = await axios.post("http://localhost:8808/api/tests/create", testPayload);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error creating test");
    }
  };

  const handleUploadResults = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("testId", testId);

    try {
      const res = await axios.post("http://localhost:8808/api/tests/upload-results", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      alert("Results uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading results.");
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-3">Create Test</h1>
      <Container>
        {/* Test Type Selection */}
        <div className="form-group">
          <Label for="testType">Select Test Type:</Label>
          <select
            name="testType"
            onChange={handleTestTypeChange}
            value={testInfo.testType} // Make sure the dropdown value is controlled by testInfo.testType
          >
            <option value="Practice">Practice Test</option>
            <option value="Live">Live Test</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="testName">Test Name</Label>
            <Input
              type="text"
              name="testName"
              placeholder="Test Name"
              value={testInfo.testName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="testLink">Test Link</Label>
            <Input
              type="url"
              name="testLink"
              placeholder="Test Link"
              value={testInfo.testLink}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="userId">User ID</Label>
            <Input
              type="text"
              name="userId"
              placeholder="User ID"
              value={testInfo.userId}
              onChange={handleChange}
              required
            />
          </FormGroup>

          {/* Conditional Fields based on Test Type */}
          {testInfo.testType === "Live" ? (
            <>
              <FormGroup>
                <Label for="startTime">Test Start Time</Label>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={testInfo.startTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="endTime">Test End Time</Label>
                <Input
                  type="datetime-local"
                  name="endTime"
                  value={testInfo.endTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup>
                <Label for="testDesc">Test Description</Label>
                <Input
                  type="text"
                  name="testDesc"
                  value={testInfo.testDesc}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="startTime">Test Start Time</Label>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={testInfo.startTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="timeDuration">Test Duration (minutes)</Label>
                <Input
                  type="number"
                  name="timeDuration"
                  value={testInfo.timeDuration}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="testTotalMarks">Test Total Marks</Label>
                <Input
                  type="number"
                  name="testTotalMarks"
                  value={testInfo.testTotalMarks}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </>
          )}

          <Button type="submit" color="primary">
            Create Test
          </Button>
        </form>

        {/* Display Response */}
        {response && (
          <div>
            <h2>Test Created Successfully:</h2>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Upload Test Results */}
        <h2 className="my-4">Upload Test Results</h2>
        <UploadResult/>
        {/* <form onSubmit={handleUploadResults}>
          <FormGroup>
            <Label for="testId">Enter Test ID</Label>
            <Input
              type="text"
              name="testId"
              value={testId}
              onChange={(e) => setTestId(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="csvFile">Upload CSV File</Label>
            <Input type="file" name="csvFile" onChange={handleFileChange} required />
          </FormGroup>
          <Button type="submit" color="secondary">
            Upload Results
          </Button>
        </form> */}
      </Container>
    </Fragment>
  );
};

export default CreateTest;
