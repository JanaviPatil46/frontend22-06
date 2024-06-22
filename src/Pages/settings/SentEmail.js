import React, { useEffect, useState } from 'react';
import axios from 'axios';
  // Optional CSS for styling

const SentEmail = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sent-emails', {
          withCredentials: true, // Include session information
        });

        setSentEmails(response.data); // Store sent emails
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError('Failed to fetch sent emails'); // Set error message
        console.error('Error fetching sent emails:', error); // Log error
        setLoading(false); // Set loading to false on error
      }
    };

    fetchSentEmails(); // Fetch sent emails when component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetching fails
  }

  if (sentEmails.length === 0) {
    return <div>No sent emails found.</div>; // Handle empty sent email list
  }

  return (
    <div className="sent-emails-container"> {/* Container with custom styling */}
      <h1>Sent Emails</h1>
      <ul className="sent-email-list"> {/* Apply styles to the list */}
        {sentEmails.map((email) => (
          <li key={email.id} className="sent-email-item"> {/* Styled list item */}
            <div className="sent-email-header"> {/* Styled email header */}
              <strong>Subject:</strong> {email.subject} <br />
              <strong>To:</strong> {email.to} {/* Display recipient of the sent email */}
            </div>
            <div className="sent-email-details"> {/* Styled email details */}
              <strong>Body:</strong> {email.body || 'No content'} {/* Display email body */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SentEmail;
