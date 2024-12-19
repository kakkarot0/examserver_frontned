
// import React, { useState } from "react";

// const PracticeTest = () => {
//   // Mock data for categories and tests
//   const categories = [
//     {
//       name: "Accenture",
//       tests: [
//         { id: 1, name: "Logical Reasoning", link: "https://quizzory.in/id/6713cdc9906355109d1eb4e0" },
//         { id: 2, name: "Aptitude", link: "https://quizzory.in/id/124" },
//         { id: 3, name: "Problem Solving", link: "https://quizzory.in/id/131" },
//       ],
//     },
//     {
//       name: "TCS",
//       tests: [
//         { id: 4, name: "Coding Basics", link: "https://quizzory.in/id/6713cdc9906355109d1eb4e0" },
//         { id: 5, name: "Advanced Problem Solving", link: "https://quizzory.in/id/126" },
//       ],
//     },
//     {
//       name: "Infosys",
//       tests: [
//         { id: 6, name: "Technical MCQs", link: "https://quizzory.in/id/127" },
//         { id: 7, name: "Verbal Ability", link: "https://quizzory.in/id/128" },
//         { id: 8, name: "Critical Thinking", link: "https://quizzory.in/id/132" },
//         { id: 9, name: "Coding Challenge", link: "https://quizzory.in/id/133" },
//       ],
//     },
//     {
//       name: "Impetus",
//       tests: [
//         { id: 10, name: "General Knowledge", link: "https://quizzory.in/id/129" },
//         { id: 11, name: "Data Interpretation", link: "https://quizzory.in/id/130" },
//       ],
//     },
//   ];

//   const [expandedCategories, setExpandedCategories] = useState({});

//   // Toggle showing all tests or limited tests
//   const toggleViewMore = (categoryIndex) => {
//     setExpandedCategories((prev) => ({
//       ...prev,
//       [categoryIndex]: !prev[categoryIndex],
//     }));
//   };

//   // Redirect to test page
//   const startTest = (link) => {
//     window.open(link, "_blank"); // Open test in a new tab
//   };

//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h1 style={{ marginBottom: "20px" }}>Practice Tests</h1>
//       {categories.map((category, index) => {
//         const isExpanded = expandedCategories[index];
//         const visibleTests = isExpanded ? category.tests : category.tests.slice(0, 2);

//         return (
//           <div
//             key={index}
//             style={{
//               marginBottom: "30px",
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               padding: "15px",
//               maxWidth: "600px",
//               margin: "20px auto",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//             }}
//           >
//             <h2 style={{ marginBottom: "10px", textDecoration: "underline" }}>
//               {category.name}
//             </h2>
//             {category.tests.length > 0 ? (
//               <ul style={{ listStyle: "none", padding: 0 }}>
//                 {visibleTests.map((test) => (
//                   <li
//                     key={test.id}
//                     style={{
//                       marginBottom: "10px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span>{test.name}</span>
//                     <button
//                       onClick={() => startTest(test.link)}
//                       style={{
//                         backgroundColor: "#007bff",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "4px",
//                         padding: "8px 15px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Start Test
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No tests available in this category.</p>
//             )}
//             {category.tests.length > 2 && (
//               <button
//                 onClick={() => toggleViewMore(index)}
//                 style={{
//                   marginTop: "10px",
//                   backgroundColor: "#28a745",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   padding: "8px 15px",
//                   cursor: "pointer",
//                 }}
//               >
//                 {isExpanded ? "View Less" : "View More"}
//               </button>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default PracticeTest;




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
      .get("http://localhost:8808/api/tests/showPracticeTest") // Replace with your backend URL
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
