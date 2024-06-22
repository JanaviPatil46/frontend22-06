import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const TeamsPlans = () => {
  return (
    <>
    <div>
      <h1 style={{margin:'20px 0',  fontSize:'35px'}}>Team & plans</h1>
    </div>
    <div className="email">
      <div className="email-nav" style={{ display: 'flex', gap: '50px', }}>
        <NavLink to='/teams/plansoverview'>Plan Overview</NavLink>
        <NavLink to='/teams/teammembers/active' >Team Members</NavLink>
        <NavLink to='/teams/invoices' >Invoices</NavLink>
      </div>
      <div> <hr/></div>
      <div style={{paddingTop:'20px'}}><Outlet /></div>
    </div>
    </>

  )
}

export default TeamsPlans