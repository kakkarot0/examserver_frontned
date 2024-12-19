import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // To navigate to other pages
import axios from 'axios'; // To make HTTP requests
import { GoogleLogin } from '@react-oauth/google'; // Google Login import
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import FaEye and FaEyeSlash
import './register.css'; // Include your CSS
import PhoneInput from 'react-phone-number-input'; // Import react-phone-number-input

function Register() {
  const [formData, setFormData] = useState({
    userName: '',
    userId: '',
    userDOB: '',
    userCity: '',
    userSchoolOrCollege: '',
    userMob: '',
    userMailId: '',
    userPassword: '',
    confirmuserPassword: '', // Add a confirm userPassword field
  });

    // State for userPassword visibility toggle
    const [userPasswordVisible, setuserPasswordVisible] = useState(false);
    const [confirmuserPasswordVisible, setConfirmuserPasswordVisible] = useState(false);

  const navigate = useNavigate(); // React Router hook to navigate

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (Register)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate userPasswords
    if (formData.userPassword !== formData.confirmuserPassword) {
      alert("Passwords don't match");
      return;
    }

     // Validate password (at least 8 characters, one uppercase, one digit, one special character)
     const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
     if (!passwordRegex.test(formData.userPassword)) {
       alert('Your Password must contain at least 8 characters, Upper-case letters(A-Z), Lower-case letters(a-z), Numbers(0-9) and Special characters(e.g. !@#$%^&*).');
       return;
     }

    // Validate mobile number format (basic validation)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.userMob)) {
      alert("Please enter a valid mobile number.");
      return;
    }

    console.log('Form Data:', formData); // Log the form data to the console

    try {
      // Send POST request to Spring Boot backend for registration
      const response = await axios.post('http://localhost:8808/api/users/create', formData);
      console.log('Registration successful:', response.data);
  
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
  
      // Check if the error is due to duplicate user and extract field info
      if (error.response && error.response.status === 409) { // 409 Conflict (User already exists)
        const { message } = error.response.data; // Assuming backend sends a message like 'User with userId sbl3031 already exists'
        alert(message); // Display the message sent by the backend
      } else {
        alert(`User with userId ${formData.userId} already exists.`);
      }
    }
  };

   // Toggle userPassword visibility
   const toggleuserPasswordVisibility = () => {
    setuserPasswordVisible(!userPasswordVisible);
  };

  const toggleConfirmuserPasswordVisibility = () => {
    setConfirmuserPasswordVisible(!confirmuserPasswordVisible);
  };

  // Handle Google login
  const handleGoogleLogin = async (response) => {
    try {
      // Log the Google response to see the data
      console.log('Google Login Response:', response); // Log the entire Google response object

      const googleToken = response.credential; // The Google ID token
      console.log('Google Token:', googleToken); // Log just the token if needed

      // Send the token to your backend for validation
      const result = await axios.post('http://localhost:8808/api/users/create', { token: googleToken });

      console.log('Google login successful:', result.data);
      // Redirect user to login or dashboard after successful Google login
      navigate('/dashboard'); // or '/login'
    } catch (error) {
      console.error('Google login error:', error);
      alert('Google login failed. Please try again.');
    }
  };

  return (
    <Container fluid className="p-3 my-5 h-custom">
      <Row>
        {/* <Col xs={12} md={6}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Register"
          />
        </Col> */}

        <Col xs={12} md={6} className='register-wrap'>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <h2 className="fw-bold mb-0 mx-3">Registration Info</h2>
        </div>
          {/* Registration Form Inputs */}
          <Form onSubmit={handleSubmit} className='register-form'>
            <Form.Group className="mb-4" controlId="userName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="userId">
              <Form.Label>userId</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="userMailId">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="userMailId"
                value={formData.userMailId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="userDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="userDOB"
                value={formData.userDOB}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="userCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                name="userCity"
                value={formData.userCity}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="userSchoolOrCollege">
              <Form.Label>College</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your college name"
                name="userSchoolOrCollege"
                value={formData.userSchoolOrCollege}
                onChange={handleChange}
                required
              />
            </Form.Group>

             {/* Country Code with Mobile Number */}
             <Form.Group className="mb-4" controlId="userMob">
              <Form.Label>Mobile Number</Form.Label>
              <PhoneInput
                international
                defaultCountry="US" // You can set the default country here (change as needed)
                value={formData.userMob}
                onChange={(value) => setFormData({ ...formData, userMob: value })}
                placeholder="Enter your mobile number"
                name="userMob"
                required
              />
              <Form.Text className="text-muted">
                Enter a valid mobile number (e.g., +1234567890).
              </Form.Text>
            </Form.Group>


            <Form.Group className="mb-4" controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={userPasswordVisible ? 'text' : 'userPassword'}
                  placeholder="Enter userPassword"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <Button
                    variant="link"
                    onClick={toggleuserPasswordVisibility}
                    type="button"
                    className="eye-icon-btn"
                  >
                    {userPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </div>
            </Form.Group>

            <Form.Group className="mb-4" controlId="confirmuserPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={confirmuserPasswordVisible ? 'text' : 'userPassword'}
                  placeholder="Confirm userPassword"
                  name="confirmuserPassword"
                  value={formData.confirmuserPassword}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <Button
                    variant="link"
                    onClick={toggleConfirmuserPasswordVisibility}
                    type="button"
                    className="eye-icon-btn"
                  >
                    {confirmuserPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="gender-details">
                <Form.Label className="gender-title">Gender</Form.Label>

                <div className="category d-flex justify-content-between">
                  <Form.Check
                    type="radio"
                    id="dot-1"
                    name="gender"
                    label="Male"
                    className="gender-radio"
                  />
                  <Form.Check
                    type="radio"
                    id="dot-2"
                    name="gender"
                    label="Female"
                    className="gender-radio"
                  />
                  <Form.Check
                    type="radio"
                    id="dot-3"
                    name="gender"
                    label="Prefer not to say"
                    className="gender-radio"
                  />
                </div>
              </div>
            </Form.Group>

            <div className="text-center text-md-start mt-4 pt-2">
              <Button variant="primary" size="lg" type="submit" className="mb-0 px-5">
                Register
              </Button>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Already have an account?{' '}
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault(); // Prevents default behavior
                    navigate('/login');
                  }}
                  className="link-danger"
                >
                  Login
                </a>
              </p>

            </div>
          </Form>
          <div className="d-flex align-items-center">
            <hr className="hr-divider flex-grow-1" />
            <span>OR</span>
            <hr className="hr-divider flex-grow-1" />
          </div>


          {/* Google Login Button */}
          <div className="text-center mt-4">
            <GoogleLogin 
              onSuccess={handleGoogleLogin} // Handle success
              onError={() => console.log('Google Login Failed')} // Handle error
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;


