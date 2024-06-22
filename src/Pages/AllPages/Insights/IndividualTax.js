import React, { useState } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
const IndividualTax = () => {

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        // If "Other" button is selected, clear input
        if (buttonName !== 'Other') {
            setOtherInput('');
        }
    };

    const handleOtherInputChange = (e) => {
        const value = e.target.value;
        // Check if the input contains only numbers
        if (/^[0-9]*$/.test(value)) {
            setOtherInput(value);
        }
    };
    const [selectedButton, setSelectedButton] = useState('');
    const [otherInput, setOtherInput] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const renderFormFields = () => {
        switch (currentStep) {
            // Sign up
            case 1:
                return (
                    <>

                        <div className='individual-tax'>
                            <div >
                                <p>👋 Welcome! We're so excited to work with you.</p>
                                <br />
                                <p>This organizer is "smart" - this means that questions will populate based on the information you
                                    give us. For example, if you indicate you are married, we'll ask about your spouse. If you're not - we
                                    won't! 😎</p>
                                <br />
                                <ul style={{ marginLeft: '50px' }}>
                                    <li>Your answers will auto-save! You don't have to worry about losing data; you can come back any time.</li>
                                    <li>Once you provide us with the information once, it will save you time next year! You will be able to pre-fill your answers in the future, saving you time!</li>
                                    <li>You can complete this on your computer or mobile phone. If using the mobile app, you can use the scanner to take high-quality PDFs!</li>
                                </ul>
                                <ul style={{ marginLeft: '100px' }}>
                                    <li style={{ cursor: 'pointer', }}><p style={{ color: 'blue' }}>Click to download app on Google Play store</p></li>
                                    <li style={{ cursor: 'pointer', }}><p style={{ color: 'blue' }}>Click to download app on Apple App Store</p>
                                    </li>
                                </ul>
                                <h5 style={{ color: 'blue', margin: '20px 0', }}>Once you are done, please click 'submit'. When you submit, this will indicate to our team you are finished!</h5>
                                <h5 style={{ color: 'blue', margin: '20px 0', }}>This organizer autosaves after every question you answer, and you may return to complete it later if you do not have all of the information needed.</h5>
                                <h5 style={{ color: 'blue', margin: '20px 0', }}>You can use <strong style={{ color: 'red' }}>Android</strong> or <strong style={{ color: 'red' }}>iOS</strong> Mobile Apps to scan your documents and upload them to the portal quickly.</h5>
                                <h5 style={{ color: 'blue', margin: '20px 0', }}>﻿*** Please post your valuable review on Google https://g.page/r/CeCEiBEzrfbZEAg/review to redeem a <strong style={{ color: 'brown' }}>$15 credit</strong> for your next tax services. ***</h5>
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <MdStarRate style={{ color: 'red', fontSize: '10px' }} />
                                <b>Please confirm the calendar year you are completing this organizer for</b>
                            </div>
                            <div className='select-options'>

                                <button className={`organizer-btn ${selectedButton === '2023' ? 'selected' : ''}`} onClick={() => handleButtonClick('2023')}>
                                    2023(Jan 1 -Dec 31 2023)
                                </button>
                                <button className={`organizer-btn ${selectedButton === '2022' ? 'selected' : ''}`} onClick={() => handleButtonClick('2022')}>
                                    2022 (Jan 1 - Dec 31 2022)
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedButton === '2021' ? 'selected' : ''}`} onClick={() => handleButtonClick('2021')}>
                                    2021 (Jan 1 - Dec 31 2021)
                                </button>
                                <button className={`organizer-btn ${selectedButton === '2020' ? 'selected' : ''}`} onClick={() => handleButtonClick('2020')}>
                                    2020 (Jan 1 - Dec 31 2020)
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedButton === '2019' ? 'selected' : ''}`} onClick={() => handleButtonClick('2019')}>
                                    2019 (Jan 1 - Dec 31 2019)
                                </button>
                                <button className={`organizer-btn ${selectedButton === 'Other' ? 'selected' : ''}`} onClick={() => handleButtonClick('Other')}>
                                    Other
                                </button>
                            </div>



                            {selectedButton === 'Other' && (
                                <div>
                                    <label>Which Year?</label>
                                    <input
                                        type="text"
                                        value={otherInput}
                                        style={{ padding: '18px' }}
                                        onChange={handleOtherInputChange}
                                        placeholder="Numerical answer"
                                        className="organizer-input"
                                    />
                                </div>

                            )
                            }
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <MdStarRate style={{ color: 'red', fontSize: '10px' }} />
                                <b>Is this your FIRST year filing taxes with us? Or Is your filing status changed?</b>
                            </div>
                            <div className='select-options'>

                                <button className={`organizer-btn ${selectedButton === 'Yes' ? 'selected' : ''}`} onClick={() => handleButtonClick('Yes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${selectedButton === 'No' ? 'selected' : ''}`} onClick={() => handleButtonClick('No')}>
                                    No
                                </button>


                            </div>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Next <FaArrowRight />
                                </div>
                            </button>

                        </div>
                    </>
                );


            case 2:
                return <>Step 2</>;

            default:
                return null;
        }
    };

    return <>{renderFormFields()}</>;
};

export default IndividualTax;
