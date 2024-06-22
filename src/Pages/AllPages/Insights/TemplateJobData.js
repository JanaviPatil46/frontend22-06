// import React, { useEffect, useState, useRef } from 'react';
// import makeAnimated from "react-select/animated";

// import Priority from '../../../Components/Templates/priority.js';
// import Select from 'react-select';
// import { SlQuestion } from "react-icons/sl";
// import Switch from "react-switch";
// import DatePicker from 'react-datepicker'; // Import date picker
// import 'react-datepicker/dist/react-datepicker.css'; // Import date picker stylesheet
// import axios from 'axios';
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, Modifier } from "draft-js";
// const TemplateJobData = () => {
//     const API_KEY = process.env.REACT_APP_API_IP;
//     const animatedComponents = makeAnimated();
//     const [jobtemplatedata, setjobtemplatedata] = useState([]);
//     const [selectedjobtemplate, setSelectedjobtemplate] = useState();
//     const [jobName, setJobName] = useState("");
//     const [jobAssignees, setJobAssignees] = useState([]);
//     const handleJobTemplateChange = async (selectedOptions) => {
//         setSelectedjobtemplate(selectedOptions);
//         // Update job name with the selected template's name
//         const selectedTemplate = jobtemplatedata.find(template => template._id === selectedOptions?.value);
//         if (selectedTemplate) {
//             setJobName(selectedTemplate.jobname);
//         }
//         let config = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: `${API_KEY}/workflow/jobtemplate/jobtemplateList/${selectedOptions.value}`,
//             headers: {}
//         };

//         axios.request(config)
//             .then((response) => {
//                 const jobAssignees = response.data.jobTemplate.jobassignees.map(assignee => assignee.username);
//                 setJobAssignees(jobAssignees);
//                 console.log(jobAssignees);

//                 const priority = response.data.jobTemplate.priority;
//                 console.log(priority);
//                 setPriority(priority);


//                 const description = response.data.jobTemplate.description;
//                 setJobDescription(description);
//                 console.log(description);

//                 const startdate = response.data.jobTemplate.startdate;
//                 console.log(startdate);
//                 setStartDate(startdate);

//                 const enddate = response.data.jobTemplate.enddate;
//                 console.log(enddate);
//                 setDueDate(enddate);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }


//     useEffect(() => {
//         fetchJobTemplateData();
//     }, []);

//     const fetchJobTemplateData = async () => {
//         try {


//             const url = `${API_KEY}/workflow/jobtemplate`;
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch pipeline data');
//             }
//             const data = await response.json();
//             setjobtemplatedata(data.JobTemplates);



//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }

//     };
//     const handleJobAssigneesChange = (selectedOptions) => {
//         // Update the job assignees state with selected names
//         const selectedNames = selectedOptions.map((option) => option.label);
//         setJobAssignees(selectedNames);
//     };
//     const jobtemplateoptions = Array.isArray(jobtemplatedata)
//         ? jobtemplatedata.map((jobtemplate) => ({
//             value: jobtemplate._id,
//             label: jobtemplate.templatename,
//         })) : [];


//     //******************************Pipeline */

//     const [pipelinedata, setpipelinedata] = useState([]);
//     const [selectedpipeline, setSelectedpipeline] = useState();

//     const handlePipelineChange = (selectedOptions) => {
//         setSelectedpipeline(selectedOptions);
//     }

//     useEffect(() => {
//         fetchPipelineData();
//     }, []);

//     const fetchPipelineData = async () => {
//         try {
//             const response = await fetch(`${API_KEY}/workflow/pipeline`);
//             const data = await response.json();
//             setpipelinedata(data.pipeline);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const pipelineoptions = Array.isArray(pipelinedata)
//         ? pipelinedata.map((pipeline) => ({
//             value: pipeline._id,
//             label: pipeline.pipelineName,
//         }))
//         : [];

//     //****************Accounts */
//     const [accountdata, setaccountdata] = useState([]);
//     const [selectedaccount, setSelectedaccount] = useState();
//     const [combinedaccountValues, setCombinedaccountValues] = useState([]);

//     const handleAccountChange = (selectedOptions) => {
//         setSelectedaccount(selectedOptions);
//         // Map selected options to their values and send as an array
//         const selectedValues = selectedOptions.map((option) => option.value);
//         setCombinedaccountValues(selectedValues);
//     }

//     useEffect(() => {
//         fetchAccountData();
//     }, []);

//     const fetchAccountData = async () => {
//         try {
//             const response = await fetch(`${API_KEY}/admin/accountdetails`);
//             const data = await response.json();
//             setaccountdata(data.accounts);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     // console.log(userdata);
//     const accountoptions = accountdata.map((account) => ({
//         value: account._id,
//         label: account.accountName
//     }));

//     //****************Users */

//     const [userdata, setUserData] = useState([]);
//     const [selecteduser, setSelectedUser] = useState();
//     const [combinedValues, setCombinedValues] = useState([]);

//     const handleuserChange = (selectedOptions) => {
//         setSelectedUser(selectedOptions);
//         // Map selected options to their values and send as an array
//         const selectedValues = selectedOptions.map((option) => option.value);
//         setCombinedValues(selectedValues);
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const url = `${API_KEY}/common/user`;
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch pipeline data');
//             }
//             const data = await response.json();
//             setUserData(data);

//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     // console.log(userdata);
//     const useroptions = userdata.map((user) => ({
//         value: user._id,
//         label: user.username

//     }));

//     const [priority, setPriority] = useState(" ");
//     const [jobDescription, setJobDescription] = useState("");
//     // Handler function to update state when priority changes
//     const handlePriorityChange = (selectedOption) => {
//         setPriority(selectedOption);
//         console.log(selectedOption); // Log the selected priority value to the console
//     };


//     const [startsin, setstartsin] = useState("");
//     const [startsinduration, setstartsinduration] = useState("");
//     const [duein, setduein] = useState("");
//     const [dueinduration, setdueinduration] = useState("");
//     const [startDate, setStartDate] = useState(null);
//     const [dueDate, setDueDate] = useState(null);
//     const [absoluteDate, setAbsoluteDates] = useState(false)

//     const handleAbsolutesDates = (checked) => {
//         setAbsoluteDates(checked)
//     }
//     const handleStartDateChange = (date) => {
//         setStartDate(date);
//     };

//     const handleDueDateChange = (date) => {
//         setDueDate(date);
//     };


//     // Combine day, month, and year options
//     const dayoptions = [
//         { label: 'Days', value: 'Days' },
//         { label: 'Months', value: 'Months' },
//         { label: 'Years', value: 'Years' }
//     ];

//     // Handler function to update state when dropdown value changes
//     const handlestartindateChange = (selectedOption) => {
//         setstartsinduration(selectedOption.value);
//     };

//     // Handler function to update state when dropdown value changes
//     const handledueindateChange = (selectedOption) => {
//         setdueinduration(selectedOption.value);
//     };
//     const dropdownRef = useRef(null);
//     const [showTextDropdown, setShowTextDropdown] = useState(false);
//     const [editorState, setEditorState] = useState(
//         EditorState.createEmpty()
//     );

//     const CustomToolbar = () => (
//         <div className="rdw-editor-toolbar">
//             <div className="dropdown-button" onClick={() => setShowTextDropdown(!showTextDropdown)}>
//                 Add Shortcode
//             </div>
//             {showTextDropdown && (
//                 <div className="dropdown-menu" ref={dropdownRef}>
//                     {shortcuts.map((shortcode, index) => (
//                         <div key={index} className={`dropdown-item ${shortcode.isBold ? "bold" : ""}`} onClick={() => handleShortcodeClick(shortcode)}>
//                             {shortcode.title}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
//     const [shortcuts, setShortcuts] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const handleShortcodeClick = (shortcode) => {
//         insertText(`[${shortcode.value}]`);
//         setShowDropdown(false);
//     };
//     const insertText = (text) => {
//         const contentState = editorState.getCurrentContent();
//         const selectionState = editorState.getSelection();
//         const newContentState = Modifier.insertText(contentState, selectionState, text);
//         const newEditorState = EditorState.push(editorState, newContentState, "insert-characters");
//         setEditorState(newEditorState);
//     };
//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setShowTextDropdown(false);
//         }
//     };
//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);



//     const [selectedOption, setSelectedOption] = useState("contacts");
//     useEffect(() => {
//         if (selectedOption === "contacts") {
//             // Set contact shortcuts
//             const contactShortcuts = [
//                 { title: "Account Shortcodes", isBold: true },
//                 { title: "Account Name", isBold: false, value: "ACCOUNT_NAME" },
//                 { title: "Custom field:Website", isBold: false, value: "ACCOUNT_CUSTOM_FIELD:Website" },
//                 { title: "Contact Shortcodes", isBold: true },
//                 { title: "Contact Name", isBold: false, value: "CONTACT_NAME" },
//                 { title: "First Name", isBold: false, value: "FIRST_NAME" },
//                 { title: "Middle Name", isBold: false, value: "MIDDLE_NAME" },
//                 { title: "Last Name", isBold: false, value: "LAST_NAME" },
//                 { title: "Phone number", isBold: false, value: "PHONE_NUMBER" },
//                 { title: "Country", isBold: false, value: "COUNTRY" },
//                 { title: "Company name", isBold: false, value: "COMPANY_NAME " },
//                 { title: "Street address", isBold: false, value: "STREET_ADDRESS" },
//                 { title: "City", isBold: false, value: "CITY" },
//                 { title: "State/Province", isBold: false, value: "STATE / PROVINCE" },
//                 { title: "Zip/Postal code", isBold: false, value: "ZIP / POSTAL CODE" },
//                 { title: "Custom field:Email", isBold: false, value: "CONTACT_CUSTOM_FIELD:Email" },
//                 { title: "Date Shortcodes", isBold: true },
//                 { title: "Current day full date", isBold: false, value: "CURRENT_DAY_FULL_DATE" },
//                 { title: "Current day number", isBold: false, value: "CURRENT_DAY_NUMBER" },
//                 { title: "Current day name", isBold: false, value: "CURRENT_DAY_NAME" },
//                 { title: "Current week", isBold: false, value: "CURRENT_WEEK" },
//                 { title: "Current month number", isBold: false, value: "CURRENT_MONTH_NUMBER" },
//                 { title: "Current month name", isBold: false, value: "CURRENT_MONTH_NAME" },
//                 { title: "Current quarter", isBold: false, value: "CURRENT_QUARTER" },
//                 { title: "Current year", isBold: false, value: "CURRENT_YEAR" },
//                 { title: "Last day full date", isBold: false, value: "LAST_DAY_FULL_DATE" },
//                 { title: "Last day number", isBold: false, value: "LAST_DAY_NUMBER" },
//                 { title: "Last day name", isBold: false, value: "LAST_DAY_NAME" },
//                 { title: "Last week", isBold: false, value: "LAST_WEEK" },
//                 { title: "Last month number", isBold: false, value: "LAST_MONTH_NUMBER" },
//                 { title: "Last month name", isBold: false, value: "LAST_MONTH_NAME" },
//                 { title: "Last quarter", isBold: false, value: "LAST_QUARTER" },
//                 { title: "Last_year", isBold: false, value: "LAST_YEAR" },
//                 { title: "Next day full date", isBold: false, value: "NEXT_DAY_FULL_DATE" },
//                 { title: "Next day number", isBold: false, value: "NEXT_DAY_NUMBER" },
//                 { title: "Next day name", isBold: false, value: "NEXT_DAY_NAME" },
//                 { title: "Next week", isBold: false, value: "NEXT_WEEK" },
//                 { title: "Next month number", isBold: false, value: "NEXT_MONTH_NUMBER" },
//                 { title: "Next month name", isBold: false, value: "NEXT_MONTH_NAME" },
//                 { title: "Next quarter", isBold: false, value: "NEXT_QUARTER" },
//                 { title: "Next year", isBold: false, value: "NEXT_YEAR" },
//             ];
//             setShortcuts(contactShortcuts);
//         } else if (selectedOption === "account") {
//             // Set account shortcuts
//             const accountShortcuts = [
//                 { title: "Account Shortcodes", isBold: true },
//                 { title: "Account Name", isBold: false, value: "ACCOUNT_NAME" },
//                 { title: "Custom field:Website", isBold: false, value: "ACCOUNT_CUSTOM_FIELD:Website" },
//                 { title: "Date Shortcodes", isBold: true },
//                 { title: "Current day full date", isBold: false, value: "CURRENT_DAY_FULL_DATE" },
//                 { title: "Current day number", isBold: false, value: "CURRENT_DAY_NUMBER" },
//                 { title: "Current day name", isBold: false, value: "CURRENT_DAY_NAME" },
//                 { title: "Current week", isBold: false, value: "CURRENT_WEEK" },
//                 { title: "Current month number", isBold: false, value: "CURRENT_MONTH_NUMBER" },
//                 { title: "Current month name", isBold: false, value: "CURRENT_MONTH_NAME" },
//                 { title: "Current quarter", isBold: false, value: "CURRENT_QUARTER" },
//                 { title: "Current year", isBold: false, value: "CURRENT_YEAR" },
//                 { title: "Last day full date", isBold: false, value: "LAST_DAY_FULL_DATE" },
//                 { title: "Last day number", isBold: false, value: "LAST_DAY_NUMBER" },
//                 { title: "Last day name", isBold: false, value: "LAST_DAY_NAME" },
//                 { title: "Last week", isBold: false, value: "LAST_WEEK" },
//                 { title: "Last month number", isBold: false, value: "LAST_MONTH_NUMBER" },
//                 { title: "Last month name", isBold: false, value: "LAST_MONTH_NAME" },
//                 { title: "Last quarter", isBold: false, value: "LAST_QUARTER" },
//                 { title: "Last_year", isBold: false, value: "LAST_YEAR" },
//                 { title: "Next day full date", isBold: false, value: "NEXT_DAY_FULL_DATE" },
//                 { title: "Next day number", isBold: false, value: "NEXT_DAY_NUMBER" },
//                 { title: "Next day name", isBold: false, value: "NEXT_DAY_NAME" },
//                 { title: "Next week", isBold: false, value: "NEXT_WEEK" },
//                 { title: "Next month number", isBold: false, value: "NEXT_MONTH_NUMBER" },
//                 { title: "Next month name", isBold: false, value: "NEXT_MONTH_NAME" },
//                 { title: "Next quarter", isBold: false, value: "NEXT_QUARTER" },
//                 { title: "Next year", isBold: false, value: "NEXT_YEAR" },
//             ];
//             setShortcuts(accountShortcuts);
//         }
//     }, [selectedOption]);
//     const [showJobForm, setShowJobForm] = useState(false);
//     useEffect(() => {
//         // Fetch job template data and set the selected job template to the first one
//         if (showJobForm && jobtemplateoptions.length > 0) {
//             const firstJobTemplate = jobtemplateoptions[0];
//             setSelectedjobtemplate(firstJobTemplate);
//             handleJobTemplateChange(firstJobTemplate);
//         }
//     }, [showJobForm]);

//     const createjob = () => {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const raw = JSON.stringify({
//             accounts: combinedaccountValues,
//             pipeline: selectedpipeline?.value,
//             templatename: selectedjobtemplate?.value,
//             jobname: jobName,
//             jobassignees: combinedValues,
//             priority: priority,
//             description: jobDescription,
//             absolutedates: absoluteDate,
//             startsin: startsin,
//             startsinduration: startsinduration,
//             duein: duein,
//             dueinduration: dueinduration,
//             comments: "",
//             startdate: startDate,
//             enddate: dueDate,
//         });
//         console.log(raw);

//         const requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: raw,
//             redirect: "follow"
//         };

//         fetch(`${API_KEY}/workflow/job/`, requestOptions)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.text();
//             })
//             .then((result) => {
//                 // Handle success
//                 console.log("Job Template created successfully", result);
//                 window.location.reload();
//             })
//             .catch((error) => {
//                 // Handle errors
//                 console.error("Failed to create Job Template", error);
//             });
//     }
//     return (
//         <>
//             <div>TemplateJobData</div>
//             <button onClick={() => setShowJobForm(!showJobForm)}>Toggle Job Form</button>
//             {showJobForm && (

//                 <div className='job-from'>
//                     <div className='add-jobs-select-container'>
//                         <div className='add-jobs-label-container'>
//                             <label>Accounts</label>
//                         </div>
//                         <Select className='add-jobs-select-dropdown'
//                             placeholder="Accounts"
//                             options={accountoptions}
//                             components={animatedComponents}
//                             isMulti // Enable multi-select
//                             value={selectedaccount}
//                             isSearchable // Enable search
//                             onChange={handleAccountChange} />
//                     </div>
//                     <div className='add-jobs-select-container'>
//                         <div className='add-jobs-label-container'>
//                             <label>Pipeline</label>
//                         </div>
//                         <Select className='add-jobs-select-dropdown'
//                             placeholder="Pipeline"
//                             options={pipelineoptions}
//                             components={animatedComponents}
//                             value={selectedpipeline}
//                             isSearchable // Enable search
//                             isClearable
//                             onChange={handlePipelineChange} />
//                     </div>

//                     <div className='add-jobs-select-container'>
//                         <div className='add-jobs-label-container'>
//                             <label>Template</label>
//                         </div>
//                         <Select className='add-jobs-select-dropdown'
//                             placeholder="Template"
//                             options={jobtemplateoptions}
//                             components={animatedComponents}
//                             value={selectedjobtemplate}
//                             isSearchable // Enable search
//                             isClearable
//                             onChange={handleJobTemplateChange} />
//                     </div>
//                     <div>
//                         <label style={{ fontSize: '14px' }}>Name</label>
//                         <input
//                             type='text'
//                             className='job-input'
//                             value={jobName} // Use job name as the value for the input field
//                             onChange={(e) => setJobName(e.target.value)} // Optionally, enable editing of job name
//                         />
//                     </div>
//                     <div className='add-jobs-select-container'>
//                         <div className='add-jobs-label-container'>
//                             <label>Job Assignees</label>
//                         </div>
//                         <Select className='add-jobs-select-dropdown'
//                             placeholder="Assignees"
//                             options={useroptions}
//                             components={animatedComponents}
//                             isMulti // Enable multi-select
//                             value={selecteduser}
//                             isSearchable // Enable search
//                             onChange={handleuserChange} />
//                     </div>
//                     <div className='add-jobs-select-container'>
//                         <div className='add-jobs-label-container'>
//                             <label>Priority</label>
//                         </div>
//                         <Priority onPriorityChange={handlePriorityChange} className='add-jobs-select-dropdown' selectedPriority={priority} />
//                     </div>
//                     <div style={{ marginTop: '20px', }}>

//                         <Editor editorStyle={{ height: "250px" }}
//                             editorState={editorState}
//                             onEditorStateChange={setEditorState}
//                             wrapperClassName="demo-wrapper"
//                             editorClassName="demo-editor"
//                             toolbarCustomButtons={[<CustomToolbar />]}
//                         />
//                     </div>
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

//                         <h3>Start and Due Date</h3>
//                         <div className="add-jobs-switch-container" style={{ marginTop: '10px' }}>
//                             <Switch
//                                 onChange={handleAbsolutesDates}
//                                 checked={absoluteDate}
//                                 onColor="#3A91F5"
//                                 onHandleColor="#FFF"
//                                 handleDiameter={10}
//                                 uncheckedIcon={false}
//                                 checkedIcon={false}
//                                 height={20}
//                                 width={32}
//                                 className="add-jobs-react-switch"
//                             />
//                             <span className="add-jobs-switch-label" style={{ cursor: "pointer" }}>Absolutes Dates</span>
//                         </div>

//                     </div>
//                     {!absoluteDate && (
//                         <div>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '5px', }}>
//                                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2'> <p>Starts In </p>
//                                     <SlQuestion style={{ color: 'blue' }} />
//                                 </div>
//                                 <div className='col-5'>
//                                     <input type='text' className='date-input' placeholder='0' onChange={(e) => setstartsin(e.target.value)} />
//                                 </div>
//                                 <div className='col-5'>
//                                     <Select className='add-jobs-select-dropdown ' options={dayoptions}
//                                         onChange={handlestartindateChange} />
//                                 </div>

//                             </div>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '20px' }}>
//                                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2'> <p>Due In </p>
//                                     <SlQuestion style={{ color: 'blue' }} />
//                                 </div>
//                                 <div className='col-5'>
//                                     <input type='text' className='date-input' placeholder='0' onChange={(e) => setduein(e.target.value)} />
//                                 </div>
//                                 <div className='col-5'>
//                                     <Select className='add-jobs-select-dropdown '
//                                         options={dayoptions}
//                                         onChange={handledueindateChange} />
//                                 </div>

//                             </div>
//                         </div>
//                     )}
//                     <div>
//                         {absoluteDate && (
//                             <div style={{ display: 'flex', gap: '5px', }}>
//                                 <div className='col-6' >
//                                     <label style={{ fontSize: '14px' }}>Start Date</label>
//                                     <div>
//                                         <DatePicker
//                                             selected={startDate}
//                                             onChange={handleStartDateChange}
//                                             className="date-picker-input "
//                                             placeholderText='Start Date'
//                                         />
//                                     </div>

//                                 </div>
//                                 <div className='col-6'>
//                                     <label style={{ fontSize: '14px' }}>Due Date</label>
//                                     <div>
//                                         <DatePicker selected={dueDate} onChange={handleDueDateChange} className="date-picker-input " placeholderText='Due Date' />
//                                     </div>

//                                 </div>
//                             </div>


//                         )}

//                     </div>
//                     <button onClick={createjob}>Save</button>
//                 </div>
//             )}
//         </>

//     )
// }

// export default TemplateJobData


import React, { useEffect, useState } from 'react';
import makeAnimated from "react-select/animated";

import Priority from '../../../Components/Templates/priority.js';
import Select from 'react-select';
import { SlQuestion } from "react-icons/sl";
import Switch from "react-switch";
import DatePicker from 'react-datepicker'; // Import date picker
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker stylesheet
import axios from 'axios';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, Modifier } from "draft-js";
const TemplateJobData = () => {
    const API_KEY = process.env.REACT_APP_API_IP;
    const animatedComponents = makeAnimated();
    const [jobtemplatedata, setjobtemplatedata] = useState([]);
    const [selectedjobtemplate, setSelectedjobtemplate] = useState();
    const [jobName, setJobName] = useState("");
  
    const handleJobTemplateChange = async (selectedOptions) => {
        setSelectedjobtemplate(selectedOptions);
        // Update job name with the selected template's name
        const selectedTemplate = jobtemplatedata.find(template => template._id === selectedOptions?.value);
        if (selectedTemplate) {
            setJobName(selectedTemplate.jobname);
        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_KEY}/workflow/jobtemplate/jobtemplateList/${selectedOptions.value}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                const jobAssignees = response.data.jobTemplate.jobassignees.map(assignee => assignee.username);
                setJobAssignees(jobAssignees);
                console.log(jobAssignees);

                const priority = response.data.jobTemplate.priority;
                console.log(priority);
                setPriority(priority);


                const description = response.data.jobTemplate.description;
                setJobDescription(description);
                console.log(description);

                const startdate = response.data.jobTemplate.startdate;
                console.log(startdate);
                setStartDate(startdate);

                const enddate = response.data.jobTemplate.enddate;
                console.log(enddate);
                setDueDate(enddate);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    useEffect(() => {
        fetchJobTemplateData();
    }, []);

    const fetchJobTemplateData = async () => {
        try {


            const url = `${API_KEY}/workflow/jobtemplate`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch pipeline data');
            }
            const data = await response.json();
            setjobtemplatedata(data.JobTemplates);



        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };
    const [jobAssignees, setJobAssignees] = useState([]);
    const handleJobAssigneesChange = (selectedOptions) => {
        
        // Update the job assignees state with selected names
        const selectedNames = selectedOptions.map((option) => option.label);
        setJobAssignees(selectedNames);
    };
  

    
    const jobtemplateoptions = Array.isArray(jobtemplatedata)
        ? jobtemplatedata.map((jobtemplate) => ({
            value: jobtemplate._id,
            label: jobtemplate.templatename,
        })) : [];


    //******************************Pipeline */

    const [pipelinedata, setpipelinedata] = useState([]);
    const [selectedPipeline, setSelectedpipeline] = useState();

    const handlePipelineChange = (selectedOptions) => {
        setSelectedpipeline(selectedOptions);
    }

    useEffect(() => {
        fetchPipelineData();
    }, []);

    const fetchPipelineData = async () => {
        try {
            const response = await fetch(`${API_KEY}/workflow/pipeline`);
            const data = await response.json();
            setpipelinedata(data.pipeline);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const pipelineoptions = Array.isArray(pipelinedata)
        ? pipelinedata.map((pipeline) => ({
            value: pipeline._id,
            label: pipeline.pipelineName,
        }))
        : [];
    
    //****************Accounts */
    const [accountdata, setaccountdata] = useState([]);
    const [selectedaccount, setSelectedaccount] = useState();
    const [combinedaccountValues, setCombinedaccountValues] = useState([]);

    const handleAccountChange = (selectedOptions) => {
        setSelectedaccount(selectedOptions);
        // Map selected options to their values and send as an array
        const selectedValues = selectedOptions.map((option) => option.value);
        setCombinedaccountValues(selectedValues);
    }

    useEffect(() => {
        fetchAccountData();
    }, []);

    const fetchAccountData = async () => {
        try {
            const response = await fetch(`${API_KEY}/admin/accountdetails`);
            const data = await response.json();
            setaccountdata(data.accounts);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // console.log(userdata);
    const accountoptions = accountdata.map((account) => ({
        value: account._id,
        label: account.accountName
    }));

    //****************Users */

    const [userdata, setUserData] = useState([]);
    const [selecteduser, setSelectedUser] = useState();
    const [combinedValues, setCombinedValues] = useState([]);

    const handleuserChange = (selectedOptions) => {
        setSelectedUser(selectedOptions);
        // Map selected options to their values and send as an array
        const selectedValues = selectedOptions.map((option) => option.value);
        setCombinedValues(selectedValues);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const url = `${API_KEY}/common/user`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch pipeline data');
            }
            const data = await response.json();
            setUserData(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // console.log(userdata);
    const useroptions = userdata.map((user) => ({
        value: user._id,
        label: user.username

    }));

    const [priority, setPriority] = useState(" ");
    const [jobDescription, setJobDescription] = useState("");
    // Handler function to update state when priority changes
    const handlePriorityChange = (selectedOption) => {
        setPriority(selectedOption);
        console.log(selectedOption); // Log the selected priority value to the console
    };


    const [startsin, setstartsin] = useState("");
    const [startsinduration, setstartsinduration] = useState("");
    const [duein, setduein] = useState("");
    const [dueinduration, setdueinduration] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [absoluteDate, setAbsoluteDates] = useState(false)

    const handleAbsolutesDates = (checked) => {
        setAbsoluteDates(checked)
    }
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleDueDateChange = (date) => {
        setDueDate(date);
    };


    // Combine day, month, and year options
    const dayoptions = [
        { label: 'Days', value: 'Days' },
        { label: 'Months', value: 'Months' },
        { label: 'Years', value: 'Years' }
    ];

    // Handler function to update state when dropdown value changes
    const handlestartindateChange = (selectedOption) => {
        setstartsinduration(selectedOption.value);
    };

    // Handler function to update state when dropdown value changes
    const handledueindateChange = (selectedOption) => {
        setdueinduration(selectedOption.value);
    };
   
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );

    
    const [showJobForm, setShowJobForm] = useState(false);
    useEffect(() => {
        // Fetch job template data and set the selected job template to the first one
        if (showJobForm && jobtemplateoptions.length > 0) {
            const firstJobTemplate = jobtemplateoptions[0];
            setSelectedjobtemplate(firstJobTemplate);
            handleJobTemplateChange(firstJobTemplate);
        }
    }, [showJobForm]);

    const createjob = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            accounts: combinedaccountValues,
            pipeline: selectedPipeline.value,
            templatename: selectedjobtemplate.value,
            jobname: jobName,
            jobassignees: combinedValues,
            priority: priority,
            description: jobDescription,
            absolutedates: absoluteDate,
            startsin: startsin,
            startsinduration: startsinduration,
            duein: duein,
            dueinduration: dueinduration,
            comments: "",
            startdate: startDate,
            enddate: dueDate,
        });
        console.log(raw);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${API_KEY}/workflow/job/`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then((result) => {
                // Handle success
                console.log("Job Template created successfully", result);
                window.location.reload();
            })
            .catch((error) => {
                // Handle errors
                console.error("Failed to create Job Template", error);
            });
    }
    return (
        <>
            <div>TemplateJobData</div>
            <button onClick={() => setShowJobForm(!showJobForm)}>Toggle Job Form</button>
            {showJobForm && (

                <div className='job-from'>
                    <div className='add-jobs-select-container'>
                        <div className='add-jobs-label-container'>
                            <label>Accounts</label>
                        </div>
                        <Select className='add-jobs-select-dropdown'
                            placeholder="Accounts"
                            options={accountoptions}
                            components={animatedComponents}
                            isMulti // Enable multi-select
                            value={selectedaccount}
                            isSearchable // Enable search
                            onChange={handleAccountChange} />
                    </div>
                    <div className='add-jobs-select-container'>
                        <div className='add-jobs-label-container'>
                            <label>Pipeline</label>
                        </div>
                        <Select className='add-jobs-select-dropdown'
                            placeholder="Pipeline"
                            options={pipelineoptions}
                            components={animatedComponents}
                            value={selectedPipeline}
                            isSearchable // Enable search
                            isClearable
                            onChange={handlePipelineChange} />
                    </div>

                    <div className='add-jobs-select-container'>
                        <div className='add-jobs-label-container'>
                            <label>Template</label>
                        </div>
                        <Select className='add-jobs-select-dropdown'
                            placeholder="Template"
                            options={jobtemplateoptions}
                            components={animatedComponents}
                            value={selectedjobtemplate}
                            isSearchable // Enable search
                            isClearable
                            onChange={handleJobTemplateChange} />
                    </div>
                    <div>
                        <label style={{ fontSize: '14px' }}>Name</label>
                        <input
                            type='text'
                            className='job-input'
                            value={jobName} // Use job name as the value for the input field
                            onChange={(e) => setJobName(e.target.value)} // Optionally, enable editing of job name
                        />
                    </div>
                    <div className='add-jobs-select-container'>
                        <div className='add-jobs-label-container'>
                            <label>Job Assignees</label>
                        </div>
                        <Select className='add-jobs-select-dropdown'
                            placeholder="Assignees"
                            options={useroptions}
                            components={animatedComponents}
                            isMulti // Enable multi-select
                          value={selecteduser}
                            // value={jobAssignees.map(name => ({ value: name, label: name }))}
                            // onChange={handleJobAssigneesChange}
                            isSearchable // Enable search
                           onChange={handleuserChange}
                             />
                    </div>
                    <div className='add-jobs-select-container'>
                        <div className='add-jobs-label-container'>
                            <label>Priority</label>
                        </div>
                        <Priority onPriorityChange={handlePriorityChange} className='add-jobs-select-dropdown' selectedPriority={priority} />
                    </div>
                    <div style={{ marginTop: '20px', }}>

                        <Editor editorStyle={{ height: "250px" }}
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        <h3>Start and Due Date</h3>
                        <div className="add-jobs-switch-container" style={{ marginTop: '10px' }}>
                            <Switch
                                onChange={handleAbsolutesDates}
                                checked={absoluteDate}
                                onColor="#3A91F5"
                                onHandleColor="#FFF"
                                handleDiameter={10}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                height={20}
                                width={32}
                                className="add-jobs-react-switch"
                            />
                            <span className="add-jobs-switch-label" style={{ cursor: "pointer" }}>Absolutes Dates</span>
                        </div>

                    </div>
                    {!absoluteDate && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2'> <p>Starts In </p>
                                    <SlQuestion style={{ color: 'blue' }} />
                                </div>
                                <div className='col-5'>
                                    <input type='text' className='date-input' placeholder='0' onChange={(e) => setstartsin(e.target.value)} />
                                </div>
                                <div className='col-5'>
                                    <Select className='add-jobs-select-dropdown ' options={dayoptions}
                                        onChange={handlestartindateChange} />
                                </div>

                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2'> <p>Due In </p>
                                    <SlQuestion style={{ color: 'blue' }} />
                                </div>
                                <div className='col-5'>
                                    <input type='text' className='date-input' placeholder='0' onChange={(e) => setduein(e.target.value)} />
                                </div>
                                <div className='col-5'>
                                    <Select className='add-jobs-select-dropdown '
                                        options={dayoptions}
                                        onChange={handledueindateChange} />
                                </div>

                            </div>
                        </div>
                    )}
                    <div>
                        {absoluteDate && (
                            <div style={{ display: 'flex', gap: '5px', }}>
                                <div className='col-6' >
                                    <label style={{ fontSize: '14px' }}>Start Date</label>
                                    <div>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={handleStartDateChange}
                                            className="date-picker-input "
                                            placeholderText='Start Date'
                                        />
                                    </div>

                                </div>
                                <div className='col-6'>
                                    <label style={{ fontSize: '14px' }}>Due Date</label>
                                    <div>
                                        <DatePicker selected={dueDate} onChange={handleDueDateChange} className="date-picker-input " placeholderText='Due Date' />
                                    </div>

                                </div>
                            </div>


                        )}

                    </div>
                    <button onClick={createjob}>Save</button>
                </div>
            )}
        </>

    )
}

export default TemplateJobData


