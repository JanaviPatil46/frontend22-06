import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { RiAddCircleLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import Switch from "react-switch";
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import makeAnimated from "react-select/animated";
import { LuConstruction } from 'react-icons/lu';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const SendAccountEmail = (selectedAccounts) => {

  const [htmlContent, setHtmlContent] = useState(''); // State to store raw HTML content
  const API_KEY = process.env.REACT_APP_API_IP;

  const [scheduledEmail, setScheduledEmail] = useState(false)
  const handleScheduledEmail = (checked) => {
    setScheduledEmail(checked)
  }

  const shortcutsOptions = [
    { value: 'contact_shortcuts', label: 'Contact Shortcuts' },
    { value: 'account_shortcuts', label: 'Account Shortcuts' },
  ];
  const customShortcutsStyles = {
    container: (provided) => ({
      ...provided,
      // margin: '0 auto',
      // marginTop: '50px',
      // width: '300px',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#f0f0f0',
      borderColor: '#ccc',
      border: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#f9f9f9',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#e6e6e6' : '#f9f9f9',
      color: state.isSelected ? '#333' : '#000',
      '&:active': {
        backgroundColor: '#ddd',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#999',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333',
    }),
  };
  const customTempStyles = {
    container: (provided) => ({
      ...provided,
      width: '400px',
    }),
  }


  const [inputText, setInputText] = useState('');
  const [selectedShortcut, setSelectedShortcut] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShortcuts, setFilteredShortcuts] = useState([]);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('contacts'); // Default selected option


  const [shortcuts, setShortcuts] = useState([]);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputText(value); // Update inputText state with the new value
    // console.log("Email Subject:", value); // Log the value to the console
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setSearchTerm(''); // Clear search term when showing the dropdown
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleAddShortcut = (shortcut) => {
    setEmailSubject(prevText => prevText + `[${shortcut}]`);
    setShowDropdown(false);


  };
  useEffect(() => {
    setFilteredShortcuts(shortcuts.filter(shortcut => shortcut.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, shortcuts]);
  useEffect(() => {
    if (selectedOption === 'contacts') {
      // Set contact shortcuts
      const contactShortcuts = [
        { title: 'Account Shortcodes', isBold: true },
        { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
        { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
        { title: 'Contact Shortcodes', isBold: true, },
        { title: 'Contact Name', isBold: false, value: 'CONTACT_NAME' },
        { title: 'First Name', isBold: false, value: 'FIRST_NAME' },
        { title: 'Middle Name', isBold: false, value: 'MIDDLE_NAME' },
        { title: 'Last Name', isBold: false, value: 'LAST_NAME' },
        { title: 'Phone number', isBold: false, value: 'PHONE_NUMBER' },
        { title: 'Country', isBold: false, value: 'COUNTRY' },
        { title: 'Company name', isBold: false, value: 'COMPANY_NAME ' },
        { title: 'Street address', isBold: false, value: 'STREET_ADDRESS' },
        { title: 'City', isBold: false, value: 'CITY' },
        { title: 'State/Province', isBold: false, value: 'STATE / PROVINCE' },
        { title: 'Zip/Postal code', isBold: false, value: 'ZIP / POSTAL CODE' },
        { title: 'Custom field:Email', isBold: false, value: 'CONTACT_CUSTOM_FIELD:Email' },

        { title: 'Date Shortcodes', isBold: true },
        { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
        { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
        { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
        { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
        { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
        { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
        { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
        { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
        { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
        { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
        { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
        { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
        { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
        { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
        { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
        { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
        { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
        { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
        { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
        { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
        { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
        { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
        { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
        { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }



      ];
      setShortcuts(contactShortcuts);
    } else if (selectedOption === 'account') {
      // Set account shortcuts
      const accountShortcuts = [
        { title: 'Account Shortcodes', isBold: true },
        { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
        { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
        { title: 'Date Shortcodes', isBold: true },
        { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
        { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
        { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
        { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
        { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
        { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
        { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
        { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
        { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
        { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
        { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
        { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
        { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
        { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
        { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
        { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
        { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
        { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
        { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
        { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
        { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
        { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
        { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
        { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }



      ]; setShortcuts(accountShortcuts);
    }
  }, [selectedOption]);

  const [showTextDropdown, setShowTextDropdown] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const CustomToolbar = () => (
    <div className="rdw-editor-toolbar">
      <div className="dropdown-button" onClick={() => setShowTextDropdown(!showTextDropdown)}>
        Add Shortcode
      </div>
      {showTextDropdown && (
        <div className="dropdown-menu" ref={dropdownRef}>
          {shortcuts.map((shortcode, index) => (
            <div
              key={index}
              className={`dropdown-item ${shortcode.isBold ? 'bold' : ''}`}
              onClick={() => handleShortcodeClick(shortcode)}
            >
              {shortcode.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );


  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleShortcodeClick = (shortcode) => {
    insertText(`[${shortcode.value}]`);
    setShowDropdown(false);
  };

  const insertText = (text) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const newContentState = Modifier.insertText(contentState, selectionState, text);
    const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
    setEditorState(newEditorState);
  };


  //*********************************Drop Down Fill */
  const animatedComponents = makeAnimated();
  const [userdata, setUserData] = useState([]);
  const [selecteduser, setSelectedUser] = useState();

  const [selectedto, setSelectedTo] = useState();
  const [emailTemplatedata, setEmailTemplateData] = useState([]);
  const [emailTemplate, setEmailTemplate] = useState();
  const [fetchtemplatedata, setFetchTemplateData] = useState()
  const [emailBody, setEmailBody] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [userEmailData, setUserEmailData] = useState();

  useEffect(() => {
    fetchData();
    fetchemailTemplateData();
  }, []);

  const fetchData = async () => {
    try {
      // const url = `${API_KEY}/common/user/`;
      const url = `${API_KEY}/common/users/roles?roles=Admin,TeamMember`;
      const response = await fetch(url);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = userdata.map((user) => ({
    value: user._id,
    label: user.username
  }));

  const handleuserChange = async (selectedOptions) => {
    setSelectedUser(selectedOptions);
    
    const url = `${API_KEY}/common/user/${selectedOptions.value}`;
    // const url = `${API_KEY}/common/user/`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    setUserEmailData(data.email);
  }




  const fetchemailTemplateData = async () => {
    try {
      const url = `${API_KEY}/workflow/emailtemplate/`;
      const response = await fetch(url);
      const data = await response.json();
      setEmailTemplateData(data.emailTemplate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const emailoptions = emailTemplatedata.map((emailtemplate) => ({
    value: emailtemplate._id,
    label: emailtemplate.templatename
  }));

  const handleEmailtemp = (selectedOptions) => {
    if (selectedOptions && selectedOptions.value) {
      setEmailTemplate(selectedOptions);
      fetchDataemaildetails(selectedOptions.value);
    } else {
      console.error("Invalid selected options:", selectedOptions);
    }
  }

  const fetchDataemaildetails = async (selecttempId) => {
    try {

      const url = `${API_KEY}/workflow/emailtemplate/${selecttempId}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log(data)

      const contentBlock = htmlToDraft(data.emailTemplate.emailbody);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      setEditorState(EditorState.createWithContent(contentState));
      setHtmlContent(data.emailTemplate.emailbody);
      setFetchTemplateData(data.emailTemplate);

      setEmailSubject(data.emailTemplate.emailsubject
      )
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEmailInputChange = (e) => {
    const { value } = e.target;
    setEmailSubject(value);
  };


  const [accountOptions, setAccountOptions] = useState([]);



  // Function to fetch account details
  const fetchAccountDetails = async (accountId) => {
    // console.log(accountId)
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    try {
      const url = `${API_KEY}/admin/accountdetails/${accountId}`;
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  // Populate account options for the dropdown
  useEffect(() => {
    const populateOptions = async () => {
      if (!Array.isArray(selectedAccounts.selectedAccounts)) {
        console.error("Selected accounts is not an array.");
        return;
      }

      const options = [];
      for (const accountId of selectedAccounts.selectedAccounts) {
        const account = await fetchAccountDetails(accountId);
        options.push({ value: account.account._id, label: account.account.accountName });
      }
      setAccountOptions(options);
    };

    populateOptions();
  }, [selectedAccounts]);



  const navigate = useNavigate();

  const [combinedValues, setCombinedValues] = useState([]);
  const handleToselect = (selectedOptions) => {



    setSelectedTo(selectedOptions);
    // Map selected options to their values and send as an array
    const selectedValues = selectedOptions.map((option) => option.value);
    console.log(selectedValues)
    // const dataToSend = {
    //   selectedAccounts: selectedValues
    // };

    setCombinedValues(selectedValues);
  }

  // console.log(combinedValues);
  // console.log(selectedto);
  const sendbulkEmail = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContentState);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      selectedAccounts: combinedValues,
      emailtemplateid: emailTemplate.value,
      emailsubject: emailSubject,
      emailbody: htmlContent,
      notificationemail: userEmailData,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    const url = `${API_KEY}/sendBulkEmails`;
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          toast.error(response);
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((success) => {
             })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while sending emails");
      });
      toast.success("After sending all mails you will get notification mail.");
      //  setTimeout(() =>  navigate('/accounts'), 1000);
      window.location.reload();
  }



  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowTextDropdown(false);
    }
};

useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


  return (
    <div>

      <div className="send-email-container">
        <label>Template</label>
        <div className="contact-temp">
          <Select styles={customTempStyles}
            components={animatedComponents}
            isMulti={false} // Enable multi-select
            value={emailTemplate}
            isSearchable // Enable search
            options={emailoptions}
            onChange={handleEmailtemp}
          />
          <Select
            options={shortcutsOptions}
            // onChange={handleChange}
            placeholder="Select an option..."
            styles={customShortcutsStyles}
            defaultValue={shortcutsOptions[0]}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <lable >From</lable>
          <Select className="select-email"
            components={animatedComponents}
            isMulti={false} // Enable multi-select
            value={selecteduser}
            isSearchable // Enable search
            options={options}
            onChange={handleuserChange}
          />

        </div>
        <div style={{ margin: '10px 0' }}>
          <lable >To</lable>

          <Select className="select-email"
            placeholder="To"
            options={accountOptions}
            components={animatedComponents}
            isMulti={true}// Enable multi-select
            value={selectedto}
            isSearchable // Enable search
            onChange={handleToselect}
          />
        </div>
        <div >
          <div>
            <label>Subject</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <input type="text" placeholder="Subject" value={emailSubject + selectedShortcut}
                onChange={handleEmailInputChange}
                autoCapitalize="off"
              />
               <button type="button" style={{ background: "none", border: 'none',color:'blue' }} className="btn  add-shortcut-button" onClick={toggleDropdown}>
                  <RiAddCircleLine className="add-shortcut-icon" /> Add Shortcode
                </button>

            </div>
            {showDropdown && (
                  <div className="dropdown" ref={dropdownRef}>
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder="Search shortcuts"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <button className="close-icon" style={{ fontSize: "20px", marginTop: '4px' }} onClick={toggleDropdown}>
                        <IoIosCloseCircleOutline />
                      </button>
                    </div>
                    <ul className="dropdown-list">
                      {filteredShortcuts.map(shortcut => (
                        <div key={shortcut.title}>
                          <span
                            style={{ fontWeight: shortcut.isBold ? 'bold' : 'normal', cursor: 'pointer' }}
                            onClick={() => handleAddShortcut(shortcut.value)}>
                            {shortcut.title}
                          </span>
                        </div>
                      ))}
                    </ul>
                  </div>
                )}

            <div >
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                toolbarCustomButtons={[<CustomToolbar />]}
                onEditorStateChange={setEditorState}

                value={emailBody}
              />
            </div>

            <div className="scheduled-emails" style={{ marginTop: '10px' }}>
              <Switch
                onChange={handleScheduledEmail}
                checked={scheduledEmail}
                onColor="#3A91F5"
                onHandleColor="#FFF"
                handleDiameter={10}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={32}
                className="react-switch"
              />
              <span className="scheduled-emails-label" style={{ cursor: "pointer" }}>scheduled email</span>
            </div>
            {
              scheduledEmail && (
                <div className='datetime'>
                  <div style={{ marginBottom: '10px' }}>
                    <label >Date & time</label>
                  </div>

                  <Select placeholder='Date & time' />
                </div>
              )
            }
            <div className='buttons-email'>
              <button className='btn1' onClick={sendbulkEmail}>Send</button>
              <button className='btn2'>Cancle</button>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default SendAccountEmail