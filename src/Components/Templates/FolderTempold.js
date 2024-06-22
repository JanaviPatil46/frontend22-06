

import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaRegFolderClosed } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";

// import { CiMenuKebab } from "react-icons/ci";
// import { Navigate, useNavigate } from "react-router-dom";
// import { SlOptionsVertical } from "react-icons/sl";
import { FaFolder } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { TbUserEdit } from "react-icons/tb";
import { HiDotsVertical } from "react-icons/hi";
import { IoEyeSharp } from "react-icons/io5";
import { LuEyeOff } from "react-icons/lu";
import './foldertemp.css'
import { Link } from "react-router-dom";
const FolderTemp = () => {

  const API_KEY = process.env.REACT_APP_API_IP;
  const [isOpenClientDocs, setIsOpenClientDocs] = useState(false);
  const [isOpenSharedDocs, setIsOpenSharedDocs] = useState(false);
  const [isOpenPrivate, setIsOpenPrivate] = useState(false);
  const [showClientOptions, setShowClientOptions] = useState(false);
  const [showSharedOptions, setShowSharedOptions] = useState(false);
  const [showPrivateOptions, setShowPrivateOptions] = useState(false);
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);

  //  to oprn form inside of create folder
  const handleCreateFolderClick = () => {
    setIsFolderFormOpen(!isFolderFormOpen);
  };

  const handleFormClose = () => {
    setIsFolderFormOpen(false);
  };
  // const navigate = useNavigate();
  // for toghle folder icons


  // const toggleSidebar = () => {
  //   setIsFormOpen(!isFormOpen);
  // };

  // const closeSidebar = () => {
  //   setIsFormOpen(false);
  // };

  const toggleClientDocs = () => {
    setIsOpenClientDocs(!isOpenClientDocs);
  };

  const toggleSharedDocs = () => {
    setIsOpenSharedDocs(!isOpenSharedDocs);
  };

  const togglePrivate = () => {
    setIsOpenPrivate(!isOpenPrivate);
  };

  const [showForm, setShowForm] = useState(false);
  const [tempName, setTempName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const handleCreateTemplate = () => {
    setShowForm(true);
  };

  const handleSaveTemplate = async () => {
    // Check if the template name is empty
    if (tempName.trim() === "") {
      // Display a toast error message if the template name is empty
      toast.error("Template name cannot be empty");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: tempName,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const url = `${API_KEY}/common/folder/`;
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // Display success toast
        toast.success("Template saved successfully");
        // Reset the form
        setShowForm(false);
        setTempName("");
      })
      .catch((error) => {
        console.error(error);
        // Display error toast
        toast.error("Failed to save template");
      });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const handleCancel = () => {
    setShowForm(false);
    setTempName("");
  };

  //get all templateName Record
  const [folderTemplates, setFolderTemplates] = useState([]);

  useEffect(() => {
    async function fetchFolderTemplates() {
      try {
        const url = `${API_KEY}/common/folder/`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch folder templates");
        }
        const data = await response.json();
        setFolderTemplates(data.folderTemplates);
      } catch (error) {
        console.error("Error fetching folder templates:", error);
      }
    }

    fetchFolderTemplates();
  }, []);

  //documents Upload

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
    folderInputRef.current.click();
  };

  //folder Upload
  const handleFolderChange = (event) => {
    setSelectedFolder(event.target.files[0]);
  };

  const handleUploadFolder = async () => {
    if (!selectedFolder) {
      alert("Please select a folder to upload");
      return;
    }
  };

  //create folder

  const [folderName, setFolderName] = useState("");

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenufolder = (menuId) => {
    setOpenMenuId(openMenuId === menuId ? null : menuId);
  };

  const handleCreateFolder = () => {

  };

  const handleEditFolder = () => {
    // Handle edit folder action
  };

  const handleDeleteFolder = () => {
    // Handle delete folder action
  };

  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
  };

  const handleEdit = (_id) => {
    // Implement logic for editing here
    // console.log("Edit action triggered for template id: ", templateId);
    // navigate('FoldertempUpdate/'+_id)
  };

  //delete template
  const handleDelete = (_id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    const url = `${API_KEY}/common/folder/`;
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
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete item");
      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  ///Folderstructure
  const [tempvalues, setTempValues] = useState();
  const [foldersvalue, setfoldervalue] = useState();
  const [tempNameNew, setTempNameNew] = useState();
  const [templateData, setTemplateData] = useState(null);

  useEffect(() => {
    getfolders();
  }, []);

  const getfolders = async () => {
    try {
      const url = `${API_KEY}/common/folder-structure/`;
      const response = await fetch(
        url
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      // console.log('Fetched data:', data);
      setTemplateData(data);

      setfoldervalue(data.folderStructure);
      tempallvalue();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(foldersvalue);

  const [selectedFolderget, setSelectedFolderget] = useState(null);

  const handleFolderClick = (folderName) => {
    if (selectedFolderget === folderName) {
      setSelectedFolderget(null); // Hide children if folder is already selected
    } else {
      setSelectedFolderget(folderName); // Show folder name data
    }
  };

  const tempallvalue = () => {
    setTempNameNew(tempvalues);
  };

  return (
    <>
     

      <div className="container">
        <h1>Folder Template</h1>
        <div
          className="subtitle"
          style={{
            border: "1px solid #f1f3f5",
            padding: "10px",
            borderRadius: "15px",
          }}
        >
          <h3>Create folder template </h3>
          <hr></hr>

          {!showForm && (
            <div >
              <div className="create-folder">
                <button className="btn1" onClick={handleCreateTemplate}>Create Template</button>
              </div>
              <div className="folder-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Used in pipeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {folderTemplates.map((template) => (
                      <tr key={template._id}>

                        <td
                          onClick={() => handleEdit(template._id)}
                          style={{ cursor: "pointer", color: "blue" }}
                        >

                          {template.templatename}

                        </td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {showForm && (
            <div className="form-container">
              <div className='folder-temp-container'>
                <div className='folder-label' >
                  <label >Template Name</label>
                  <input type='text' placeholder='Template Name' value={tempName}
                    onChange={(e) => setTempName(e.target.value)} />
                </div>
                <div className='folder-table'>

                </div>
              </div>
              <div>
                <div className="folder-links">
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <HiDocumentArrowUp style={{
                      color: "#e87800",
                      fontSize: "19px",
                    }} />
                    <Link style={{ textDecoration: 'none', color: 'black' }} onClick={handleButtonClick}>Upload Documents</Link>
                  </div>
                  <input
                    type="folder"
                    directory=""
                    webkitdirectory=""
                    ref={folderInputRef}
                    style={{ display: "none" }}
                    onChange={handleFolderChange}
                  />



                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <MdOutlineDriveFolderUpload style={{
                      color: "#e87800",
                      fontSize: "19px",
                    }} />
                    <Link style={{ textDecoration: 'none', color: 'black' }} onClick={handleButtonClick}> Upload Folder</Link>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <FaRegFolderClosed style={{
                      color: "#e87800",
                      fontSize: "15px",
                    }} />
                    <Link style={{ textDecoration: 'none', color: 'black' }} onClick={handleCreateFolderClick}>Create Folder</Link>
                  </div>

                </div>
                <div className={`folder-form-container ${isFolderFormOpen ? "folder-form-open" : ""}`}>
                  <div className="folder-header">
                    <h3>Create Folder</h3>
                    <FaTimes style={{ color: '#1976d3', cursor: 'pointer' }} onClick={handleFormClose} />
                  </div>
                  <div className="folder-container">
                    <div className='folder-label' >
                      <label >Folder Name</label>
                      <input type='text'
                        value={folderName}
                        onChange={handleInputChange} />
                    </div>
                    <div className="form-privacy">
                      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <span>Privacy</span>
                        <BsQuestionCircle className="privacy-icon" />
                      </div>


                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: '10px',
                          gap: '8px',
                          fontSize: "14px",
                          color: "#2b2b2b",

                        }}
                      >
                        <label>
                          <input
                            type="radio"
                            value="Private"
                            checked={selectedOption === "Private"}
                            onChange={() => handleOptionChange("Private")}
                          style={{marginRight:'10px'}}
                          />
                          Private
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="Client Can View"
                            checked={selectedOption === "Client Can View"}
                            onChange={() =>
                              handleOptionChange("Client Can View")
                              
                            }
                            style={{marginRight:'10px'}}
                          />
                          Client Can View
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="Client Can View and edit"
                            checked={
                              selectedOption === "Client Can View and edit"
                            }
                            onChange={() =>
                              handleOptionChange("Client Can View and edit")
                            }
                            style={{marginRight:'10px'}}
                          />
                          Client Can View and edit
                        </label>
                        <p style={{ fontWeight: "bold" }}>
                          {`selectedOption
                            ? Selected : ${selectedOption}
                            : "No option selected"`}
                        </p>
                      </div>
                    </div>
                    <div className="create-folder-buttons">
                      <div >
                        <button className="btn1" onClick={handleCreateFolder}>save</button>
                      </div>
                      <div >
                        <button className="btn2" onClick={handleFormClose}>Cancel</button>
                      </div>
                    </div>

                  </div>


                  {/*  */}
                </div>


              </div>


              <hr></hr>

              <div className="documents">
                <div
                  className="client_upload_documents"
                  onClick={toggleClientDocs}
                >
                  <p>
                    {isOpenClientDocs ? (
                      <FaFolderOpen
                        style={{
                          color: "#e87800",
                          fontSize: "15px",
                          marginRight: "10px",
                        }}
                      />
                    ) : (
                      <FaFolder
                        style={{
                          color: "#e87800",
                          fontSize: "15px",
                          marginRight: "10px",
                        }}
                      />
                    )}
                    Client uploaded documents{" "}
                    <div
                      style={{
                        float: "right",
                        alignItems: "center",
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <TbUserEdit
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      />
                      <HiDotsVertical
                        onClick={() => setShowClientOptions(!showClientOptions)}
                        style={{
                          fontSize: "20px",
                          color: "#0077cc",
                          cursor: "pointer",
                        }}
                      />
                      {showClientOptions && (
                        <div className="dropdown-options">
                          <span onClick={handleCreateFolderClick}>create folder</span>
                          <span>Edit</span>
                          <span>Delet</span>
                        </div>
                      )}
                    </div>
                  </p>
                </div>
                <hr />

                <div className="shared_docs" onClick={toggleSharedDocs}>
                  <p>
                    {isOpenSharedDocs ? (
                      <FaFolderOpen
                        style={{
                          color: "#e87800",
                          fontSize: "15px",
                          marginRight: "10px",
                        }}
                      />
                    ) : (
                      <FaFolder
                        style={{
                          color: "#e87800",
                          fontSize: "15px",
                          marginRight: "10px",
                        }}
                      />
                    )}
                    Firm docs shared with client
                    <div
                      style={{
                        float: "right",
                        alignItems: "center",
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <IoEyeSharp
                        style={{ color: "rgb(36, 200, 117)", fontSize: "20px" }}
                      />
                      <HiDotsVertical
                        onClick={() => setShowSharedOptions(!showSharedOptions)}
                        style={{
                          fontSize: "20px",
                          color: "#0077cc",
                          cursor: "pointer",
                        }}
                      />
                      {showSharedOptions && (
                        <div className="dropdown-options">
                          <span onClick={handleCreateFolderClick}>create folder</span>
                          <span>Edit</span>
                          <span>Delet</span>
                        </div>
                      )}
                    </div>
                  </p>
                </div>
                <hr />

                <div className="private" onClick={togglePrivate}>
                  <p>
                    {isOpenPrivate ? (
                      <FaFolderOpen
                        style={{
                          color: "#e87800",
                          fontSize: "15px",
                          marginRight: "10px",
                        }}
                      />
                    ) : (
                      <FaFolder
                        style={{
                          color: "#e87800",
                          fontSize: "15px",
                          marginRight: "10px",
                        }}
                      />
                    )}
                    Private{" "}
                    <div
                      style={{
                        float: "right",
                        alignItems: "center",
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <LuEyeOff
                        style={{ color: "rgb(102, 118, 142)", fontSize: "20px" }}
                      />
                      <HiDotsVertical
                        onClick={() => setShowPrivateOptions(!showPrivateOptions)}
                        style={{
                          fontSize: "20px",
                          color: "#0077cc",
                          cursor: "pointer",
                        }}
                      />
                      {showPrivateOptions && (
                        <div className="dropdown-options">
                          <span onClick={handleCreateFolderClick}>create folder</span>
                          <span>Edit</span>
                          <span>Delet</span>
                        </div>
                      )}
                    </div>
                  </p>
                </div>
                <hr />
              </div>

              <div className="temp_buttons">
                <button className="btn1" onClick={handleSaveTemplate}>
                  Save & Exit
                </button>
                <button className="btn2" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default FolderTemp