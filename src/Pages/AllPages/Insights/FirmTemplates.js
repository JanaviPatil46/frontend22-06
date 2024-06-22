import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './firmtemp.css'
const FirmTemplates = () => {
    return (
        <>
            <h2>Firm Templates</h2>

            <div className="firmtemp">
                <div className="firmtemp-nav" >
                <NavLink to='/firmtemplates/tasks' activeClassName="active">Tasks</NavLink>
                    <NavLink to='/firmtemplates/tags' activeClassName="active">Tag</NavLink>
                    <NavLink to='/firmtemplates/emails' activeClassName="active" >Emails</NavLink>
                    <NavLink to='/firmtemplates/jobs' activeClassName="active" >Jobs</NavLink>
                    <NavLink to='/firmtemplates/pipelines' activeClassName="active">Pipelines</NavLink>
                    {/* <NavLink to='/firmtemplates/organizers' activeClassName="active" >Organizers</NavLink> */}
                    <NavLink to='/firmtemplates/folders' activeClassName="active" >Folders</NavLink>
                    <NavLink to='/firmtemplates/chats' activeClassName="active">Chats</NavLink>
                    <NavLink to='/firmtemplates/sms' activeClassName="active" >SMS</NavLink>
                    
                    <NavLink to='/firmtemplates/invoices' activeClassName="active" >Invoices</NavLink>
                    <NavLink to='/firmtemplates/recurring-invoices' activeClassName="active" >Recurring invoices</NavLink>
                    <NavLink to='/firmtemplates/signatures' activeClassName="active" >Signatures</NavLink>
                    <NavLink to='/firmtemplates/proposals' activeClassName="active" >Proposals & Els</NavLink>
                    <NavLink to='/firmtemplates/organizers' activeClassName="active" >Organizers</NavLink>
                </div>
                <div> <hr /></div>
                <div style={{ paddingTop: '20px' }}><Outlet /></div>
            </div>
        </>
    )
}

export default FirmTemplates