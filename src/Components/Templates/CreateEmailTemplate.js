import React, { useState, useEffect } from 'react';
// import '../../pages/Emailtemp/listdata.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHolder } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
// import { Link } from 'react-router-dom'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import EmailsTemp from './EmailsTemp'
import { LuSettings } from "react-icons/lu";
const CreateEmailTemplate = () => {

  const API_KEY = process.env.REACT_APP_API_IP;

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // Change starting page to 0
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
  };

  const handleEdit = (_id) => {
    navigate('/upemailtemplate/' + _id);
  };
const handleClose=()=>{
  setShowForm(false);
  
}
  const handleDelete = (_id) => {
    console.log(_id);

    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };
    // Fetch URL with environment variable
    const url = `${API_KEY}/workflow/emailtemplate/`;
    fetch(url + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        toast.success('Data deleted successfully');
        fetchEmailTemplates();
      })
      .catch((error) => {
        console.error(error);
      })
      // .finally(() => {
      //   setTimeout(() => {
          
      //   }, 1000);
      // });
  };



  const fetchEmailTemplates = async () => {
    try {
      const url = `${API_KEY}/workflow/emailtemplate/`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch email templates');
      }
      const data = await response.json();

      setEmailTemplates(data.emailTemplate);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching email templates:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailTemplates();
  }, []);





  const totalPages = Math.ceil(emailTemplates.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentTemplates = emailTemplates.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleCreateTemplateClick = () => {
    setShowForm(true); // Show form when "Create template" is clicked
  };

  return (
    <>
      {showForm ? (
        <div className='create-temp'>
          <EmailsTemp handleClose={handleClose} fetchEmailTemplates={fetchEmailTemplates}/>
        </div>
      ) : (
        <div>

          <div class='create-email-temp-container'>
            <div class='create-email-temp-btns' style={{ display: 'flex', gap: '20px' }}>
              <div class='createtemp'>

                <button class='btn1' onClick={handleCreateTemplateClick}>Create template</button>

              </div>
              {/* <div class='copy-from-library'>
                <button class='btn1'>Copy From Library</button>
              </div> */}
            </div>

            <div class='create-email-temp-content'>
              {isLoading ? (
                <div class="-loading" style={{ textAlign: 'center' }}>
                  <div class="-loading-inner">Loading...</div>
                </div>
              ) : (
                <div>
                  <table style={{ marginTop: '20px',width:'100%' }} >
                    <thead>
                      <tr >
                        <th >Name</th>
                        <th >Subject</th>
                        <th>Used in pipelines</th>
                        <th><LuSettings /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTemplates.map((template) => (
                        <tr key={template._id}>
                          <td style={{  padding: '8px', }}>
                            <span className="btn btn_link" onClick={(event) => { handleEdit(template._id, event) }} style={{ textDecoration: 'none', color: 'var( --text-color)' }}>{template.templatename}</span>
                          </td>
                          <td style={{   padding: '8px', }}>
                            {template.emailsubject}
                          </td>
                          <td style={{   padding: '8px',  }}>
                            {template.usedInPipelines}
                          </td>
                          <td>
                            <div onClick={() => toggleMenu(template._id)} style={{ cursor: 'pointer', fontSize: '20px' }}>
                              &#8942;
                            </div>
                            {openMenuId === template._id && (
                              <div style={{ top: 'auto', position: 'absolute', boxShadow: '2px 1px hsl(0, 5%, 92%)', padding: '8px ', fontSize: '12px', background: "#fff" }} className="create-email-temp-menu-options">
                                <div onClick={() => handleEdit(template._id)} style={{ color: 'blue', cursor: 'pointer' }}>Edit</div>
                                <div onClick={() => handleDelete(template._id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</div>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              )}
            </div>

          </div>
          <div>
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
              previousLabel={<MdKeyboardDoubleArrowLeft style={{ cursor: 'pointer' }} />}
              nextLabel={<MdKeyboardDoubleArrowRight style={{ cursor: 'pointer' }} />}
            />
          </div>
        </div>
      )}
      <ToastContainer/>
    </>
  );
};

export default CreateEmailTemplate;









