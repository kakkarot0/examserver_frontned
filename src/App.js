import React, { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import useLocation from react-router-dom
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./components/Home";
import Allcourses from "./components/LiveContest";
import Header from "./components/Header";
import LiveContest from "./components/LiveContest";
import CreateTest from "./components/createTest";
import QuizPage from "./components/QuizPage";
import NavigationBar from "./components/Navbar";
import ResultsPage from "./components/ResultsPage";
import PracticeTest from "./components/PracticeTest";
import Login from "./components/login";
import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import "react-phone-number-input/style.css";

const clientId = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google OAuth client ID


// Define the main App component
function App() {
  const [disableLiveContest, setDisableLiveContest] = useState(false);

  const btnhandle = () => {
    toast.error("Done!", {
      position: "top-center",
    });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div>
          <Header />
          <NavigationBar />
          {/* Render the rest of the content */}
          <ToastContainer />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view-course" element={<Allcourses />} />
            <Route path="/live-contest" element={<LiveContest />} />
            <Route path="/create-test" element={<CreateTest />} />
            <Route path="/quiz/:quizId" element={<QuizPage />} />
            <Route path="/practice-test" element={<PracticeTest />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
