import React from 'react'
import { useNavigate } from "react-router-dom";

function DashboardContent({forms}) {
    const navigate = useNavigate();
    return (
        <div className='forms'>
            <div className='forms-container'>
                <div className='forms-title'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24"><path fill={233746} d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm10 2h-6v-2h6zm0-4h-6v-2h6zm0-4h-6V7h6z"></path></svg>
                    <p>Forms</p>
                </div>
                <div className='add-new-form'>
                    <a href='/admin/forms/new' className='create-form-button' >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 72 72"><path fill="#ffffff" d="M31 31V13h10v18h18v10H41v18H31V41H13V31z"></path><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={2} d="M31 31V13h10v18h18v10H41v18H31V41H13V31z"></path></svg>
                        <p>New Form</p>
                    </a>
                </div>
            </div>

            <div style={{ marginTop: 30 }} className='admin-forms'>
                <div>
                    {forms.map((f) => (
                        <div key={f.id} className=" d-flex align-items-center justify-content-between border rounded-lg shadow p-4 hover:shadow-lg transition">
                            <div style={{ flex: 1 }}>
                                <strong>{f.name}</strong><br />
                            </div>
                            <div>
                                <button onClick={() => navigate(`/admin/forms/${f.id}`)} style={{ marginLeft: 8 }} className='admin-view-form-btn' >View Form</button>
                            </div>
                        </div>
                    ))}         
                </div>
            </div>
        </div>
    )
}

export default DashboardContent;