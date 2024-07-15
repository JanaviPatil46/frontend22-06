import React, { useState, useEffect } from 'react';
import './OrganizerTemp.css';
import Section from './organizertempSection'; // Import the Section component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import ReactPaginate from 'react-paginate';

const OrganizersTemp = () => {

  const API_KEY = process.env.REACT_APP_API_IP;
  const navigate = useNavigate();

  const [templateName, setTemplateName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  const addSection = () => {
    const newSection = { id: Date.now(), name: `Section ${sections.length + 1}`, text: '', formElements: [] };
    setSections([...sections, newSection]);
    setSelectedSection(newSection); // Select the newly added section
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleDeleteSection = (id) => {
    const newSections = sections.filter(section => section.id !== id);
    setSections(newSections);
    if (selectedSection && selectedSection.id === id) {
      setSelectedSection(null); // Clear selected section if it's deleted
    }
  };

  // const handleUpdateSection = (id, text, formElements) => {
  //   const updatedSections = sections.map(section =>
  //     section.id === id ? { ...section, text, formElements } : section
  //   );
  //   setSections(updatedSections);
  //   if (selectedSection && selectedSection.id === id) {
  //     setSelectedSection({ ...selectedSection, text, formElements });
  //   }
  // };

  const handleUpdateSection = (id, newText, newFormElements) => {
    setSections(prevSections => prevSections.map(section =>
      section.id === id ? { ...section, text: newText, formElements: newFormElements } : section
    ));
  };

  console.log(templateName)
  console.log(organizerName)
  console.log(sections)


  const saveOrganizerTemp = () => {

    console.log(sections)

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: templateName,
      organizerName: organizerName,
      sections: sections.map(section => ({
        name: section.text,
        text: section.text,
        id: section.id.toString(),
        formElements: section.formElements.map(element => ({
          type: element.type,
          id: element.id,
          sectionid: element.sectionid,
          options: element.options.map(option => ({
            id: option.id,
            text: option.text
          })),
          text: element.text
        }))
      })),
      active: true
    });

    console.log(raw)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const url = `${API_KEY}/workflow/organizertemplate`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
       
        if (result && result.message === "Organizer Template created successfully") {
          toast.success("Organizer Template created successfully");
          fetchOrganizerTemplates();
          setshowOrganizerTemplateForm(false);
          // console.log(result);
        
        } else {
          toast.error(result.error || "Failed to create Organizer Template");
        }
      })
      .catch((error) => console.error(error));
  }

  //*********************  template table and show form*********** */

  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
  };

  const [showOrganizerTemplateForm, setshowOrganizerTemplateForm] = useState(false);

  const handleCreateInvoiceClick = () => {
    setshowOrganizerTemplateForm(true);
  };

  const handleEdit = (_id) => {
    navigate('OrganizerTempUpdate/' + _id)

  };


  //delete template
  const handleDelete = (_id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };
    const url = `${API_KEY}/workflow/organizerTemplate/`;
    fetch(url + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        toast.success('Item deleted successfully');
        fetchOrganizerTemplates();
        setshowOrganizerTemplateForm(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete item');
      })
  };


  //get all templateName Record 
  const [organizerTemplates, setOrganizerTemplates] = useState([]);

  
  useEffect(() => {
    fetchOrganizerTemplates();
  }, []);

  const fetchOrganizerTemplates = async () => {
    try {

      const url = `${API_KEY}/workflow/organizertemplate`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch Organizer Template');
      }
      const data = await response.json();
      setOrganizerTemplates(data.OrganizerTemplates);
      console.log(data);
    } catch (error) {
      console.error('Error fetching Invoice Templates:', error);
    }
  };


  console.log(organizerTemplates);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(organizerTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, organizerTemplates.length);
  const currentTemplates = organizerTemplates.slice(startIndex, endIndex);

  console.log(currentTemplates)

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };


  const handleCancel = () => {
    setshowOrganizerTemplateForm(false);
    setTemplateName("");
  };
  function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' ..';
    }
    return text;
  }

  return (
    <div>

      <div >
        {!showOrganizerTemplateForm && (
          <div>
            <h1>Organizer Template</h1>
            <button onClick={handleCreateInvoiceClick} className='btn1'>Create Template</button>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentTemplates.map(template => (
                  <tr key={template._id}>
                    <td onClick={() => handleEdit(template._id)} style={{ cursor: "pointer", color: 'var( --text-color)' }}>{template.templatename}</td>
                    <td>
                      <div className="ci-menu-kebab" onClick={() => toggleMenu(template._id)} style={{ cursor: 'pointer', fontSize: '20px' }}>
                        &#8942;
                      </div>
                      {openMenuId === template._id && (
                        <div className="jobtemp-menu-options">
                          <div onClick={() => handleEdit(template._id)} style={{ color: 'blue', cursor: 'pointer' }}>Edit</div>
                          <div onClick={(txt) => handleDelete(template._id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</div>
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
                containerClassName={'pagination'}
                activeClassName={'active'}
                previousLabel={<MdKeyboardDoubleArrowLeft style={{ cursor: 'pointer' }} />}
                nextLabel={<MdKeyboardDoubleArrowRight style={{ cursor: 'pointer' }} />}
              />
            </div>
          </div>
        )}
      </div>

      {showOrganizerTemplateForm && (
        <>
          <div>
            <label>
              Template name:
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </label>
            <label>
              Organizer name:
              <input
                type="text"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
              />
            </label>
          </div>





          <div className="organizer-container" style={{ display: "flex",  marginTop: "40px",height: "auto", width: "100%" }}>
            <div className="left-org-container" style={{ padding:'10px', width: "30%", height: "315px" }}>
              <div className="smooth-dnd-container vertical">
                {sections.map((section) => (
                  <div key={section.id} style={{ display: "flex", alignItems: "center" }}>
                    <input
                      placeholder={`Section Name`}
                      className='section-name'
                      value={truncateText(section.text, 5)}
                      readOnly
                      onClick={() => handleSectionClick(section)}
                    />
                  </div>
                ))}

              </div>
              <div style={{ width: "50%", height: "25px", marginTop: "20px" }}>
                <button
                  type="button"
                  className="_root_19cba_1 _ghost_19cba_92 _default_19cba_124 _medium_19cba_47 _button-medium_17kh3_169"
                  data-test="shared-element__button"
                  onClick={addSection}
                >
                  New section
                </button>
              </div>
            </div>
            <div className="right-container" style={{ borderRadius:'20px', width: "70%", height: "auto" }}>
              {selectedSection && (
                <Section
                  section={selectedSection}
                  onDelete={handleDeleteSection}
                  onUpdate={handleUpdateSection}
                  
                />
              )}
            </div>
          </div>

          <div className="bottom-buttons-group col-6" style={{ display: "flex", gap: "10px", marginLeft: "10px", marginBottom: "20px" }}>
            <button type="submit" className=" btn1 col-2"
              onClick={saveOrganizerTemp}
            >
              Save
            </button>
            <button type="reset" onClick={handleCancel}
              //  onClick={handleCancel} 
              className="btn2 col-2">
              Cancel
            </button>
          </div>
        </>
      )}

<ToastContainer />

    </div>

  );
};

export default OrganizersTemp;
