import React from 'react'
import { FaRegCircleQuestion } from "react-icons/fa6"
import { PiNotepadBold } from "react-icons/pi";
import { NavLink, Outlet } from 'react-router-dom';

import './billing.css'

const Billing = () => {
  return (
    <div className='billing-container' >
      <div className='billing-heding'>
        <h2> Billing</h2>
        <FaRegCircleQuestion style={{ color: '#0496ff' }} />
      </div>

      <div style={{ marginTop: '30px' }} className='billing-actions'>
        <div className='action-tittle'>
          <p> Waiting for action</p>
          <div className='billing-bage'>1</div>
        </div>

        <div style={{ gap: '5px' }} className='billing-list'>
          <div className='billing-1'>
            <div className='billing-icon'>
              <PiNotepadBold />
            </div>
            <div className='billing-content'>
              <span>  Pay invoice
                $1.00 </span>
              <div className='billing-subcontent'>
                <div>#2413</div>
              </div>
            </div>
          </div>



        </div>
        <div className='billing-nav'>
          <nav className='nav' >
              <ul className='ul'>
              
                  <li className='li'>
                    <NavLink to="/clientdash/billing/invoices" className='link' activeClassName="active ">Invoices</NavLink>
                  </li>
                  <li className='li' >
                    <NavLink to="/clientdash/billing/recurring_invoices" className='link' activeClassName="active"> Recurring invoices</NavLink>
                  </li>
                  <li className='li' >
                    <NavLink to="/clientdash/billing/payment" className='link' activeClassName="active"> Payments</NavLink>
                  </li>
                 
                </ul>
              </nav>
             
          </div>

          <Outlet />

      </div>

    </div>
  )
}

export default Billing
