import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
// import './ForgotPassword.css'; // Custom styles (optional)

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure email is valid
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://your-backend-api.com/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset email sent! Please check your inbox.');
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('There was an issue connecting to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-wrapper">
    <Container className="forgot-password-container">
      <Row className="justify-content-center">
        <Col md={6}>
           <Form onSubmit={handleSubmit} className="forgot-form">
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>

              {/* Display success or error message */}
            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
            {error && !message && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <Button type="submit" disabled={loading} variant="primary" className="mt-4 w-100">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button variant="link" onClick={onBackToLogin} className="text-muted">
              Back to Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ForgotPassword;

