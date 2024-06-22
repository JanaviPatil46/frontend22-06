import React from 'react'
import '../client-pages/organizer.css'
import { FaRegCircleQuestion } from "react-icons/fa6";
import { PiNotepadBold } from "react-icons/pi";
import { NavLink, Outlet } from 'react-router-dom';
const Organiser = () => {
  return (
    <>
      <div className='client-dash-organizer-container'>
        <div className='client-dash-organizer-tittle'>
          <h2>organizers</h2>
          <FaRegCircleQuestion style={{ color: '#0496ff' }} />
        </div>
        <div style={{ marginTop: '10px' }} className='client-dash-organizerList'>
          <div className='tist-tittle'>
            Waiting for action
            <div className='client-dash-bage'>4</div>
          </div>
          <div style={{ gap: '5px', }} className='client-dash-completed-organizers'>
            <div className='completed-organizer'>
              <div className='completed-organizer-icon'>
                <PiNotepadBold />
              </div>
              <div className='completed-organizer-content'>
                <span>  Complete organizer </span>
                <div className='completed-organizer-subcontent'>
                  <div>2023 Individual Tax Organizer</div>
                </div>
              </div>
            </div>

            <div className='completed-organizer'>
              <div className='completed-organizer-icon'>
                <PiNotepadBold />
              </div>
              <div className='completed-organizer-content'>
                <span>  Complete organizer </span>
                <div className='completed-organizer-subcontent'>
                  <div>2023 Individual Tax Organizer</div>
                </div>
              </div>
            </div>

            <div className='completed-organizer'>
              <div className='completed-organizer-icon'>
                <PiNotepadBold />
              </div>
              <div className='completed-organizer-content'>
                <span>  Complete organizer </span>
                <div className='completed-organizer-subcontent'>
                  <div>2023-Business Tax Organizer - Income & Expense</div>
                </div>
              </div>
            </div>

            <div className='completed-organizer'>
              <div className='completed-organizer-icon'>
                <PiNotepadBold />
              </div>
              <div className='completed-organizer-content'>
                <span>  Complete organizer </span>
                <div className='completed-organizer-subcontent'>
                  <div>2023-Business Tax Organizer - Income & Expense</div>
                </div>
              </div>
            </div>
          </div>


          <div style={{ display: "flex", justifyContent: 'space-between' }} className='active-archive-btns'>
            <div className='organizer-nav'>
              <nav className='nav' >
              <ul className='ul'>
              
                  <li className='li'>
                    <NavLink to="/clientdash/organiser/active" className='link' activeClassName="active ">Active</NavLink>
                  </li>
                  <li className='li' >
                    <NavLink to="/clientdash/organiser/archive" className='link' activeClassName="active">Archive</NavLink>
                  </li>
                 
                </ul>
              </nav>
              <Outlet />
            </div>

            <div className="new-organizer" >
              <button className="btn1">
                New Organiser
              </button>
            </div>

          </div>

         




        </div>


      </div>
    </>
  )
}

export default Organiser
