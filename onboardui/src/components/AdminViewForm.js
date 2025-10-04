import React from 'react'
import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";


function AdminViewForm() {
    const API_ROOT = "http://127.0.0.1:8000/api";
        const { id } = useParams();
        const [clientForm, setClientForm] = useState(null);
        const [clientData, setClientData] = useState({});
        const [clientFiles, setClientFiles] = useState({});
        const [submitStatus, setSubmitStatus] = useState(null);
    
        useEffect(() => {
            clientLoadForm(id);
        }, [id]);
    
        async function clientLoadForm(id) {
            try {
                const res = await fetch(`${API_ROOT}/forms/${id}/`);
                if (!res.ok) throw new Error("Form not found");
                const f = await res.json();
                setClientForm(f);
                // initialize clientData keys
                const initial = {};
                (f.config.fields || []).forEach((fld) => {
                if (fld.type === "checkbox") initial[fld.name] = false;
                else initial[fld.name] = "";
                });
                setClientData(initial);
                setClientFiles({});
                setSubmitStatus(null);
            } catch (e) {
                console.error(e);
                alert("Failed to load form: " + e.message);
            }
        }
    return (
        <div className='config-form'>
            {clientForm && (
            <form style={{ border: "1px solid #ddd", padding: 12 }}>
                <div className='form-text'>
                    <h3>{clientForm.name}</h3>
                    <p>{clientForm.description}</p>
                </div>
                

                {(clientForm.config.fields || []).map((fld) => {
                const key = fld.name;
                const label = fld.label || fld.name;
                const val = clientData[key];
                const fileInput = (
                    <input type="file" multiple={fld.multiple}  />
                );

                switch (fld.type) {
                    case "text":
                        return (
                            <div class="form-floating mb-3" key={key}>
                                <input type='text' class="form-control" id="floatingInput" value={val} />
                                <label for="floatingInput">{label}</label>
                            </div>                       
                        );
                    case "password":
                        return (
                            <div class="form-floating mb-3" key={key}>
                                <input type='password' class="form-control" id="floatingInput" value={val} />
                                <label for="floatingInput">{label}</label>
                            </div>                       
                        );
                    case "email":
                        return (
                            <div class="form-floating mb-3" key={key}>
                                <input type='email' class="form-control" id="floatingInput" value={val} />
                                <label for="floatingInput">{label}</label>
                            </div>                       
                        );

                    case "number":
                        return (
                            <div class="form-floating mb-3" key={key} >
                                <input  type="number" value={val} class="form-control" id="floatingInput"/>
                                <label for="floatingInput">{label}</label>
                            </div>
                        );
                    case "tel":
                        return (
                            <div class="form-floating mb-3" key={key} >
                                <input  type="tel" value={val} class="form-control" id="floatingInput"/>
                                <label for="floatingInput">{label}</label>
                            </div>
                        );
                    case "date":
                        return (
                            <div class="form-floating mb-3" key={key} >
                                <input type="date" value={val} class="form-control" id="floatingInput"/>
                                <label for="floatingInput">{label}</label>
                            </div>
                        );
                    case "textarea":
                        return (
                            <div class="form-floating mb-3" key={key}>
                                <textarea value={val} class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                <label for="floatingTextarea">{label}</label>
                            </div>
                        );
                    case "select":
                        return (
                            <div class="form-floating mb-3" key={key}>
                                <select value={val} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option value="">-- choose --</option>
                                    {(fld.options || []).map((opt, i) => (
                                        <option key={i} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <label for="floatingSelect">{label}</label>
                            </div>
                        );
                    case "radio":
                        return (
                            <div key={key} class="mb-3">
                                <label className="d-block mb-1">{label}</label>
                                {(fld.options || []).map((opt, i) => (
                                    <label key={i} style={{ marginRight: 12 }}>
                                        <input type="radio" name={fld.name} value={opt} checked={val === opt} />
                                        {opt} 
                                    </label>
                                ))}
                            </div>
                        );
   
                    case "checkbox":
                        return (
                            <div key={key} class="mb-3">
                            <label>
                                <input type="checkbox" checked={!!val}/> {label}
                            </label>
                            </div>
                        );

                    case "file":
                        return (
                            <div key={key} class="mb-3">
                            <label>{label}<br />
                                {fileInput}
                            </label>
                            </div>
                        );
                    default:
                        return (
                            <div key={key} style={{ marginBottom: 8 }}>
                            <label>{label} (unsupported type: {fld.type})<br />
                                <input value={val}  />
                            </label>
                            </div>
                        );
                }
                })}
            </form>
            )}
        </div>
    )
}

export default AdminViewForm