import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import './login.css';
import axios from 'axios';
import ForgotPassword from './ForgotPassword'; 

function Login() {
  const [userNameOrEmail, setuserNameOrEmail] = useState('');
  const [userPass, setuserPass] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [token, setToken] = useState(null);



  // State to handle the Forgot Password form view
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate(); // Initialize the navigate function for routing

  const validateForm = () => {
    const newErrors = {};
  
    // Validate userNameOrEmail (email or username)
    if (!userNameOrEmail) {
      newErrors.userNameOrEmail = 'Email or Username is required';
    }
  
    // Validate password in one line
    if (!userPass) {
      newErrors.userPass = 'Password is required';
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(userPass)) {
      newErrors.userPass = "We couldn't find an account with that password.";
    }
  
    return newErrors;
  };
  
  const handleuserPass = () => {};

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      setLoading(true);
      console.log('Login attempted with:', { userNameOrEmail, userPass });

      // Send login request to Spring Boot API
      try {
        const response = await axios.get('http://localhost:8808/api/users/login_user', {
          params: {
            userNameOrEmail,  // Send data as query parameters
            userPass,
          },
        });
        console.log('Login response:', response);

        if (response.status === 200) {
          setLoginSuccess(true);
          setToken(response.data.token); // Store the token (could store in localStorage)
          alert('Login successful!');

          // Redirect to the home page (or dashboard) after successful login
          navigate('/Home');
        }
      } catch (error) {
        console.error('Login failed:', error);
        if (error.message === 'Network Error') {
          setErrors({ general: 'Network error, please check if the backend is running' });
        } else {
          setErrors({ general: error.response?.data?.message || 'Login failed' });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoToRegister = () => {
    navigate('/register'); // Redirect to register page if the user doesn't have an account
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
       <h2 className="login-title">{showForgotPassword ? 'Forgot Password' : 'Login'}</h2>
       {showForgotPassword ? (
          // Show ForgotPassword component
          <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />
        ) : (
          // Show Login form
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-3" controlId="formBasicuserNameOrEmail">
              <Form.Label>UserName Or Email address</Form.Label>
              <Form.Control
                type="userNameOrEmail"
                placeholder="Enter UserName Or Email"
                value={userNameOrEmail}
                onChange={(e) => setuserNameOrEmail(e.target.value)}
                isInvalid={!!errors.userNameOrEmail}
              />
               <Form.Control.Feedback type="invalid">
              {errors.userNameOrEmail}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicuserPass">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="userPass"
                placeholder="Password"
                value={userPass}
                onChange={(e) => setuserPass(e.target.value)}
                isInvalid={!!errors.userPass}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.userPass}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="checkbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit" className="login-button">
              Login
            </Button>
            <div className="d-grid justify-content-end">
              <Button
                className="text-muted px-0"
                variant="link"
                onClick={() => setShowForgotPassword(true)}
              >
              Forgot Password?
              </Button>

             </div>
            <div className="text-center mt-3">
              <p>Don't have an account?</p>
              <Button variant="link" onClick={handleGoToRegister}>
                Register here
              </Button>
            </div>
          </Form>
           )}
      </div>
    </div>
  );
}

export default Login;

