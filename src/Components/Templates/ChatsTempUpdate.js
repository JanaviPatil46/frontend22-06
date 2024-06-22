import React, { useState, useEffect, useRef } from 'react'
import './FolderTemplate/chat.css'
import Select from "react-select";
import { RiAddCircleLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, Modifier } from "draft-js";
import Switch from "react-switch";
import { ToastContainer, toast } from 'react-toastify';
import draftToHtml from "draftjs-to-html";
import { useParams } from 'react-router-dom';
import htmlToDraft from "html-to-draftjs";
import { useNavigate } from 'react-router-dom';
const ChatsTempUpdate = () => {

    const { _id } = useParams();
    const API_KEY = process.env.REACT_APP_API_IP;
    const [inputText, setInputText] = useState('');
    const [selectedShortcut, setSelectedShortcut] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredShortcuts, setFilteredShortcuts] = useState([]);
    const dropdownRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState('contacts'); // Default selected option
    const [isSendReminders, setIsSendReminders] = useState(false)

    //****************Fetch all data by Id */
    const [chat, setChat] = useState();

    useEffect(() => {
        fetchChatTemp(_id);
    }, []);

    const fetchChatTemp = (id) => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const url = `${API_KEY}/workflow/chattemplate/chattemplateList/${id}`;
        fetch(url, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                const chatResult = JSON.parse(result);

                setChat(chatResult.chatTemplate);

                setTemplatename(chatResult.chatTemplate.templatename)
                setInputText(chatResult.chatTemplate.chatsubject)
                if (chatResult.chatTemplate && chatResult.chatTemplate.from) {
                    const fromData = {
                        value: chatResult.chatTemplate.from._id,
                        label: chatResult.chatTemplate.from.username,
                    };
                    setSelectedUser(fromData);
                }
                setIsSendReminders(chatResult.chatTemplate.sendreminderstoclient)
                setDaysuntilNextReminder(chatResult.chatTemplate.daysuntilnextreminder)
                setNoOfReminder(chatResult.chatTemplate.numberofreminders)
                const contentBlock = htmlToDraft(chatResult.chatTemplate.description);
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                setEditorState(EditorState.createWithContent(contentState));
            })
            .catch((error) => console.error(error));
    }




    const handleSendReminder = (checked) => {
        setIsSendReminders(checked)
    }

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
        setInputText(prevText => prevText + `[${shortcut}]`);
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

    //************************************* */


    const handleCancel = () => {
        navigate('/firmtemplates/chats');
    };
    const navigate = useNavigate();
    //**************************   Integration */
    const [userdata, setUserData] = useState([]);
    const [selecteduser, setSelectedUser] = useState();
    const [templatename, setTemplatename] = useState();
    const [daysuntilNextReminder, setDaysuntilNextReminder] = useState();
    const [noOfReminder, setNoOfReminder] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const url = `${API_KEY}/common/users/roles?roles=Admin`;
            const response = await fetch(url);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const option = userdata.map((user) => ({
        value: user._id,
        label: user.username
    }));
    const handleuserChange = (selectedOptions) => {
        setSelectedUser(selectedOptions);
    }

    //**  save chat code */
    const savechat = async () => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const htmlContent = draftToHtml(rawContentState);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            templatename: templatename,
            from: selecteduser.value,
            chatsubject: inputText,
            description: htmlContent,
            sendreminderstoclient: isSendReminders,
            daysuntilnextreminder: daysuntilNextReminder,
            numberofreminders: noOfReminder,
            clienttasks: ["ghghghghj"],
            active: "true"
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const url = `${API_KEY}/workflow/chattemplate/${_id}`;
        fetch(url, requestOptions)
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((result) => {
                console.log(result.message)
                // toast.success("Invoice created successfully");
                if (result && result.message === "ChatTemplate Updated successfully") {
                    toast.success("ChatTemplate updated successfully");
                   
                    setTimeout(() => {
                        navigate('/firmtemplates/chats');
                    }, 1000);
                } else {
                    toast.error(result.message || "Failed to create Chat Template");
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <div className='chat-container'>
                <div className='chat-title'>
                    <h3>Create message template</h3>
                </div>
                <div className='chat-container-all'>
                    <div style={{ border: '1px solid grey' }}></div>
                    <div className='chat-container-main' >
                        {/* form */}
                        <div className='chat-form '>
                            <div>
                                <label style={{ fontSize: '14px' }}>Name</label>
                                <input type='text' placeholder='Name' className='pipeline-input' value={templatename} onChange={(e) => setTemplatename(e.target.value)} />
                            </div>
                            <div>
                                <div className='label-container'>
                                    <label>From</label>
                                </div>
                                <Select
                                    className='select-dropdown'
                                    placeholder="From"
                                    options={option}
                                    isMulti={false} // Enable multi-select
                                    value={selecteduser}
                                    isClearable
                                    isSearchable
                                    onChange={handleuserChange}

                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '14px' }}>Subject</label>
                                <input type='text' placeholder='Subject' className='pipeline-input' value={inputText + selectedShortcut} onChange={handleInputChange} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', }} >
                                    <button style={{ color: 'blue', fontSize: '20px', background: 'none' }} onClick={toggleDropdown} >
                                        <p style={{ color: 'blue', cursor: 'pointer', }}> <RiAddCircleLine /> Add Shortcuts</p >
                                    </button>
                                </div>
                                {showDropdown && (
                                    <div className="dropdown" ref={dropdownRef}>
                                        <div className="search-bar" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                            <input
                                                type="text"
                                                placeholder="Search shortcuts"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                            <button className="close-icon-email" style={{ fontSize: "20px", marginTop: '4px', border: 'none', background: 'none', color: '#007bff' }} onClick={toggleDropdown}>
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
                            </div>
                            <div style={{ border: '1px solid #fff', marginTop: '20px', borderRadius: "12px", background: 'white' }} >
                                <Editor
                                    editorStyle={{ height: '250px' }}
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    toolbarCustomButtons={[<CustomToolbar />]}
                                    onEditorStateChange={setEditorState}
                                />
                            </div>
                            <div className='reminders-to-clients'>
                                <Switch
                                    onChange={handleSendReminder}
                                    checked={isSendReminders}
                                    onColor="#3A91F5"
                                    onHandleColor="#FFF"
                                    handleDiameter={10}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={20}
                                    width={32}
                                    className="react-switch"
                                />
                                <span className="scheduled-emails-label" style={{ cursor: "pointer" }}  >Send reminders to clients</span>
                            </div>
                            {
                                isSendReminders && (
                                    <div className='reminder'>
                                        <div>
                                            <label>Days until next reminder</label>
                                            <input type='text' value={daysuntilNextReminder} onChange={(e) => setDaysuntilNextReminder(e.target.value)} />
                                        </div>
                                        <div>
                                            <label>No Of reminders</label>
                                            <input type='text' value={noOfReminder} onChange={(e) => setNoOfReminder(e.target.value)} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="middle-line"></div>
                        <div className='chat-button'>

                        </div>
                    </div>
                    <div style={{ border: '1px solid grey' }}></div>

                    <div className='chats-btns'>
                        <button className='btn1' onClick={savechat} >Save</button>
                        <button className='btn2' onClick={handleCancel} >Cancel</button>
                    </div>
                </div>

            </div>

            <ToastContainer />
        </>
    )
}

export default ChatsTempUpdate