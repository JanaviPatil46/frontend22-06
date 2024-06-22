import React, { useState, useEffect } from 'react'
import { FaPrint } from "react-icons/fa6";
import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from "react-icons/rx";
import './createinvoice.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const CreateInvoice = () => {

  const API_KEY = process.env.REACT_APP_API_IP;
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/billinginvoices/onetime');
  }, [navigate]);

  const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState(false);
  const handleAddNewInvoice = () => {
    setIsInvoiceFormOpen(!isInvoiceFormOpen);
  };
  const handleFormClose = () => {
    setIsInvoiceFormOpen(false);
  };

//****************************** */
const [invoices, setInvoices] = useState([]);
const [showInvoiceForm, setShowInvoiceForm] = useState(false);

const itemsPerPage = 10;
const [currentPage, setCurrentPage] = useState(1);
const totalPages = Math.ceil(invoices.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, invoices.length);
const currentTemplates = invoices.slice(startIndex, endIndex);

console.log(currentTemplates)

const handlePageChange = ({ selected }) => {
  setCurrentPage(selected);
};

  useEffect(() => {

    async function fetchInvoices() {
      try {

        const url = `${API_KEY}/workflow/invoice`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch Invoice');
        }
        const data = await response.json();
        setInvoices(data.invoice);
        console.log(data);
      } catch (error) {
        console.error('Error fetching Invoices:', error);
      }
    }
    fetchInvoices();
    
  }, []);

  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
  };

  const handleEdit = (_id) => {
    navigate('/invoiceupdate/' + _id)
  };

  //delete template
  const handleDelete = (_id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };
    const url = `${API_KEY}/workflow/invoice/`;
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
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete item');
      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };













  

  return (
    <>
    
      <div>
        <h1>Invoices</h1>
      </div>
      <div className='create-invoice-header'>
        <div className='invoce-actions-btns'>
          <button className='btn1' onClick={handleAddNewInvoice}>Create Invoice</button>
          <button className='btn1' >Export Invoices</button>
        </div>
             <div className='create-invoice-header-left'>
          {/* <input type='text' placeholder='search' /> */}
          <div class="search-container">
            <input type="text" placeholder="search" class="search-input" />
            <IoSearch className="search-icon" />
          </div>
          <button className='btn2'>Filter</button>
          <FaPrint />
        </div>
        
      </div>
      <div>
            <table style={{width:'100%'}} >
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentTemplates.map(template => (
                  <tr key={template._id}>
                    <td onClick={() => handleEdit(template._id)} style={{ cursor: "pointer", color: 'var( --text-color)', }}>{template.invoicenumber}</td>
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


      <div className={`invoice-form-container ${isInvoiceFormOpen ? "invoice-form-open" : ""}`}>
        <div className="invoice_header_title">
          <h3>Create invoice</h3>
          <RxCross2 onClick={handleFormClose} style={{ cursor: 'pointer', fontSize: '25px' }} />


        </div>
       
   
        <div className='invoice-container'>
          <div className='invoice-type'>
            <NavLink to='/billinginvoices/onetime'>One-time</NavLink>
            <NavLink to='/billinginvoices/recurring'>Recurring</NavLink>
          </div>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default CreateInvoice