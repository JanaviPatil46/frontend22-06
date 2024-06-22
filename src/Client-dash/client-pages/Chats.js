import React, { useState } from 'react'; // Import useState from React
import './chat.css';
import { FaTelegramPlane } from 'react-icons/fa';

const Chats = () => {
  const [showTasks, setShowTasks] = useState(false);
  
  const toggleTasks = () => {
    setShowTasks(!showTasks);
  };

  return (
    <div className="client-chats">
      <div className="chat_tasks">
        <h2>Chats & Tasks</h2>
        <div className="newchat-filter">
          <button className="btn1">New chats</button>
          <button className="btn2">filter</button>
        </div>
      </div>

      <div className="select-chat">
        <div
          style={{ border: '1px solid red' }}
          className="client-chat-right"
          onClick={toggleTasks}
        >
          <div className="Chat_with_SNP ">
            <div style={{display:'flex'}} className="snp_tax_Financials">
              <FaTelegramPlane
                style={{ color: 'purple', fontSize: '20px', marginTop: '10px' }}
              />
              <p>Chat with SNP Tax & Financials</p>
            </div>
            <span>Hi Vinayak, Thank you for sharing the missing information.</span>
            <hr/>

            <div className="missing-info">
              <FaTelegramPlane
                style={{ color: 'purple', fontSize: '20px', marginTop: '10px' }}
              />
              <p>Sample Missing Info March 14</p>
            </div>
            <span>Hi Vinayak, Thank you for sharing the missing information.</span>
              <hr/>
          </div>
        </div>
        <div style={{ border: '1px solid blue' }} className="2"></div>
        {showTasks && (
          <div style={{ border: '1px solid green' }} className="3">
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Your Tasks</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
