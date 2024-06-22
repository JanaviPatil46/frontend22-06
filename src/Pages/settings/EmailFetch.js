import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmailFetch() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState(''); // Track the email input

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dashboard', {
          withCredentials: true, // Include session information
        });
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus(); // Check authentication status on component mount
  }, []);

  const handleLogin = () => {
    window.location.href = `http://localhost:5000/auth/google?email=${email}`; // Redirect to Google OAuth
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/logout', {
        withCredentials: true, // Ensure session information is included
      });

      // Clear user data and redirect or update the UI

      console.log('Logout successful');
      window.location.reload();
    } catch (error) {
      console.error('Error during logout:', error); // Handle errors
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email input
        />
        <button onClick={handleLogin}>Synk  Email</button> {/* Login button */}
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user?.profile?.displayName || 'Guest'}!</h1> {/* Welcome message */}
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
}

export default EmailFetch;
