import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Switch from 'react-switch';
import Select from 'react-select';
import './CreateOrganizer.css'; // Assuming this file contains the CSS
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const CreateOrganizerUpdate = () => {

    const API_KEY = process.env.REACT_APP_API_IP;
    const navigate = useNavigate();
    const { _id } = useParams();



    const [accountsData, setAccountsData] = useState([]);
    const [organizerTemplate, setOrganizerTemplate] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [selectedOrganizerTemplate, setSelectedOrganizerTemplate] = useState(null);
    const [selectedOrganizerOfAccountData, setSelectedOrganizerOfAccountData] = useState(null);
    const [organizerName, setOrganizerName] = useState('');
    const [reminder, setReminder] = useState(false);
    const [organizerTemp, setOrganizerTemp] = useState(null);
    const [fileInputs, setFileInputs] = useState({});

    useEffect(() => {
        fetchAccountData();
        fetchOrganizerTemplateData();
        fetchOrganizerOfAccount();
    }, []);

    const fetchAccountData = async () => {
        try {
            const url = `${API_KEY}/admin/accountdetails/`;
            const response = await fetch(url);
            const result = await response.json();
            setAccountsData(result.accounts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchAccountDataById = async (accountid) => {
        try {
            const url = `${API_KEY}/admin/accountdetails/${accountid}`;
            console.log(url)
            const response = await fetch(url);
            const result = await response.json();
            console.log(result)

            const AccountsSelectedOptions = {
                value: result.account._id,
                label: result.account.accountName,
            };
            console.log(AccountsSelectedOptions);
            setSelectedAccounts(AccountsSelectedOptions);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchOrganizerOfAccount = () => {

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const url = `${API_KEY}/workflow/organizeraccountwise/${_id}`;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.organizerAccountWise)
                setSelectedOrganizerOfAccountData(result.organizerAccountWise)
                fetchOrganizerById(result.organizerAccountWise.organizertemplateid)
                setReminder(result.organizerAccountWise.reminders)
                fetchAccountDataById(result.organizerAccountWise.accountid)
                setOrganizerTemp(result.organizerAccountWise)
            }

            )
            .catch((error) => console.error(error));
    }

    const fetchOrganizerById = async (id) => {
        console.log(id);
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };
        const url = `${API_KEY}/workflow/organizertemplate/${id}`;

        try {
            const response = await fetch(url, requestOptions);
            const result = await response.json();
            console.log("Fetch Organizer By ID Result: ", result);
            if (result && result.organizerTemplate) {
                setOrganizerName(result.organizerTemplate.organizerName);
                console.log(result.organizerTemplate.organizerName)

                const organizeroptions = {
                    value: result.organizerTemplate._id,
                    label: result.organizerTemplate.organizerName
                };
                console.log(organizeroptions)
                setSelectedOrganizerTemplate(organizeroptions);

            } else {
                console.error("Invalid response structure: ", result);
            }
        } catch (error) {
            console.error('Error fetching organizer template by ID:', error);
        }
    };

    const fetchOrganizerTemplateData = async () => {
        try {
            const url = `${API_KEY}/workflow/organizertemplate/`;
            const response = await fetch(url);
            const result = await response.json();
            setOrganizerTemplate(result.OrganizerTemplates);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const AccountsOptions = accountsData.map((account) => ({
        value: account._id,
        label: account.accountName,
    }));

    const OrganizerTemplateOptions = organizerTemplate.map((organizertemp) => ({
        value: organizertemp._id,
        label: organizertemp.organizerName,
    }));
    const handleAccountChange = (selectedOption) => {
        setSelectedAccounts(selectedOption);
    };

    const handleOrganizerTemplateChange = (selectedOption) => {
        setSelectedOrganizerTemplate(selectedOption);
        fetchOrganizerById(_id);
    };

    const handleRemindersChange = (checked) => {
        setReminder(checked);
    };


    const handleCheckboxToggle = (questionId, optionId) => {
        setOrganizerTemp(prevOrganizerTemp => {
            const updatedSections = prevOrganizerTemp.sections.map(section => ({
                ...section,
                formElements: section.formElements.map(question => {
                    if (question.id === questionId) {
                        return {
                            ...question,
                            options: question.options.map(option => ({
                                ...option,
                                selected: option.id === optionId ? !option.selected : option.selected
                            }))
                        };
                    }
                    return question;
                })
            }));

            return {
                ...prevOrganizerTemp,
                sections: updatedSections
            };
        });
    };

    const handleRadioToggle = (questionId, optionId) => {
        setOrganizerTemp(prevOrganizerTemp => {
            const updatedSections = prevOrganizerTemp.sections.map(section => ({
                ...section,
                formElements: section.formElements.map(question => {
                    if (question.id === questionId) {
                        return {
                            ...question,
                            options: question.options.map(option => ({
                                ...option,
                                selected: option.id === optionId
                            }))
                        };
                    }
                    return question;
                })
            }));

            return {
                ...prevOrganizerTemp,
                sections: updatedSections
            };
        });
    };

    const handleInputChange = (questionId, value) => {
        setOrganizerTemp(prevOrganizerTemp => {
            const updatedSections = prevOrganizerTemp.sections.map(section => ({
                ...section,
                formElements: section.formElements.map(question => {
                    if (question.id === questionId) {
                        return {
                            ...question,
                            textvalue: value
                        };
                    }
                    return question;
                })
            }));

            return {
                ...prevOrganizerTemp,
                sections: updatedSections
            };
        });
    };

    const handleFileInputChange = (questionId, event) => {
        const files = event.target.files;
        setFileInputs(prevState => ({
            ...prevState,
            [questionId]: files[0]
        }));
    };

    
    const handleOrganizerFormClose = () => {
        setTimeout(() => {
            // window.location.reload();
            navigate(`/accountsdash/organizers/${selectedAccounts?.value}`)
        }, 1000);
    };


    const createOrganizerOfAccount = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            accountid: selectedAccounts?.value,
            organizertemplateid: selectedOrganizerTemplate?.value,
            reminders: reminder,
            jobid: ["661e495d11a097f731ccd6e8"],
            sections: organizerTemp?.sections?.map(section => ({
                name: section?.text || '',
                id: section?.id?.toString() || '',
                text: section?.text || '',
                formElements: section?.formElements?.map(question => ({
                    type: question?.type || '',
                    id: question?.id || '',
                    sectionid: question?.sectionid || '',
                    options: question?.options?.map(option => ({
                        id: option?.id || '',
                        text: option?.text || '',
                        selected: option?.selected || false,
                    })) || [],
                    text: question?.text || '',
                    textvalue: question?.textvalue || '',
                    
                })) || []
            })) || [],
            active: true
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        console.log(raw);
        const url = `${API_KEY}/workflow/organizeraccountwise/${_id}`;
        fetch(url, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                toast.success("Organizer AccountWise Updated successfully");
                // setTimeout(() => {
                //     // window.location.reload();
                //     navigate(`/accountsdash/organizers/${selectedAccounts?.value}`)
                // }, 1000);
            })
            .catch((error) => console.error(error));
    };



    return (
        <>
            <div className='container' >
                <div className='panel'>
                    <div style={{ margin: "20px 20px" }}>
                        <h1>Create Organizer</h1>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Accounts</label>
                        <Select
                            options={AccountsOptions}
                            isMulti // Enable multi-select
                            value={selectedAccounts}
                            onChange={handleAccountChange}
                            placeholder='Select Accounts...'
                            isSearchable // Enable search
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label >Organizer Template</label>
                        <Select
                            options={OrganizerTemplateOptions}
                            isMulti={false} // Disable multi-select
                            value={selectedOrganizerTemplate}
                            onChange={handleOrganizerTemplateChange}
                            placeholder='Select Organizer Template...'
                            isSearchable // Enable search
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Organizer Name</label>
                        <input
                            type='text'
                            placeholder='Organizer Name'
                            className='OrganizerName-input'
                            value={organizerName}
                            onChange={(e) => setOrganizerName(e.target.value)}
                        />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <label >Reminders </label>
                        <Switch
                            onChange={handleRemindersChange}
                            checked={reminder}
                            onColor='#3A91F5'
                            onHandleColor='#FFF'
                            handleDiameter={10}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={20}
                            width={32}
                            className='react-switch'
                        />
                    </div>
                </div>

                {organizerTemp && (
                    <div className="organizerform-details" >
                        <form key={organizerTemp.organizertemplateid} id={organizerTemp.organizertemplateid} className='template-form' >
                            <h2>{organizerName}</h2>
                            {organizerTemp.sections.map((section) => (
                                <div key={section.id} className='section'>
                                    <h3 style={{ margin: "50px 0px 20px 0" }}>{section.name}</h3>
                                    {section.formElements.map((question) => (
                                        <div key={question.id} className='question'>
                                            <p style={{ margin: "13px 0" }}>{question.text}</p>

                                            {question.type === 'Checkboxes' && (
                                                <div className='checkbox-container'>
                                                    {question.options.map((option) => (
                                                        <label key={option.id} className='checkbox-label'>
                                                            <input
                                                                type='checkbox'
                                                                name={`question-${question.id}`}
                                                                value={option.text}
                                                                checked={option.selected || false}
                                                                className='check-btn visually-hidden'
                                                                onChange={() => handleCheckboxToggle(question.id, option.id)}
                                                            />
                                                            <button
                                                                type='button'
                                                                className={`checkbox-button ${option.selected ? 'selected' : ''}`}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleCheckboxToggle(question.id, option.id);
                                                                }}
                                                            >
                                                                {option.text}
                                                            </button>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}

                                            {question.type === 'Radio Buttons' && (
                                                <div className='radio-container'>
                                                    {question.options.map((option) => (
                                                        <label key={option.id} className='radio-label'>
                                                            <input
                                                                type='radio'
                                                                name={`question-${question.id}`}
                                                                value={option.text}
                                                                checked={option.selected || false}
                                                                className='radio-btn visually-hidden'
                                                                onChange={() => handleRadioToggle(question.id, option.id)}
                                                            />
                                                            <button
                                                                type='button'
                                                                className={`radio-button ${option.selected ? 'selected' : ''}`}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleRadioToggle(question.id, option.id);
                                                                }}
                                                            >
                                                                {option.text}
                                                            </button>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                            {/* Yes/No */}{question.type === 'Yes/No' && (
                                                <div className='radio-container'>
                                                    {question.options.map((option) => (
                                                        <label key={option.id} className='radio-label'>
                                                            <input
                                                                type='radio'
                                                                name={`question-${question.id}`}
                                                                value={option.text}
                                                                checked={option.selected || false}
                                                                className='radio-btn visually-hidden'
                                                                onChange={() => handleRadioToggle(question.id, option.id)}
                                                            />
                                                            <button
                                                                type='button'
                                                                className={`radio-button ${option.selected ? 'selected' : ''}`}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleRadioToggle(question.id, option.id);
                                                                }}
                                                            >
                                                                {option.text}
                                                            </button>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                            {(question.type === 'Free Entry' || question.type === 'Number' || question.type === 'Email') && (
                                                <div>

                                                    <textarea
                                                        type={question.type === 'Free Entry' ? 'text' : question.type.toLowerCase()}
                                                        name={`question-${question.id}`}
                                                        className='organizerInputBoxes'
                                                        placeholder={`${question.type} Answer`}
                                                        value={question.textvalue || ''}
                                                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                                                    />
                                                </div>
                                            )}

                                            {question.type === 'File Upload' && (
                                                <div className='file-upload-container'>
                                                    <input
                                                        type='file'
                                                        name={`question-${question.id}`}
                                                        className='file-upload-input'
                                                        onChange={(e) => handleFileInputChange(question.id, e)}
                                                    />
                                                    <button
                                                        type='button'
                                                        className='file-upload-button'
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            console.log(`File uploaded for question ${question.id}:`, fileInputs[question.id]);
                                                        }}
                                                    >
                                                        Upload
                                                    </button>
                                                </div>
                                            )}
                                            

                                        </div>
                                    ))}
                                </div>
                            ))}
                        </form>
                    </div>
                )}

                <div>
                    <Link to={`/accountsdash/organizers/${selectedAccounts?.value}`}>   <button className='btn1' onClick={createOrganizerOfAccount}>Save</button></Link>
                    <button className='btn2' onClick={handleOrganizerFormClose}>Cancel</button>
                </div>

            </div>
        </>
    )

}

export default CreateOrganizerUpdate;