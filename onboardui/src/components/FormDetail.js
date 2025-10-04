import React from 'react'
import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";

function FormDetail() {
    const API_ROOT = "http://127.0.0.1:8000/api";
    const { id } = useParams();
    const [form, setForm] = useState(null);
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

    
    function handleClientChange(name, value) {
        setClientData((s) => ({ ...s, [name]: value }));
    }


    function handleClientFile(name, files) {
        setClientFiles((s) => ({ ...s, [name]: files }));
    }


    function evalCondition(valueStr, conditionStr) {
        // conditionStr examples: ">10000", "<=2000", "==yes"
        if (typeof conditionStr !== "string") return false;
        const m = conditionStr.match(/^([><=!]+)\s*(.+)$/);
        if (!m) return false;
        const op = m[1];
        const rhs = m[2];
        const lhs = Number(valueStr);
        const rhsNum = Number(rhs);
        if (!isNaN(lhs) && !isNaN(rhsNum)) {
        switch (op) {
        case ">": return lhs > rhsNum;
        case ">=": return lhs >= rhsNum;
        case "<": return lhs < rhsNum;
        case "<=": return lhs <= rhsNum;
        case "==": return lhs == rhsNum;
        case "!=": return lhs != rhsNum;
        default: return false;
        }
        }
        // fallback to string comparisons
        switch (op) {
        case "==": return String(valueStr) === rhs;
        case "!=": return String(valueStr) !== rhs;
        default: return false;
        }
    }

    function runClientValidations() {
        const cfg = clientForm?.config;
        if (!cfg) return { ok: false, message: "No form loaded" };
        for (const fld of cfg.fields || []) {
            const val = clientData[fld.name];
            // required
            if (fld.required && (val === "" || val === null || val === undefined || (fld.type === "file" && !clientFiles[fld.name]))) {
            return { ok: false, message: `${fld.label || fld.name} is required` };
            }
            // required_if
            if (fld.required_if) {
                // required_if is an object with one key: other field name => condition string
                for (const [other, cond] of Object.entries(fld.required_if)) {
                    const otherVal = clientData[other];
                    if (evalCondition(otherVal, cond)) {
                        // this field is required
                        if (fld.type === "file") {
                        if (!clientFiles[fld.name] || clientFiles[fld.name].length === 0) return { ok: false, message: `${fld.label || fld.name} is required (condition met)` };
                        } else {
                        if (clientData[fld.name] === "" || clientData[fld.name] === null || clientData[fld.name] === undefined) return { ok: false, message: `${fld.label || fld.name} is required (condition met)` };
                        }
                    }
                }
            }
        }
        return { ok: true };
    }

    async function handleClientSubmit(e) {
        e.preventDefault();
        setSubmitStatus(null);
        const v = runClientValidations();
        if (!v.ok) return alert(v.message);

        // Prepare FormData
        const fd = new FormData();
        // Attach the form id
        fd.append("form", clientForm.id);
        // Attach data (non-file answers)
        fd.append("data", JSON.stringify(clientData));
        // Attach files: backend should accept these as file_<fieldname>
        for (const [fieldName, fileList] of Object.entries(clientFiles)) {
        if (!fileList) continue;
        // fileList may be a FileList or array
        for (let i = 0; i < fileList.length; i++) {
        // fd.append(`file_${fieldName}`, fileList[i]);
        fd.append(fieldName, fileList[i]);
        }
        }

        try {
        setSubmitStatus("submitting");
        const res = await fetch(`${API_ROOT}/forms/${clientForm.id}/submit/`, {
            method: "POST",
            body: fd
        });
        if (!res.ok) {
            const txt = await res.text();
            setSubmitStatus("failed");
            alert("Submit failed: " + txt);
            return;
        }
        const payload = await res.json();
        setSubmitStatus("success");
        alert("Submitted. server response: " + JSON.stringify(payload));
        } catch (e) {
        console.error(e);
        setSubmitStatus("failed");
        alert("Network error submitting form");
        }
    }

    return (
        <div className='container config-form'>
            {clientForm && (
            <form onSubmit={handleClientSubmit} style={{ border: "1px solid #ddd", padding: 12 }} noValidate>
                <div className='form-text'>
                    <h3>{clientForm.name}</h3>
                    <p>{clientForm.description}</p>
                </div>

                {(clientForm.config.fields || []).map((fld) => {
                const key = fld.name;
                const label = fld.label || fld.name;
                const val = clientData[key];
                const fileInput = (
                    <input type="file" multiple={fld.multiple} onChange={(e) => handleClientFile(key, e.target.files)}  />
                );

                switch (fld.type) {
                    case "text":
                        return (
                            <div class="form-floating mb-3" key={key}>
                                <input type='text' class="form-control" id="floatingInput" value={val} onChange={(e) => handleClientChange(key, e.target.value)}/>
                                <label for="floatingInput">{label}</label>
                            </div>                       
                        );
                    case "number":
                        return (
                            <div class="form-floating mb-3" key={key} >
                                <input  type="number" value={val} class="form-control" id="floatingInput" onChange={(e) => handleClientChange(key, e.target.value)} />
                                <label for="floatingInput">{label}</label>
                            </div>
                        );
                    case "date":
                        return (
                            <div class="form-floating mb-3" key={key} >
                                <input type="date" value={val} class="form-control" id="floatingInput" onChange={(e) => handleClientChange(key, e.target.value)}/>
                                <label for="floatingInput">{label}</label>
                            </div>
                        );
                    case "select":
                        return (
                            <div class="form-floating mb-3" key={key}>
                                <select value={val} onChange={(e) => handleClientChange(key, e.target.value)} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option value="">-- choose --</option>
                                    {(fld.options || []).map((opt, i) => (
                                        <option key={i} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <label for="floatingSelect">{label}</label>
                            </div>
                        );
                    case "checkbox":
                        return (
                            <div key={key} class="mb-3">
                            <label>
                                <input type="checkbox" checked={!!val} onChange={(e) => handleClientChange(key, e.target.checked)}/> {label}
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

                    // for when Fields may evolve
                    case "password":
                        return (
                            <div class="form-floating mb-3" key={key}>
                                <input type='password' class="form-control" id="floatingInput" value={val} onChange={(e) => handleClientChange(key, e.target.value)}/>
                                <label for="floatingInput">{label}</label>
                            </div>                       
                        );
                    case "email":
                        return (
                            <div class="form-floating mb-3" key={key}>
                                <input type='email' class="form-control" id="floatingInput" value={val} onChange={(e) => handleClientChange(key, e.target.value)}/>
                                <label for="floatingInput">{label}</label>
                            </div>                       
                        );
                    
                    case "tel":
                        return (
                            <div class="form-floating mb-3" key={key} >
                                <input  type="tel" value={val} class="form-control" id="floatingInput" onChange={(e) => handleClientChange(key, e.target.value)}/>
                                <label for="floatingInput">{label}</label>
                            </div>
                        );
                    
                    case "textarea":
                        return (
                            <div class="form-floating mb-3" key={key}>
                                <textarea value={val} class="form-control" placeholder="Leave a comment here" id="floatingTextarea" onChange={(e) => handleClientChange(key, e.target.value)}></textarea>
                                <label for="floatingTextarea">{label}</label>
                            </div>
                        );
                    
                    case "radio":
                        return (
                            <div key={key} class="mb-3">
                                <label className="d-block mb-1">{label}</label>
                                {(fld.options || []).map((opt, i) => (
                                    <label key={i} style={{ marginRight: 12 }}>
                                        <input type="radio" name={fld.name} value={opt} checked={val === opt} onChange={(e) => handleClientChange(key, e.target.value)} />
                                        {opt} 
                                    </label>
                                ))}
                            </div>
                        );
                    default:
                    return (
                        <div key={key} class="mb-3">
                        <label>{label} (unsupported type: {fld.type})<br />
                            <input value={val} onChange={(e) => handleClientChange(key, e.target.value)} />
                        </label>
                        </div>
                    );
                }
                })}


                <div style={{ marginTop: 12 }}>
                <button type="submit" disabled={submitStatus === "submitting"} className='submit-form-btn w-100'>
                    {submitStatus === "submitting" ? "Submitting..." : "Submit"}
                </button>
                {submitStatus === "success" && <span style={{ marginLeft: 8, color: "green" }}>Submitted ✓</span>}
                {submitStatus === "failed" && <span style={{ marginLeft: 8, color: "red" }}>Failed ✗</span>}
                </div>
            </form>
            )}
        </div>
    )
}

export default FormDetail