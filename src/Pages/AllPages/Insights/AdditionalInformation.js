import React, { useState } from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
const AdditionalInformation = () => {
    const [healthInsurance, setHealthInsurance] = useState('');
    const [showInput, setShowInput] = useState('');
    const handleHealthButton = (buttonName) => {
        setHealthInsurance(buttonName);
   
        console.log(buttonName);
    };
    const [taxYear, setTaxYear] = useState('')
    const[taxYearButton, setTaxYearButton]= useState('');
    const handleButton = (buttonName) => {
        setTaxYearButton(buttonName);
        setShowInput(buttonName);
        // console.log(buttonName);
    };
    const[medicalExpences, setMeddicalExpences]= useState('');
    const handleMedicalExpences =(buttonName)=>{
        setMeddicalExpences(buttonName);
    }
    const[cryptoButton, setCryptoButton]=useState('');
    const handleButtonClickCrpto=(buttonName)=>{
        setCryptoButton(buttonName);
    }
    const[hbarButton, setHbarButton]=useState('');
    const handleButtonClickFbar=(buttonName)=>{
        setHbarButton(buttonName);
    }

    const[FATCAButton, setFATCAButton]=useState('');
    const handleButtonClickFATCA=(buttonName)=>{
        setFATCAButton(buttonName);
    }
  
    const handleButtonClickRelocation=(buttonName)=>{
        setTaxYear(buttonName);
    }

    const[selectForm, setSelectForm]=useState('');
    const handleButtonSelectForm=(buttonName)=>{
        setSelectForm(buttonName);
    }
    // handleButtonSelectForm

    return (
        <>
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />

                <p>Is this your FIRST YEAR filing taxes in the United States (USA)?</p>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${taxYearButton === 'taxYes' ? 'selected' : ''}`} onClick={() => handleButton('taxYes')}>
                    Yes
                </button>
                <button className={`organizer-btn ${taxYearButton === 'taxNo' ? 'selected' : ''}`} onClick={() => handleButton('taxNo')}>
                    No
                </button>
            </div>
            {showInput === 'taxYes' && (

                <div>
                    <div className='question-one' >
                        <p>Is this your FIRST YEAR filing taxes in the United States (USA)?</p>
                    </div>
                    <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' />
                </div>
            )}
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />

                <p>Health Insurance - Do all of the members in your house have health insurance?</p>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${healthInsurance === 'Health Yes' ? 'selected' : ''}`} onClick={() => handleHealthButton('Health Yes')}>
                    Yes
                </button>
                <button className={`organizer-btn ${healthInsurance === 'Health No' ? 'selected' : ''}`} onClick={() => handleHealthButton('Health No')}>
                    No
                </button>
            </div>
            {healthInsurance === 'Health Yes' && (

                <div>
                    <div className='question-one' >

                        <p>If you bought the insurance from outside sources (the Market Place), please upload form 1095A</p>
                    </div>
                    <div className='add-document'>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <AiOutlinePlusCircle />
                            Add Documents
                        </div>

                    </div>
                </div>
            )}
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />
                <p>IP PIN - Please provide if you or your spouse have received Identity Protection PIN (IP PIN) from the IRS for this calendar year?</p>
            </div>
            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' />
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />
                <p>HSA - If you have a HSA Account, please provide contribution and distribution amounts. (DO NOT include the contribution you did through work)</p>
            </div>
            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' />
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />

                <p>Was all of the money you withdrew from the HSA account used to pay for or reimburse yourself for out of pocket medical expenses?</p>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${medicalExpences === 'Yes' ? 'selected' : ''}`} onClick={() => handleMedicalExpences('Health No')}>
                    Yes
                </button>
                <button className={`organizer-btn ${medicalExpences === ' No' ? 'selected' : ''}`} onClick={() => handleMedicalExpences('Health No')} >
                    No
                </button>
            </div>
            <div className='question-one' >
                <p>Estimated Tax Payments - Have you made any estimated tax payments to the IRS and State? Please provide date and amount details.</p>
            </div>
            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' />
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />

                <p>CRYPTO - Did you BUY or SELL any Crypto currencies in the last year?</p>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${cryptoButton === 'CRYPTOYes' ? 'selected' : ''}`} onClick={() => handleButtonClickCrpto('CRYPTOYes')}>
                    Yes
                </button>
                <button className={`organizer-btn ${cryptoButton === 'CRYPTONo' ? 'selected' : ''}`} onClick={() => handleButtonClickCrpto('CRYPTONo')}>
                    No
                </button>
            </div>
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />

                <p>FBAR- Do you have a requirement to file FBAR?</p>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${hbarButton === 'FBARYes' ? 'selected' : ''}`} onClick={() => handleButtonClickFbar('FBARYes')}>
                    Yes
                </button>
                <button className={`organizer-btn ${hbarButton === ' FBARNo' ? 'selected' : ''}`} onClick={() => handleButtonClickFbar('FBARNo')}>
                    No
                </button>
            </div>
            <div>
                <label style={{ fontSize: '18px', fontWeight: '700' }}>FBAR Requirement -</label>
                <p style={{ color: 'blue' }}>A United States person, including a citizen, resident, corporation, partnership, limited liability company, trust, and estate, must file an FBAR to report:</p>
                <ul>
                    <li style={{ color: 'blue', marginLeft: '15%' }}>a financial interest in or signature or other authority over at least one financial account located outside the United States if</li>
                    <li style={{ color: 'blue', marginLeft: '15%' }}>the aggregate value of those foreign financial accounts exceeded $10,000 at any time during the calendar year reported.
                    </li>
                </ul>
                <Link style={{ color: 'blue', textDecoration: 'none' }} to='https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' target='_blank'>more details.</Link>
            </div>
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />

                <p>FATCA - Do you have a requirement to file FATCA?</p>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${FATCAButton === 'FATCAYes' ? 'selected' : ''}`} onClick={() => handleButtonClickFATCA('FATCAYes')}>
                    Yes
                </button>
                <button className={`organizer-btn ${FATCAButton === 'FATCANo' ? 'selected' : ''}`} onClick={() => handleButtonClickFATCA('FATCANo')}>
                    No
                </button>
            </div>
            <div>
                <label style={{ fontSize: '18px', fontWeight: '700' }}>FATCA Requirement -</label>
                <p style={{ color: 'blue' }}>You must file Form 8938 if you must file an income tax return and:</p>
                <ul>
                    <li style={{ color: 'blue', marginLeft: '15%' }}>You are unmarried and the total value of your specified foreign financial assets is more than $50,000 on the last day of the tax year or more than $75,000 at any time during the tax year </li>
                    <li style={{ color: 'blue', marginLeft: '15%' }}>You are married filing a joint income tax return and the total value of your specified foreign financial assets is more than $100,000 on the last day of the tax year or more than $150,000 at any time during the tax year. </li>
                    <li style={{ color: 'blue', marginLeft: '15%' }}>You are married filing separate income tax returns and the total value of your specified foreign financial assets is more than $50,000 on the last day of the tax year or more than $75,000 at any time during the tax year. For purposes of calculating the value of your specified foreign financial assets in applying this threshold, include one-half the value of any specified foreign financial asset jointly owned with your spouse. However, report the entire value on Form 8938 if you are required to file Form 8938.</li>
                </ul>
                <Link style={{ color: 'blue', textDecoration: 'none' }} to='https://www.irs.gov/businesses/corporations/summary-of-fatca-reporting-for-us-taxpayers#:~:text=FATCA%20requires%20certain%20U.S.%20taxpayers,taxpayer' target='_blank'>more details.</Link>
            </div>
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />
                <p>Valid ID - Please provide your and your spouse's valid state ID or Driving License details (Front/Back)</p>
            </div>
            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' />
            <div>
                <label style={{ fontSize: '18px', fontWeight: '700' }}>Helpful Info -</label>
                <ul>
                    <li style={{ color: 'blue', marginLeft: '15%' }}>I need the following details.</li>
                    <li style={{ color: 'blue', marginLeft: '15%' }}>State that issued the ID or license</li>
                    <li style={{ color: 'blue', marginLeft: '15%' }}>State ID or license number</li>
                    <li style={{ color: 'blue', marginLeft: '15%' }}>Date issued</li>
                    <li style={{ color: 'blue', marginLeft: '15%' }}>Expiration date</li>
                </ul>
            </div>
            <div className='question-one' >

                <p>Upload ID documents here.</p>
            </div>
            <div className='add-document'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <AiOutlinePlusCircle />
                    Add Documents
                </div>

            </div>
            <div className='question-one' >

                <p>Any Relocation during the tax year?</p>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${taxYear === 'reloactionYes' ? 'selected' : ''}`} onClick={() => handleButtonClickRelocation('reloactionYes')}>
                    Yes
                </button>
                <button className={`organizer-btn ${taxYear === 'reloactionNo' ? 'selected' : ''}`} onClick={() => handleButtonClickRelocation('reloactionNo')}>
                    No
                </button>
            </div>
            {taxYear === 'reloactionYes' && (
                <div>
                    <div className='question-one' >
                        <FaRegCheckCircle className='check-icon' />
                        <p>List all Dates, To/From State/Country</p>
                    </div>
                    <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' />
                    <div className='question-one' >
                        <FaRegCheckCircle className='check-icon' />
                        <p>Any unreimbursed moving expenses?</p>
                    </div>
                    <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' />

                </div>
            )}
            <div className='question-one' >
                <FaRegCheckCircle className='check-icon' />
                <p>Please select all forms that apply for you (multiple options)</p>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${selectForm === 'Stocks' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('Stocks')}>
                    Stocks/Cryptocurrency
                </button>
                <button className={`organizer-btn ${selectForm === ' Own a home' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm(' Own a home')}>
                    Own a home
                </button>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${selectForm === ' IRA' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm(' IRA')}>
                  IRA Contributions/Distributions
                </button>
               
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${selectForm === 'Car Purchase' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('Car Purchase')}>
                    Hybrid Car Purchase & Solar Installation
                </button>
                <button className={`organizer-btn ${selectForm === ' Day Care' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm(' Day Care')}>
                    Day Care Expenses
                </button>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${selectForm === 'Family Member Added' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('Family Member Added')}>
                   New Family Member Added
                </button>
                <button className={`organizer-btn ${selectForm === 'Property Sale' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm(' Property Sale')}>
                 Property Sale
                </button>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${selectForm === 'Rental Properties' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('Rental Properties')}>
                    Rental Properties
                </button>
                <button className={`organizer-btn ${selectForm === 'FBAR/FATCA' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('FBAR/FATCA')}>
                 FBAR/FATCA
                </button>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${selectForm === 'Eductional' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('Eductional')}>
                    Eductional Related Expenses
                </button>
                <button className={`organizer-btn ${selectForm === ' ITIN Application' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm(' ITIN Application')}>
                    ITIN Application/Renewal
                </button>
            </div>
            <div className='select-options'>
                <button className={`organizer-btn ${selectForm === 'Schedule C' ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('Schedule C')}>
                    Schedule C (Independent Contractor or Solo Proprietor)
                </button>
               
            </div>
        </>
    )
}

export default AdditionalInformation