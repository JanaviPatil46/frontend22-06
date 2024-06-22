import React, { useState, useRef, useEffect } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Select from "react-select";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Switch from "react-switch";
import { LuPlusCircle } from "react-icons/lu";
import DatePicker from "react-datepicker"; // Import date picker
import "react-datepicker/dist/react-datepicker.css"; // Import date picker stylesheet
import { SlQuestion } from "react-icons/sl";
import { TfiWrite } from "react-icons/tfi";
import makeAnimated from "react-select/animated";

import "./jobtemp.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, Modifier } from "draft-js";
import Priority from "./priority.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const JobTemplateUpdate = () => {
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_API_IP;

  const { _id } = useParams();
  const [templateData, setTemplateData] = useState(null);
  const [tempvalues, setTempValues] = useState();

  useEffect(() => {
    fetchidwiseData();
  }, []);

  //get id wise template Record

  const fetchidwiseData = async () => {
    try {
      const url = `${API_KEY}/workflow/jobtemplate/jobtemplateList/`;
      const response = await fetch(url + _id);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      const contentBlock = htmlToDraft(data.jobTemplate.description);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      setEditorState(EditorState.createWithContent(contentState));

      // console.log('Fetched data:', data);
      setTemplateData(data.jobTemplate);
      setTempValues(data.jobTemplate);

      // Extract assignees data and set it to assigneesOptions state
      if (data.jobTemplate && data.jobTemplate.jobassignees) {
        const assigneesData = data.jobTemplate.jobassignees.map((assignee) => ({
          value: assignee._id,
          label: assignee.username,
        }));
        setAssigneesNew(assigneesData);

        const selectedValues = assigneesData.map((option) => option.value);
        setCombinedValues(selectedValues);
      }
      tempallvalue();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (tempvalues) {
      tempallvalue();
    }
  }, [tempvalues]);

  const [tempNameNew, setTempNameNew] = useState("");
  const [JobNameNew, setJobNameNew] = useState();
  const [AssigneesNew, setAssigneesNew] = useState([]);
  const [PriorityNew, setPriorityNew] = useState();
  const [JobDescriptionNew, setJobDescriptionNew] = useState();
  const [StartsInNew, setStartsInNew] = useState();
  const [DueInNew, setDueInNew] = useState();
  const [StartsDateNew, setStartsDateNew] = useState();
  const [DueDateNew, setDueDateNew] = useState();
  const [StartsInDurationNew, setStartsInDurationNew] = useState();
  const [DueInDurationNew, setDueInDurationNew] = useState();
  const [AbsoluteDateNew, setAbsoluteDateNew] = useState();

  const tempallvalue = () => {
    setTempNameNew(tempvalues.templatename);
    setjobname(tempvalues.jobname);
    setPriorityNew(tempvalues.priority);
    setJobDescriptionNew(tempvalues.description);
    setStartsInNew(tempvalues.startsin);
    setDueInNew(tempvalues.duein);
    setStartsDateNew(tempvalues.startdate);
    setDueDateNew(tempvalues.enddate);
    setStartsInDurationNew(tempvalues.startsinduration);
    setDueInDurationNew(tempvalues.dueinduration);
    setAbsoluteDateNew(tempvalues.absolutedates);
  };
  console.log(AssigneesNew);
  const handleAbsolutesDates = (checked) => {
    setAbsoluteDateNew(checked);
  };
  console.log(AbsoluteDateNew);

  const handleStartDateChange = (date) => {
    setStartsDateNew(date);
  };

  const handleDueDateChange = (date) => {
    setDueDateNew(date);
  };
  //integration
  //   react Select =>
  const animatedComponents = makeAnimated();
  const [userdata, setUserData] = useState([]);
  const [combinedValues, setCombinedValues] = useState([]);

  console.log(AssigneesNew);

  const handleuserChange = (AssigneesNew) => {
    setAssigneesNew(AssigneesNew);
    // Map selected options to their values and send as an array
    const selectedValues = AssigneesNew.map((option) => option.value);
    console.log(selectedValues);
    setCombinedValues(selectedValues);
  };
  console.log(combinedValues);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = `${API_KEY}/common/user/`;
      const response = await fetch(url);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // console.log(userdata);
  const options = userdata.map((user) => ({
    value: user._id,
    label: user.username,
  }));

  // Handler function to update state when priority changes
  const handlePriorityChange = (selectedOption) => {
    setPriorityNew(selectedOption);
  };

  const updateJobDescription = (description) => {
    setJobDescriptionNew(description);
  };

  // Combine day, month, and year options
  const dayoptions = [
    { label: "Days", value: "Days" },
    { label: "Months", value: "Months" },
    { label: "Years", value: "Years" },
  ];

  // Handler function to update state when dropdown value changes
  const handlestartindateChange = (selectedOption) => {
    setStartsDateNew(selectedOption.value);
  };

  // Handler function to update state when dropdown value changes
  const handledueindateChange = (selectedOption) => {
    setDueInDurationNew(selectedOption.value);
  };

  const [showForm, setShowForm] = useState(false);
  const [tempName, setTempName] = useState("");

  const handleCancel = () => {
    setShowForm(false);
    setTempName("");
  };

  console.log(combinedValues);
  //data send
  const updatejobtemp = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContentState);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: tempNameNew,
      jobname: jobname,
      jobassignees: combinedValues,
      addshortcode: "",
      priority: PriorityNew.value,
      description: htmlContent,
      absolutedates: AbsoluteDateNew,
      startsin: StartsInNew,
      startsinduration: StartsInDurationNew,
      duein: DueInNew,
      dueinduration: DueInDurationNew,
      comments: "",
      startdate: StartsDateNew,
      enddate: DueDateNew,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const url = `${API_KEY}/workflow/jobtemplate/`;
    fetch(url + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((result) => {
        toast.success("Job Template created successfully");
        setTimeout(() => navigate("/firmtemplates/jobs"), 1000);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        toast.error("Failed to create Job Template");
      });
  };

  // for shortcodes
  const [filteredShortcuts, setFilteredShortcuts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShortcut, setSelectedShortcut] = useState("");
  const [shortcuts, setShortcuts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownhtml, setShowDropdownhtml] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedOption, setSelectedOption] = useState("contacts");

  useEffect(() => {
    setFilteredShortcuts(shortcuts.filter((shortcut) => shortcut.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, shortcuts]);

  const [jobname, setjobname] = useState("");
  const handleAddShortcut = (shortcut) => {
    setjobname((prevText) => prevText + `[${shortcut}]`);
    setShowDropdown(false);
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputText(value); // Update inputText state with the new value
    // console.log("Email Subject:", value); // Log the value to the console
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setSearchTerm(""); // Clear search term when showing the dropdown
  };
  const toggleDropdownhtml = () => {
    setShowDropdownhtml(!showDropdownhtml);
    setSearchTerm(""); // Clear search term when showing the dropdown
  };

  const dropdownRef = useRef(null);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [selectedShortcuthtml, setSelectedShortcuthtml] = useState("");
  useEffect(() => {
    if (selectedOption === "contacts") {
      // Set contact shortcuts
      const contactShortcuts = [
        { title: "Account Shortcodes", isBold: true },
        { title: "Account Name", isBold: false, value: "ACCOUNT_NAME" },
        { title: "Custom field:Website", isBold: false, value: "ACCOUNT_CUSTOM_FIELD:Website" },
        { title: "Contact Shortcodes", isBold: true },
        { title: "Contact Name", isBold: false, value: "CONTACT_NAME" },
        { title: "First Name", isBold: false, value: "FIRST_NAME" },
        { title: "Middle Name", isBold: false, value: "MIDDLE_NAME" },
        { title: "Last Name", isBold: false, value: "LAST_NAME" },
        { title: "Phone number", isBold: false, value: "PHONE_NUMBER" },
        { title: "Country", isBold: false, value: "COUNTRY" },
        { title: "Company name", isBold: false, value: "COMPANY_NAME " },
        { title: "Street address", isBold: false, value: "STREET_ADDRESS" },
        { title: "City", isBold: false, value: "CITY" },
        { title: "State/Province", isBold: false, value: "STATE / PROVINCE" },
        { title: "Zip/Postal code", isBold: false, value: "ZIP / POSTAL CODE" },
        { title: "Custom field:Email", isBold: false, value: "CONTACT_CUSTOM_FIELD:Email" },
        { title: "Date Shortcodes", isBold: true },
        { title: "Current day full date", isBold: false, value: "CURRENT_DAY_FULL_DATE" },
        { title: "Current day number", isBold: false, value: "CURRENT_DAY_NUMBER" },
        { title: "Current day name", isBold: false, value: "CURRENT_DAY_NAME" },
        { title: "Current week", isBold: false, value: "CURRENT_WEEK" },
        { title: "Current month number", isBold: false, value: "CURRENT_MONTH_NUMBER" },
        { title: "Current month name", isBold: false, value: "CURRENT_MONTH_NAME" },
        { title: "Current quarter", isBold: false, value: "CURRENT_QUARTER" },
        { title: "Current year", isBold: false, value: "CURRENT_YEAR" },
        { title: "Last day full date", isBold: false, value: "LAST_DAY_FULL_DATE" },
        { title: "Last day number", isBold: false, value: "LAST_DAY_NUMBER" },
        { title: "Last day name", isBold: false, value: "LAST_DAY_NAME" },
        { title: "Last week", isBold: false, value: "LAST_WEEK" },
        { title: "Last month number", isBold: false, value: "LAST_MONTH_NUMBER" },
        { title: "Last month name", isBold: false, value: "LAST_MONTH_NAME" },
        { title: "Last quarter", isBold: false, value: "LAST_QUARTER" },
        { title: "Last_year", isBold: false, value: "LAST_YEAR" },
        { title: "Next day full date", isBold: false, value: "NEXT_DAY_FULL_DATE" },
        { title: "Next day number", isBold: false, value: "NEXT_DAY_NUMBER" },
        { title: "Next day name", isBold: false, value: "NEXT_DAY_NAME" },
        { title: "Next week", isBold: false, value: "NEXT_WEEK" },
        { title: "Next month number", isBold: false, value: "NEXT_MONTH_NUMBER" },
        { title: "Next month name", isBold: false, value: "NEXT_MONTH_NAME" },
        { title: "Next quarter", isBold: false, value: "NEXT_QUARTER" },
        { title: "Next year", isBold: false, value: "NEXT_YEAR" },
      ];
      setShortcuts(contactShortcuts);
    } else if (selectedOption === "account") {
      // Set account shortcuts
      const accountShortcuts = [
        { title: "Account Shortcodes", isBold: true },
        { title: "Account Name", isBold: false, value: "ACCOUNT_NAME" },
        { title: "Custom field:Website", isBold: false, value: "ACCOUNT_CUSTOM_FIELD:Website" },
        { title: "Date Shortcodes", isBold: true },
        { title: "Current day full date", isBold: false, value: "CURRENT_DAY_FULL_DATE" },
        { title: "Current day number", isBold: false, value: "CURRENT_DAY_NUMBER" },
        { title: "Current day name", isBold: false, value: "CURRENT_DAY_NAME" },
        { title: "Current week", isBold: false, value: "CURRENT_WEEK" },
        { title: "Current month number", isBold: false, value: "CURRENT_MONTH_NUMBER" },
        { title: "Current month name", isBold: false, value: "CURRENT_MONTH_NAME" },
        { title: "Current quarter", isBold: false, value: "CURRENT_QUARTER" },
        { title: "Current year", isBold: false, value: "CURRENT_YEAR" },
        { title: "Last day full date", isBold: false, value: "LAST_DAY_FULL_DATE" },
        { title: "Last day number", isBold: false, value: "LAST_DAY_NUMBER" },
        { title: "Last day name", isBold: false, value: "LAST_DAY_NAME" },
        { title: "Last week", isBold: false, value: "LAST_WEEK" },
        { title: "Last month number", isBold: false, value: "LAST_MONTH_NUMBER" },
        { title: "Last month name", isBold: false, value: "LAST_MONTH_NAME" },
        { title: "Last quarter", isBold: false, value: "LAST_QUARTER" },
        { title: "Last_year", isBold: false, value: "LAST_YEAR" },
        { title: "Next day full date", isBold: false, value: "NEXT_DAY_FULL_DATE" },
        { title: "Next day number", isBold: false, value: "NEXT_DAY_NUMBER" },
        { title: "Next day name", isBold: false, value: "NEXT_DAY_NAME" },
        { title: "Next week", isBold: false, value: "NEXT_WEEK" },
        { title: "Next month number", isBold: false, value: "NEXT_MONTH_NUMBER" },
        { title: "Next month name", isBold: false, value: "NEXT_MONTH_NAME" },
        { title: "Next quarter", isBold: false, value: "NEXT_QUARTER" },
        { title: "Next year", isBold: false, value: "NEXT_YEAR" },
      ];
      setShortcuts(accountShortcuts);
    }
  }, [selectedOption]);

  const handlejobName = (e) => {
    const { value } = e.target;
    setjobname(value);
  };
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
            <div key={index} className={`dropdown-item ${shortcode.isBold ? "bold" : ""}`} onClick={() => handleShortcodeClick(shortcode)}>
              {shortcode.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const handleShortcodeClick = (shortcode) => {
    insertText(`[${shortcode.value}]`);
    setShowDropdown(false);
  };
  const insertText = (text) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const newContentState = Modifier.insertText(contentState, selectionState, text);
    const newEditorState = EditorState.push(editorState, newContentState, "insert-characters");
    setEditorState(newEditorState);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowTextDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="job-template-container col-12">
        <div className="job-template-header" style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
          <h3>Edit job Template</h3>

          <div className="Add-job-temp" style={{ color: "blue", fontSize: "15px", cursor: "pointer" }}>
            <LuPlusCircle />
            <span>Add </span>
          </div>
        </div>
        <hr style={{ margin: "0 10px 0 10px" }} />
        <div className="job-template-form-area">
          <div className="job-template-create-form col-6">
            <div>
              <label style={{ fontSize: "14px" }}>Template name</label>
              <input type="text" className="job-input" onChange={(e) => setTempNameNew(e.target.value)} value={tempNameNew} placeholder="templateName" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
            </div>
            <div>
              <label style={{ fontSize: "14px" }}>Job name</label>
              <input type="text" className="job-input" value={jobname + selectedShortcut} onChange={handlejobName} placeholder="Job name" />
            </div>

            <div className="addshortcodes" style={{ color: "blue", cursor: "pointer" }}>
              <button onClick={toggleDropdown} className="add-shortcut-icon" style={{ color: "blue", cursor: "pointer", background: "none", border: "none" }}>
                {" "}
                <RiAddCircleLine /> Add Shortcode
              </button>

              {showDropdown && (
                <div className="dropdown" ref={dropdownRef}>
                  <div className="search-bar">
                    <input type="text" placeholder="Search shortcuts" value={searchTerm} onChange={handleSearchChange} />
                    <button className="job-temp-close-icon" style={{ border: "none", background: "none", color: "#007bff" }} onClick={toggleDropdown}>
                      <IoIosCloseCircleOutline />
                    </button>
                  </div>
                  <ul className="dropdown-list">
                    {filteredShortcuts.map((shortcut) => (
                      <div key={shortcut.title}>
                        <span style={{ fontWeight: shortcut.isBold ? "bold" : "normal", cursor: "pointer" }} onClick={() => handleAddShortcut(shortcut.value)}>
                          {shortcut.title}
                        </span>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="job-template-select-container">
              <div className="job-template-label-container">
                <label>Assignees</label>
              </div>
              <Select
                className="job-template-select-dropdown"
                placeholder="Assignees"
                options={options}
                components={animatedComponents}
                isMulti // Enable multi-select
                isSearchable // Enable search
                value={AssigneesNew}
                onChange={handleuserChange}
              />
            </div>

            <div className="job-template-select-container">
              <div className="job-template-label-container">
                <label>Priority</label>
              </div>
              <Priority onPriorityChange={handlePriorityChange} selectedPriority={PriorityNew} className="add-jobs-select-dropdown" />
            </div>

            <div style={{ border: "1px solid #fff", marginTop: "20px", borderRadius: "12px", background: "white" }}>
              <Editor editorStyle={{ height: "250px" }} editorState={editorState} wrapperClassName="demo-wrapper" editorClassName="demo-editor" toolbarCustomButtons={[<CustomToolbar />]} onEditorStateChange={setEditorState} />
            </div>

            <div className="job-template-dates-switches col-12" style={{ marginTop: "80px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3>Start and Due Date</h3>
              <div className="job-template-switch-container" style={{ marginTop: "10px" }}>
                <Switch onChange={handleAbsolutesDates} checked={AbsoluteDateNew} onColor="#3A91F5" onHandleColor="#FFF" handleDiameter={10} uncheckedIcon={false} checkedIcon={false} height={20} width={32} className="job-template-react-switch" />
                <span className="job-template-switch-label" style={{ cursor: "pointer" }}>
                  Absolutes Dates
                </span>
              </div>
            </div>
            {AbsoluteDateNew && (
              <div className="col-12 job-template-absoluteDate " style={{ display: "flex", gap: "5px", marginTop: "30px" }}>
                <div className="col-6">
                  <label style={{ fontSize: "14px" }}>Start Date</label>
                  <div>
                    <DatePicker selected={StartsDateNew} onChange={handleStartDateChange} className="date-picker-input " placeholderText="Start Date" />
                  </div>
                </div>
                <div className="col-6">
                  <label style={{ fontSize: "14px" }}>Due Date</label>
                  <div>
                    <DatePicker selected={DueDateNew} onChange={handleDueDateChange} className="date-picker-input " placeholderText="Due Date" />
                  </div>
                </div>
              </div>
            )}
            {!AbsoluteDateNew && (
              <div className="select-dates-container" style={{ marginTop: "25%" }}>
                <div className="col-12" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="col-2" placeholder="0">
                    {" "}
                    <p>Starts In </p>
                    <SlQuestion style={{ color: "blue" }} />
                  </div>
                  <div className="col-5">
                    <input type="text" className="date-input" placeholder="0" value={StartsInNew} onChange={(e) => setStartsInNew(e.target.value)} />
                  </div>
                  <div className="col-5">
                    <Select className="job-template-select-dropdown " options={dayoptions} value={dayoptions.find((option) => option.value === StartsInDurationNew)} onChange={handlestartindateChange} />
                  </div>
                </div>
                <div className="col-12" style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="col-2">
                    {" "}
                    <p>Due In </p>
                    <SlQuestion style={{ color: "blue" }} />
                  </div>
                  <div className="col-5">
                    <input type="text" className="date-input" placeholder="0" value={DueInNew} onChange={(e) => setDueInNew(e.target.value)} />
                  </div>
                  <div className="col-5">
                    <Select className="job-template-select-dropdown " options={dayoptions} value={dayoptions.find((option) => option.value === DueInDurationNew)} onChange={(e) => handledueindateChange(e.target.value)} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="vl"></div>

          <div className="job-template-comments-wiki col-6" style={{ textAlign: "center", margin: "20% 0 0 0" }}>
            <TfiWrite style={{ fontSize: "100px", color: "gray" }} />
            <p style={{ margin: "30px 0 0 30px" }}>There are no comments or wiki pages yet</p>
          </div>
        </div>

        <hr style={{ margin: "0 10px 20px 10px" }} />

        {/* <div className='bottom-buttons'> */}
        <div className="bottom-buttons-group col-6" style={{ display: "flex", gap: "10px" }}>
          <button type="submit" className="btn1  " onClick={updatejobtemp}>
            Save{" "}
          </button>
          {/* <button type='reset' style={{ padding: '10px', borderRadius: '10px', cursor: 'pointer', background: '#fff', color: 'blue', border: '1px solid blue', fontSize: '15px' }} clasnbdcsName='col-2'>Save</button> */}
          <button type="reset" onClick={handleCancel} className="btn2">
            Cancel
          </button>
        </div>
        {/* </div> */}
        <ToastContainer />
      </div>
    </>
  );
};

export default JobTemplateUpdate;
