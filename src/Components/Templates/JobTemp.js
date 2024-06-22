import React, { useState, useRef, useEffect } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import Select from "react-select";
import Switch from "react-switch";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { LuPlusCircle } from "react-icons/lu";
import DatePicker from "react-datepicker"; // Import date picker
import "react-datepicker/dist/react-datepicker.css"; // Import date picker stylesheet
import { SlQuestion } from "react-icons/sl";
import { TfiWrite } from "react-icons/tfi";
import makeAnimated from "react-select/animated";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./jobtemp.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, Modifier } from "draft-js";
import Priority from "./priority";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
const JobTemplate = () => {
  const API_KEY = process.env.REACT_APP_API_IP;
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [absoluteDate, setAbsoluteDates] = useState(false);

  const handleAbsolutesDates = (checked) => {
    setAbsoluteDates(checked);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };
  //integration
  //   react Select =>
  const animatedComponents = makeAnimated();
  const [userdata, setUserData] = useState([]);
  const [selecteduser, setSelectedUser] = useState();
  const [combinedValues, setCombinedValues] = useState([]);

  const handleuserChange = (selectedOptions) => {
    setSelectedUser(selectedOptions);
    // Map selected options to their values and send as an array
    const selectedValues = selectedOptions.map((option) => option.value);
    setCombinedValues(selectedValues);
  };

  useEffect(() => {
    fetchData();
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

  // console.log(userdata);
  const options = userdata.map((user) => ({
    value: user._id,
    label: user.username,
  }));

  const [templatename, settemplatename] = useState("");
  const [jobname, setjobname] = useState("");
  const [startsin, setstartsin] = useState("");
  const [startsinduration, setstartsinduration] = useState("");
  const [duein, setduein] = useState("");
  const [dueinduration, setdueinduration] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [priority, setPriority] = useState(" ");

  // Handler function to update state when priority changes
  const handlePriorityChange = (selectedOption) => {
    setPriority(selectedOption);
  };

  const updateJobDescription = (description) => {
    setJobDescription(description);
  };

  // Combine day, month, and year options
  const dayoptions = [
    { label: "Days", value: "Days" },
    { label: "Months", value: "Months" },
    { label: "Years", value: "Years" },
  ];

  // Handler function to update state when dropdown value changes
  const handlestartindateChange = (selectedOption) => {
    setstartsinduration(selectedOption.value);
  };

  // Handler function to update state when dropdown value changes
  const handledueindateChange = (selectedOption) => {
    setdueinduration(selectedOption.value);
  };

  const [showForm, setShowForm] = useState(false);
  const [tempName, setTempName] = useState("");

  const handleCreateTemplate = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setTempName("");
  };

  //get all templateName Record
  const [JobTemplates, setJobTemplates] = useState([]);

  // useEffect(() => {
  //   async function fetchJobTemplates() {
  //     try {
  //       const url = `${API_KEY}/workflow/jobtemplate/`;

  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch job templates");
  //       }
  //       const data = await response.json();
  //       setJobTemplates(data.JobTemplates);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching job templates:", error);
  //     }
  //   }
  //   fetchJobTemplates();
  // }, []);

  useEffect(() => {
    fetchJobTemplatesData();
}, []);

const fetchJobTemplatesData = async () => {
  try {
    const url = `${API_KEY}/workflow/jobtemplate/`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch job templates");
    }
    const data = await response.json();
    setJobTemplates(data.JobTemplates);
    console.log(data);
  } catch (error) {
    console.error("Error fetching job templates:", error);
  }
};

  console.log(JobTemplates);

  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
  };

  const handleEdit = (_id) => {
    // Implement logic for editing here
    // console.log("Edit action triggered for template id: ", templateId);
    navigate("JobTemplateUpdate/" + _id);
  };

  //delete template
  const handleDelete = (_id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    const url = `${API_KEY}/workflow/jobtemplate/`;
    fetch(url + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        toast.success("Item deleted successfully");
        setShowForm(false);
        fetchJobTemplatesData();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete item");
      })
      .finally(() => {
        setTimeout(() => {
          // window.location.reload();
        }, 1000);
      });
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

  //data send
const handleClear =()=>{
  settemplatename("");
  setjobname("");
  setSelectedUser([]);
  setPriority("");
  setEditorState(EditorState.createEmpty());
  setAbsoluteDates(false);
  setStartDate(null);
  setDueDate(null);
}


  const createjobtemp = () => {
    if (absoluteDate === true) {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContentState);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        templatename: templatename,
        jobname: jobname,
        jobassignees: combinedValues,
        addshortcode: "",
        priority: priority.value,
        description: htmlContent,
        absolutedates: absoluteDate,
        comments: "",
        startdate: startDate,
        enddate: dueDate,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const url = `${API_KEY}/workflow/jobtemplate/`;
      fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((result) => {
          // Handle success
          toast.success("Job Template created successfully");
          // window.location.reload();
          setShowForm(false);
          fetchJobTemplatesData();
          handleClear();
          // Additional logic after successful creation if needed
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          toast.error("Failed to create Job Template");
        });
    } else if (absoluteDate === false) {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContentState);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        templatename: templatename,
        jobname: jobname,
        jobassignees: combinedValues,
        addshortcode: "",
        priority: priority.value,
        description: htmlContent,
        absolutedates: absoluteDate,
        startsin: startsin,
        startsinduration: startsinduration,
        duein: duein,
        dueinduration: dueinduration,
        comments: "",
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const url = `${API_KEY}/workflow/jobtemplate/`;
      fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((result) => {
          // Handle success
          toast.success("Job Template created successfully");
          setTimeout(() => window.location.reload(), 1000);
          setShowForm(false);

          // Additional logic after successful creation if needed
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          toast.error("Failed to create Job Template");
        });
    }
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(JobTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, JobTemplates.length);
  const currentTemplates = JobTemplates.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
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

  const handleAddShortcut = (shortcut) => {
    setjobname((prevText) => prevText + `[${shortcut}]`);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
    <div className="job-temp-container col-12" style={{ marginLeft: "15px", marginTop: "10px", height: "90vh", overflowY: "auto" }}>
      <div>
        {!showForm && (
          <div>
            <h1>Job Template</h1>
            <button className="btn1" style={{ marginBottom: "10px" }} onClick={handleCreateTemplate}>
              Create Template
            </button>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentTemplates.map((template) => (
                  <tr key={template._id}>
                    <td onClick={() => handleEdit(template._id)} style={{ cursor: "pointer", color: "var( --text-color)", }}>
                      {template.templatename}
                    </td>
                    <td>
                      <div className="ci-menu-kebab" onClick={() => toggleMenu(template._id)} style={{ cursor: "pointer", fontSize: "20px",  }}>
                        &#8942;
                      </div>
                      {openMenuId === template._id && (
                        <div className="jobtemp-menu-options">
                          <div onClick={() => handleEdit(template._id)} style={{ color: "blue", cursor: "pointer" }}>
                            Edit
                          </div>
                          <div onClick={(txt) => handleDelete(template._id)} style={{ color: "red", cursor: "pointer" }}>
                            Delete
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5} // Adjust this value as needed
                marginPagesDisplayed={2} // Adjust this value as needed
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
                previousLabel={<MdKeyboardDoubleArrowLeft style={{ cursor: "pointer" }} />}
                nextLabel={<MdKeyboardDoubleArrowRight style={{ cursor: "pointer" }} />}
                breakClassName={"break-me"} // Add a custom class name for the break
              />
            </div>
          </div>
        )}
      </div>
      <>
        {showForm && (
          <div className="job-template-container col-12">
            <div className="job-template-header" style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
              <h3>Create Job Template</h3>

              <div className="jobtemp-add" style={{ color: "var(--links-background)", cursor: "pointer" }}>
                <div>
                  <LuPlusCircle />
                  <span>Add </span>
                </div>
              </div>
            </div>
            <hr style={{ margin: "0 10px 0 10px" }} />
            <div className="job-template-form-area">
              <div className="job-template-create-form col-6">
                <div>
                  <label style={{ fontSize: "14px" }}>Template name</label>
                  <input style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} type="text" className="job-input" onChange={(e) => settemplatename(e.target.value)} placeholder="Template name" />
                </div>
                <div>
                  <label style={{ fontSize: "14px" }}>Job name</label>
                  <input style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} type="text" className="job-input" value={jobname + selectedShortcut} onChange={handlejobName} placeholder="Job name" />
                </div>

                <div className="dropdown-container">
                  <div className="addshortcodes" style={{ color: "var(--links-background)", cursor: "pointer" }}>
                    <button onClick={toggleDropdown} className="add-shortcut-icon" style={{ border: "none", background: "none", color: "blue" }}>
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
                    value={selecteduser}
                    isSearchable // Enable search
                    onChange={handleuserChange}
                  />
                </div>
                <div className="job-template-select-container">
                  <div className="job-template-label-container">
                    <label>Priority</label>
                  </div>
                  <Priority onPriorityChange={handlePriorityChange} className="add-jobs-select-dropdown" />
                </div>

                <div style={{ border: "1px solid #fff", marginTop: "20px", borderRadius: "12px", background: "white" }}>
                  <Editor editorStyle={{ height: "250px" }} editorState={editorState} wrapperClassName="demo-wrapper" editorClassName="demo-editor" toolbarCustomButtons={[<CustomToolbar />]} onEditorStateChange={setEditorState} />
                </div>

                <div className="job-template-dates-switches col-12" style={{ marginTop: "80px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h3>Start and Due Date</h3>
                  <div className="job-template-switch-container" style={{ marginTop: "10px" }}>
                    <Switch onChange={handleAbsolutesDates} checked={absoluteDate} onColor="#3A91F5" onHandleColor="#FFF" handleDiameter={10} uncheckedIcon={false} checkedIcon={false} height={20} width={32} className="job-template-react-switch" />
                    <span className="job-template-switch-label" style={{ cursor: "pointer" }}>
                      Absolutes Dates
                    </span>
                  </div>
                </div>
                {absoluteDate && (
                  <div className="col-12 job-template-absoluteDate " style={{ display: "flex", gap: "5px", marginTop: "30px" }}>
                    <div className="col-6">
                      <label style={{ fontSize: "14px" }}>Start Date</label>
                      <div>
                        <DatePicker selected={startDate} onChange={handleStartDateChange} className="date-picker-input " placeholderText="Start Date" />
                      </div>
                    </div>
                    <div className="col-6">
                      <label style={{ fontSize: "14px" }}>Due Date</label>
                      <div>
                        <DatePicker selected={dueDate} onChange={handleDueDateChange} className="date-picker-input " placeholderText="Due Date" />
                      </div>
                    </div>
                  </div>
                )}
                {!absoluteDate && (
                  <div className="select-dates-container" style={{ marginTop: "25%" }}>
                    <div className="col-12" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="col-2" placeholder="0">
                        {" "}
                        <p>Starts In </p>
                        <SlQuestion style={{ color: "blue" }} />
                      </div>
                      <div className="col-5">
                        <input style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} type="text" className="date-input" placeholder="0" onChange={(e) => setstartsin(e.target.value)} />
                      </div>
                      <div className="col-5">
                        <Select className="job-template-select-dropdown " options={dayoptions} onChange={handlestartindateChange} />
                      </div>
                    </div>
                    <div className="col-12" style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="col-2">
                        {" "}
                        <p>Due In </p>
                        <SlQuestion style={{ color: "blue" }} />
                      </div>
                      <div className="col-5">
                        <input type="text" className="date-input" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} placeholder="0" onChange={(e) => setduein(e.target.value)} />
                      </div>
                      <div className="col-5">
                        <Select className="job-template-select-dropdown " options={dayoptions} onChange={handledueindateChange} />
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
            <div className="bottom-buttons-group col-6" style={{ display: "flex", gap: "10px", marginLeft: "10px", marginBottom: "20px" }}>
              <button type="submit" className=" btn1 col-2" onClick={createjobtemp}>
                Save{" "}
              </button>
              <button type="reset" onClick={handleCancel} className="btn2 col-2">
                Cancel
              </button>
            </div>
            {/* </div> */}
          </div>
        )}
        <ToastContainer />
      </>
    </div>
  );
};

export default JobTemplate;
