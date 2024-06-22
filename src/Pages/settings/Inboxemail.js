import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mailbox.css'; // Import custom CSS for styling


const Inboxemail = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/emails', {
          withCredentials: true, // Include session information
        });

        setEmails(response.data); // Store detailed email information
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError('Failed to fetch emails'); // Set error message
        console.error('Error fetching email details:', error); // Log error
        setLoading(false); // Set loading to false on error
      }
    };

    fetchEmails(); // Fetch detailed emails when component mounts
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div className="error">{error}</div>; // Display error message if fetching fails
  }

  if (emails.length === 0) {
    return <div className="no-emails">No emails found.</div>; // Handle empty email list
  }

  return (
    <div className="mailbox-container"> {/* Container with custom styling */}
      <h1>Inbox</h1>
 
      <ul className="email-list"> {/* Apply styles to the list */}
        {emails.map((email) => (
          <li key={email.id} className="email-item"> {/* Styled list item */}
            <div className="email-header"> {/* Styled email header */}
              <strong>Subject:</strong> {email.subject}
            </div>
            <div className="email-details"> {/* Styled email details */}
              <strong>From:</strong> {email.from} <br />
              <strong>Email ID:</strong> {email.id} <br />
              <strong>Body:</strong> {email.body || 'No content'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inboxemail;
