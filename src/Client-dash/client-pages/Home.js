import React, { useState } from 'react';
import './home.css'
import {Link}  from 'react-router-dom';
import { PiNotepadThin } from "react-icons/pi";
import { SlCreditCard } from "react-icons/sl";
import { HiMiniDocumentArrowUp } from "react-icons/hi2";
import { BiLogoTelegram } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Clienttexteditor from '../client-pages/Clienttexteditor.js';


const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [pay, setPay] = useState(false);


  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  const handlePay = () => {
    setPay(true);
  }

  const handlechatformClick = () => {
    setIsFormOpen(!isFormOpen);
  };
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  return (
    <>
      <div className='client-dashboard'>

        <div className='middle-container'>
          <div className='middle-container-tittle'>
            <h4>Waiting for action</h4>
          </div>
          <div className='client-dashbord-organizers'>
            <div className='dashbord-organizers' >
              <div className='organizer-dashboard'>
                <Link className='link-organizer' to="/clientdash/organiser"> <p>organizers</p></Link>
              </div>
              
              <div className='see-all'>
                <p>See all</p>
              </div>
            </div>

            <div className='all-organizers'>
              <div className='organizer-client' >
                <div className='organizer-client-complete'>
                  <label>complete organizer</label>
                </div>
                <div className='organizer-icon' onMouseEnter={handleHover}
                  onMouseLeave={handleMouseLeave}><PiNotepadThin />
                  <p>2023 Individual Tax Organizer</p>
                  {isHovered && !isComplete && (
                    <div className='complete' onClick={handleComplete}>
                      <p>Complete</p>
                    </div>
                  )}
                </div>
              </div>

              <div className='organizer-client'>
                <div className='organizer-client-complete'>
                  <label>complete organizer</label>
                </div>
                <div className='organizer-icon' onMouseEnter={handleHover}
                  onMouseLeave={handleMouseLeave}><PiNotepadThin />
                  <p>2023 Individual Tax Organizer</p>
                  {isHovered && !isComplete && (
                    <div className='complete' onClick={handleComplete}>
                      <p>Complete</p>
                    </div>
                  )}
                </div>
              </div>

              <div className='organizer-client'>
                <div className='organizer-client-complete'>
                  <label>complete organizer</label>
                </div>
                <div className='organizer-icon' onMouseEnter={handleHover}
                  onMouseLeave={handleMouseLeave}><PiNotepadThin />
                  <p>2023 Individual Tax Organizer</p>
                  {isHovered && !isComplete && (
                    <div className='complete' onClick={handleComplete}>
                      <p>Complete</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='dashboard-billing'>
              <div className='dashboard-billing'>
                
                
                <Link className='link-bill' to="/clientdash/billing"> <p>Billing</p></Link>

            
              </div>

              <div className='dashboard-pay-invoice'>
                <div className='client_Pay_invoice'>
                  <label>Pay invoice $1.00</label>

                </div>

                <div className='dashbord-invoice-icon' onMouseEnter={handleHover}
                  onMouseLeave={handleMouseLeave}><SlCreditCard />
                  <p>#2413</p>
                  {isHovered && !pay && (
                    <div className='pay' onClick={handlePay}>
                      <p style={{ color: '#1976d3' }}>pay</p>
                    </div>
                  )}
                </div>


              </div>

            </div>
          </div>
        </div>


        <div className='right'>

          <div className='quik-links'>
            <h2> Quick links</h2>
            <hr />

            <div style={{ display: 'flex', justifyContent: 'space-between' }} className='dashboard-folder-temp'>
              <div className='dashboard-upload-documents' style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#1976d3', cursor: 'pointer', fontWeight: 300, fontSize: "15px", }}>

                <HiMiniDocumentArrowUp />
                <p style={{ color: '#1976d3', cursor: 'pointer' }}>upload Documents</p>
              </div>


              <div>
                <div className='dashboard-upload-folder' style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#1976d3', cursor: 'pointer', fontWeight: 300, fontSize: "15px", }}>
                  <HiMiniDocumentArrowUp />
                  <p style={{ color: '#1976d3', cursor: 'pointer' }}>upload Folder</p>
                </div>

                <div className='dashboard-new-chat' style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#1976d3', cursor: 'pointer', fontWeight: 300, fontSize: "15px" }}>
                  <BiLogoTelegram />
                  <p onClick={handlechatformClick} style={{ color: '#1976d3', cursor: 'pointer' }}>New Chat</p>
                </div>
              </div>

            </div>



          </div>

          <div className='balance'>

            <h2>Balance</h2>

            <hr />

            <div className='Credits_Balance'>
              <div className='Credits_available'>
                <div><h2>Credits Available</h2></div>
                <div><p>$0.00</p></div>
              </div>

              <div className='Outstanding_Balance'>
                <div><h2>Outstanding Balance</h2></div>
                <div><p>$1.00</p></div>
              </div>
            </div>


          </div>

          <div className='dashboard-contact-info'>
            <div className='dashboard-contact-info-tittle'>
              <h2>Contact info</h2>
              <hr />
              <div className='client-dash-phn'>
                <p>phone</p>
                <div className='client-dash-phn-num'>
                  <p style={{ color: '#1976d3', cursor: 'pointer', }}>(925) 800-3561</p>
                </div>
              </div>
              <div className='client-dash-address'>
                <p>Adress</p>
                <span>3015 Hopyard Rd, Ste M, Pleasanton, CA 94588 </span>
              </div>

              <div className='client-dash-email'>
                <p>Email</p>
                <span style={{ color: '#1976d3', cursor: 'pointer' }}>silpa@snptaxandfinancials.com</span>
              </div>

              <div className='client-dash-website'>
                <p>website</p>
                <a href="http://www.snptaxandfinancials.com" style={{color: '#1976d3',cursor: 'pointer'}}>http://www.snptaxandfinancials.com</a>
              </div>

              <div className='client-dash-socialLinks'>
                <p>Social Links</p>
                <div className='client-dash-icons'>
                <a href="https://www.facebook.com/snptaxandfinancials" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', fontSize: '20px' }} className='fb'><FaFacebook /></a>
                <a href="https://www.instagram.com/snptax" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(218, 43, 121)', fontSize: '20px' }} className='insta'><BsInstagram /></a>    
                </div>
              </div>
            </div>
          </div>

      
          <div className={`chat-form-container ${isFormOpen ? "form-open" : ""}`}>
       
           <div style={{display:'flex', justifyContent:'space-between',marginTop:'20px'}} className='chat-form'>
              <p style={{marginLeft:'20px'}}>New Chat</p>
              <RxCross2  style={{marginRight:'20px'}} onClick={handleFormClose} />
            </div>
            <hr/>
            <div className='chat-form-subject-texteditor'>
              <div className='chat-form-subject'>
               <label>Subject</label>
               <input text type='text'/>
              </div>

              <div style={{marginTop:'20px',marginLeft:'20px',marginRight:'20px'}} className='chat-form-texteditor'>
                <Clienttexteditor/>
              </div>
        
            </div>
            <div style={{display:'flex', gap:'20px',marginLeft:'10px',marginTop:'60px'}} className='chat-form-btns'>
              <button className='btn1'>Create Chat</button>
              <button className='btn2'>Cancel</button>
            </div>

        </div>





      </div>

    </div >

    </>
  )
}

export default Home;
