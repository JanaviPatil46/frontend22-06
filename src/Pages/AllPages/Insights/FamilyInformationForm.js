import React, { useState } from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
const FamilyInformationForm = () => {
   
    const [statusButton, setStatusButton] = useState('');
    const handleButtonClickStatus = (buttonName) => {
        setStatusButton(buttonName);
      
    };
   
    const [selectedButtonFirstYear, setSelectedButtonFirstYear]=useState('');
    const handleButtonClickFirstYear=(buttonName)=>{
        setSelectedButtonFirstYear(buttonName);
    }
    return (
        <div>
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />
                <MdStarRate style={{ color: 'red', fontSize: '10px' }} />
                <p>Select your filing status</p>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${statusButton === 'Single' ? 'selected' : ''}`} onClick={() => handleButtonClickStatus('Single')}>
                    Single
                </button>
                <button className={`organizer-btn ${statusButton === ' Married Filling Jointly' ? 'selected' : ''}`} onClick={() => handleButtonClickStatus(' Married Filling Jointly')}>
                    Married Filling Jointly
                </button>
            </div>
            <button className={`organizer-btn ${statusButton === 'Married Filling Seperately' ? 'selected' : ''}`} onClick={() => handleButtonClickStatus('Married Filling Seperately')}>
                Married Filling Seperately
            </button>
            <br />
            <button className={`organizer-btn ${statusButton === 'Head of house-hold' ? 'selected' : ''}`} onClick={() => handleButtonClickStatus(' Head of house-hold')}>
                Head of house-hold (or) Surviving Spouse
            </button>

            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />
                <MdStarRate style={{ color: 'red', }} />
                <p>Personal Details - Please provide all family members First Name, Last Name, Middle Initial, SSN and Date of Birth details (Multi-line Text Entry)</p>
            </div>
            <textarea className='textarea' rows="3" cols="50" />

            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />
                <MdStarRate style={{ color: 'red', }} />
                <p>Phone/Email - Please enter your Phone Number, Email Address and Occupation (Multi-line text entry)</p>
            </div>
            <textarea className='textarea' rows="3" cols="50" />

            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />
                <MdStarRate style={{ color: 'red', }} />
                <p>Home Address</p>
            </div>
            <textarea className='textarea' rows="3" cols="50" />

            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />
                <MdStarRate style={{ color: 'red', }} />
                <p>Bank Details - Bank Account Information for Refund or Due payments (Bank Name, Routing Number, Account Number and Account Type) - Multi-line Text Entry</p>
            </div>
            <textarea className='textarea' rows="3" cols="50" />
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />
                <MdStarRate style={{ color: 'red', }} />
                <p>Is this your FIRST YEAR filing taxes in the United States (USA)?</p>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${selectedButtonFirstYear === 'Yes' ? 'selected' : ''}`} onClick={() => handleButtonClickFirstYear('Yes')}>
                    Yes
                </button>
                <button className={`organizer-btn ${selectedButtonFirstYear === 'No' ? 'selected' : ''}`} onClick={() => handleButtonClickFirstYear('No')}>
                    No
                </button>
            </div>
            {selectedButtonFirstYear === 'No' && (
                <div>
                    <div className='question-one' >
                        <MdStarRate style={{ color: 'red', }} />
                        <p>Previous Year's Tax returns</p>
                    </div>
                    <div className='add-document'>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <AiOutlinePlusCircle />
                            Add Documents
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default FamilyInformationForm