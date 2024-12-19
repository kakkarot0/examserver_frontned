import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useSearchParams } from "react-router-dom";

const QuizPage = () => {
  const { quizId } = useParams();
  const [searchParams] = useSearchParams();
  
  const fromDuplicateTab = searchParams.get("fromDuplicateTab");

  useEffect(() => {
    if (fromDuplicateTab) {
      showCustomToast("Don't go back or refresh this tab during the test!");
    }
  }, [fromDuplicateTab]);

  const showCustomToast = (message) => {
    toast(message, {
      autoClose: 500000,
      // closeOnClick: true,
      closeButton: false,
      draggable: false,
      className: "custom-toast",
      bodyClassName: "custom-toast-body",
      style: {
        position: "relative",
       // top: "20%", // Adjust this to your desired top position
        right: "20%", // Adjust this to your desired left position
        width: "130%", // Set the width of the toast message
        bottom:"40%",
        backgroundColor: "white",
        color: "black",
        zIndex: 1050,
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        wordWrap: "break-word", // Ensure text wraps to fit the container
        whiteSpace: "normal", // Allow multi-line text
      },
    });
  };

  return (
    <div style={{ width: "100%", height: "100vh", padding: "20px" }}>
      <iframe
        src={`https://quizzory.in/id/${quizId}`}
        title="Quiz Page"
        width="100%"
        height="100%"
        style={{ border: "1px solid #ccc" }}
      />
      <ToastContainer />
    </div>
  );
};

export default QuizPage;
