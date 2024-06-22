import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, Modifier } from "draft-js";
import ReactPaginate from "react-paginate";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import { toast, ToastContainer } from "react-toastify";
import Priority from "./priority";
import Status from "./status";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker"; // Import date picker
import "react-datepicker/dist/react-datepicker.css"; // Import date picker stylesheet
import { SlQuestion } from "react-icons/sl";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./task.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const TaskEditor = () => {


  const { _id } = useParams();

  const API_KEY = process.env.REACT_APP_API_IP;


  const [priority, setPriority] = useState(" ");
  const [status, setStatus] = useState(" ");




  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const animatedComponents = makeAnimated();
  const [userdata, setUserData] = useState([]);
  const [AssigneesNew, setAssigneesNew] = useState([]);
  const [combinedValues, setCombinedValues] = useState([]);



  useEffect(() => {
    fetchidwiseData();
  }, []);

  //get id wise template Record
  const [tempvalues, setTempValues] = useState();
  const fetchidwiseData = async () => {
    try {
      const url = `${API_KEY}/workflow/tasktemplate/tasktemplatebyid/`;
      const response = await fetch(url + _id);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();


      const contentBlock = htmlToDraft(data.taskTemplate.description);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      setEditorState(EditorState.createWithContent(contentState));



      setTempValues(data.taskTemplate);

      // Extract assignees data and set it to assigneesOptions state
      if (data.taskTemplate && data.taskTemplate.taskassignees) {
        const assigneesData = data.taskTemplate.taskassignees.map((assignee) => ({
          value: assignee._id,
          label: assignee.username,
        }));

        setAssigneesNew(assigneesData);

        const selectedValues = assigneesData.map((option) => option.value);
        setCombinedValues(selectedValues);
      }

      if (data.taskTemplate && data.taskTemplate.tags) {
        const tagdata = data.taskTemplate.tags.map((tag) => ({
          value: tag._id,
          label: tag.tagName,
          colour: tag.tagColour,

          customStyle: {
            backgroundColor: tag.tagColour,
            color: "#fff",
            borderRadius: "5px",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "5px",
            padding: "2px,8px",

            fontSize: "10px",
            width: `${calculateWidth(tag.tagName)}px`,
            margin: "7px",
          }

        }));


        setSelectedTags(tagdata);

        const selectedtags = tagdata.map((option) => option.value);
        setCombinedValue(selectedtags);
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



  const tempallvalue = () => {
    console.log(tempvalues)
    settemplatename(tempvalues.templatename);
    setStatus(tempvalues.status);
    setPriority(tempvalues.priority);
    setstartsin(tempvalues.startsin);
    setduein(tempvalues.duein);
    setStartDate(tempvalues.startdate);
    setDueDate(tempvalues.enddate);
    setstartsinduration(tempvalues.startsinduration);
    setdueinduration(tempvalues.dueinduration);
    setAbsoluteDates(tempvalues.absolutedates);
  };

  useEffect(() => {
    fetchDatas();
  }, []);
  const fetchDatas = async () => {
    try {

      const url = `${API_KEY}/common/tag/`;

      const response = await fetch(url);
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //  for tags
  const calculateWidth = (label) => {
    // Ensure label is defined and is a string
    if (typeof label !== 'string') {
      return 0; // or any default value you prefer
    }

    // Trim the label to remove any leading or trailing whitespace
    const trimmedLabel = label.trim();

    // Calculate the width based on the length of the trimmed label, assuming each character is 8 pixels wide
    const textWidth = trimmedLabel.length * 8;

    // Return the minimum of the calculated width and 200 pixels
    return Math.min(textWidth, 200);
  };


  const option = tags.map((tag) => ({
    value: tag._id,
    label: tag.tagName,
    colour: tag.tagColour,

    customStyle: {
      backgroundColor: tag.tagColour,
      color: "#fff",
      borderRadius: "5px",
      alignItems: "center",
      textAlign: "center",
      marginBottom: "5px",
      padding: "2px,8px",

      fontSize: "10px",
      width: `${calculateWidth(tag.tagName)}px`,
      margin: "7px",
    },
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
      marginBottom: state.data.customStyle.marginBottom,

      fontSize: state.data.customStyle.fontSize,
      padding: state.data.customStyle.padding,
      margin: state.data.customStyle.margin,
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      textAlign: state.data.customStyle.textAlign,
      fontSize: state.data.customStyle.fontSize,
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: state.data.customStyle.color,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
      fontSize: state.data.customStyle.fontSize,
    }),
  };


  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);

    // Map selected options to their values and send as an array
    const selectedValues = selectedOptions.map((option) => option.value);

    // Send selectedValues array to your backend
    console.log("Selected Values:", selectedValues);
    setCombinedValue(selectedValues);
  };





  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption);
  };

  // Handler function to update state when priority changes
  const handlePriorityChange = (selectedOption) => {
    setPriority(selectedOption);
  };


  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [absoluteDate, setAbsoluteDates] = useState(false);
  const [startsin, setstartsin] = useState("");
  const [startsinduration, setstartsinduration] = useState("");
  const [duein, setduein] = useState("");
  const [dueinduration, setdueinduration] = useState("");

  const handleAbsolutesDates = (checked) => {
    setAbsoluteDates(checked);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const dayoptions = [
    { label: "Days", value: "Days" },
    { label: "Months", value: "Months" },
    { label: "Years", value: "Years" },
  ];
  const handlestartindateChange = (selectedOption) => {
    setstartsinduration(selectedOption.value);
  };

  const handledueindateChange = (selectedOption) => {
    setdueinduration(selectedOption.value);
  };

  // subtasks
  const [subtasks, setSubtasks] = useState([]);

  const handleAddSubtask = () => {
    const newId = String(subtasks.length + 1);
    setSubtasks([...subtasks, { id: newId, text: "" }]);
  };

  const handleInputChange = (id, value) => {
    setSubtasks(subtasks.map((subtask) => (subtask.id === id ? { ...subtask, text: value } : subtask)));
  };

  const handleDeleteSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const [SubtaskSwitch, setSubtaskSwitch] = useState(false);
  const handleSubtaskSwitch = (checked) => {
    setSubtaskSwitch(checked);
  };





  const handleuserChange = (AssigneesNew) => {
    setAssigneesNew(AssigneesNew);
    // Map selected options to their values and send as an array
    const selectedValues = AssigneesNew.map((option) => option.value);
    console.log(selectedValues);
    setCombinedValues(selectedValues);
  };


  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
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

  const handleDragEnd = (result) => {
    // Ensure a valid drop location
    if (!result.destination) return;

    // Reorder subtasks based on the drag-and-drop result
    const newSubtasks = Array.from(subtasks);
    const [reorderedItem] = newSubtasks.splice(result.source.index, 1);
    newSubtasks.splice(result.destination.index, 0, reorderedItem);

    // Update the state with the new order of subtasks
    setSubtasks(newSubtasks);
  };
  const [templatename, settemplatename] = useState("");
  const [combinedValue, setCombinedValue] = useState([]);
  const [shortcuts, setShortcuts] = useState([]);
  const dropdownRef = useRef(null);
  const [showTextDropdown, setShowTextDropdown] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('contacts');
  const [filteredShortcuts, setFilteredShortcuts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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

  useEffect(() => {
    fetchTakData();
  })
  const fetchTakData = async () => {
    try {

      const url = `${API_KEY}/workflow/tasktemplate/`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch task templates");
      }
      const data = await response.json();
      console.log(data)
      setJobTemplates(data.TaskTemplates
      );
    } catch (error) {
      console.error("Error fetching task templates:", error);
    }
  };

  const [JobTemplates, setJobTemplates] = useState([]);



  const navigate = useNavigate();

  const updateTask = () => {
   
    if (absoluteDate === true) {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContentState);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        templatename: templatename,
        status: status.value,
        taskassignees: combinedValues,
        tags: combinedValue,
        priority: priority.value,
        description: htmlContent,
        absolutedates: absoluteDate,
        startdate: startDate,
        enddate: dueDate,
      });

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const url = `${API_KEY}/workflow/tasktemplate/`;
      fetch(url + _id, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((result) => {
          // Handle success
          console.log(result)
          toast.success("task Template updated successfully");
          // window.location.reload();
          fetchTakData();
          // navigate('/firmtemplates/tasks');
          // Additional logic after successful creation if needed
        })
        .catch((error) => {
          // Handle errors
          console.error(error);

        });
    } else if (absoluteDate === false) {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContentState);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        templatename: templatename,
        status: status.value,
        taskassignees: combinedValues,
        tags: combinedValue,
        priority: priority.value,
        description: htmlContent,
        absolutedates: absoluteDate,
        startsin: startsin,
        startsinduration: startsinduration,
        duein: duein,
        dueinduration: dueinduration,

      });

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const url = `${API_KEY}/workflow/tasktemplate/`;
      fetch(url + _id, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((result) => {
          // Handle success
          toast.success("task Template updated successfully");
          // setTimeout(() => window.location.reload(), 1000);
          fetchTakData();
          navigate('/firmtemplates/tasks');
          // Additional logic after successful creation if needed
        })
        .catch((error) => {
          // Handle errors
          console.error(error);

        });
    }
  };








  return (
    <div className="Admin-task-container">



      <div className="Admin-task-tittle">
        <h2>Update task template</h2>
        <div className="task-container-all">
          <>
            <div className="A">



              <div className='input-box-task'>
                <div>
                  <label>Template Name</label>
                  <input type='text' placeholder='Template Name' value={templatename} onChange={(e) => settemplatename(e.target.value)} />
                </div>
                <div className="job-template-select-container">
                  <div className="job-template-label-container">
                    <label>Status</label>
                  </div>
                  <Status onStatusChange={handleStatusChange} selectedStatus={status} className="add-jobs-select-dropdown" />
                </div>
              </div>




              <div className='input-box-task_assignee'>

                <div>
                  <label style={{ marginBottom: '8px' }}>Task Assignee</label>

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
                  <Priority onPriorityChange={handlePriorityChange} selectedPriority={priority} className="add-jobs-select-dropdown" />
                </div>

              </div>

              <div style={{ marginTop: "20px", borderRadius: "12px", background: "white" }}>
                <Editor
                  editorStyle={{ height: '250px' }}
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  toolbarCustomButtons={[<CustomToolbar />]}
                  onEditorStateChange={setEditorState}
                />
              </div>

              <div style={{ marginTop: "50px" }} className="task-temp-tag">
                <label>Tags</label>
                <Select
                  options={option}
                  components={animatedComponents}
                  isMulti // Enable multi-select
                  value={selectedTags}
                  onChange={handleTagChange}
                  placeholder="Select tags..."
                  isSearchable // Enable search
                  styles={customStyles}
                />
              </div>

              <div className="task-template-dates-switches col-12" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "50px" }}>
                <h3>Start and Due Date</h3>
                <div className="job-template-switch-container" style={{ marginTop: "10px" }}>
                  <Switch onChange={handleAbsolutesDates} checked={absoluteDate} onColor="#3A91F5" onHandleColor="#FFF" handleDiameter={10} uncheckedIcon={false} checkedIcon={false} height={20} width={32} className="job-template-react-switch" />
                  <span className="job-template-switch-label" style={{ cursor: "pointer" }}>
                    Absolutes Dates
                  </span>
                </div>
              </div>

              {absoluteDate && (
                <div className="col-12 task-template-absoluteDate " style={{ display: "flex", gap: "5px" }}>
                  <div className="col-6">
                    <label style={{ fontSize: "14px" }}>Start Date</label>
                    <div>
                      <DatePicker selected={startDate} onChange={handleStartDateChange} className="date-picker-input" placeholderText="Start Date" />
                    </div>
                  </div>
                  <div className="col-6">
                    <label style={{ fontSize: "14px" }}>Due Date</label>
                    <div>
                      <DatePicker selected={dueDate} onChange={handleDueDateChange} className="date-picker-input" placeholderText="Due Date" />
                    </div>
                  </div>
                </div>
              )}

              {!absoluteDate && (
                <div className="task-select-dates-container" style={{ marginTop: "20%", margin: "20px" }}>
                  <div className="col-12" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="col-2">
                      <p>Starts In</p>
                      <SlQuestion style={{ color: "blue" }} />
                    </div>
                    <div className="col-5">
                      <input style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} type="text" className="date-input" placeholder="0" onChange={(e) => setstartsin(e.target.value)} value={startsin} />
                    </div>
                    <div className="col-5">
                      <Select className="job-template-select-dropdown" value={dayoptions.find((option) => option.value === startsinduration)} options={dayoptions} onChange={handlestartindateChange} />
                    </div>
                  </div>
                  <div className="col-12" style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="col-2">
                      <p>Due In</p>
                      <SlQuestion style={{ color: "blue" }} />
                    </div>
                    <div className="col-5">
                      <input type="text" className="date-input" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} placeholder="0" onChange={(e) => setduein(e.target.value)} value={duein} />
                    </div>
                    <div className="col-5">
                      <Select className="job-template-select-dropdown" value={dayoptions.find((option) => option.value === dueinduration)} options={dayoptions} onChange={handledueindateChange} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="B">

              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="task-subtasks">
                  <p>Subtasks</p>
                  <Switch onChange={handleSubtaskSwitch} checked={SubtaskSwitch} onColor="#3A91F5" onHandleColor="#FFF" handleDiameter={10} uncheckedIcon={false} checkedIcon={false} height={20} width={32} className="job-template-react-switch" />
                </div>

                {SubtaskSwitch && (
                  <Droppable droppableId="subtaskList">
                    {(provided) => (
                      <div className="subtask-input" {...provided.droppableProps} ref={provided.innerRef}>
                        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>

                        </div>

                        {subtasks.map((subtask, index) => (
                          <Draggable key={subtask.id} draggableId={subtask.id} index={index}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
                                  <input style={{ cursor: 'pointer' }} type="checkbox" className="subtask-checkbox" placeholder="subtask" />
                                  <input type="text" placeholder="Things To do" value={subtask.text} onChange={(e) => handleInputChange(subtask.id, e.target.value)} />
                                  <RiDeleteBin6Line style={{ cursor: 'pointer' }} onClick={() => handleDeleteSubtask(subtask.id)} className="task-bin-icon" />
                                  <PiDotsSixVerticalBold className="task-six-dots" />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        <div onClick={handleAddSubtask} style={{ margin: "10px", color: "#1976d3" }}>
                          <FiPlusCircle /> Add Subtasks
                        </div>
                      </div>
                    )}
                  </Droppable>
                )}
              </DragDropContext>
            </div>
            <div>
              <Link to='/firmtemplates/tasks'><button className="btn1" onClick={updateTask}>Save</button></Link>
              
            <Link to='/firmtemplates/tasks'><button className="btn2">Cancel</button></Link>  
            </div>
          </>
        </div>
      </div>


      <ToastContainer />
    </div>
  );
};

export default TaskEditor;
