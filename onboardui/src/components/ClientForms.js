import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';

function ClientForms({forms}) { 
    const navigate = useNavigate();
  return (
    <div>
       <NavBar/>
        <div className="container client-forms">
            <h1 className="text-3xl font-bold mb-6">Available Forms</h1>

            {forms.length === 0 ? (
                <p className="text-gray-500">No forms available right now.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {forms.map((form) => (
                        <div key={form.id} className=" d-flex align-items-center justify-content-between border rounded-lg shadow p-4 hover:shadow-lg transition">
                            <div>
                                <h2 className="text-xl font-semibold">{form.name}</h2>
                                <p className="text-gray-600 mb-4">{form.description}</p>
                            </div>
                            <div>
                                <button onClick={() => navigate(`/forms/${form.id}`)} style={{ marginLeft: 8 }} className='client-load-form-btn'>Load Form</button>
                            </div>
                        </div>
                        
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default ClientForms