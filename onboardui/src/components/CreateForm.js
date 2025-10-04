import React, { useState} from 'react';


function prettyJSON(obj) {
  try {
  return JSON.stringify(obj, null, 2);
  } catch (e) {
  return String(obj);
  }
}
function CreateForm({fetchForms}) {
    const [selectedFormId, setSelectedFormId] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [configError, setConfigError] = useState(null);
    const API_ROOT = "http://127.0.0.1:8000/api";
    const [configText, setConfigText] = useState();


    function validateConfigText(text) {
        try {
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed !== "object") throw new Error("config must be an object");
        if (!Array.isArray(parsed.fields)) throw new Error("config.fields must be an array");
        // basic shape validation
        for (const f of parsed.fields) {
        if (!f.name) throw new Error("each field needs a 'name'");
        if (!f.type) throw new Error("each field needs a 'type'");
        }
        setConfigError(null);
        return parsed;
        } catch (err) {
        setConfigError(err.message);
        return null;
        }
    }

    async function handleCreateForm() {
        const parsed = validateConfigText(configText);
        if (!parsed) return;
        const payload = { name, description, config: parsed };
        try {
        const res = await fetch(`${API_ROOT}/forms/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            const err = await res.text();
            alert("Create failed: " + err);
            return;
        }
        const created = await res.json();
        alert("Form created: " + created.id);
        setSelectedFormId(created.id);
        fetchForms();
        } catch (e) {
        console.error(e);
        alert("Network error creating form");
        }
    }


    return (
        <div className='form-editor'>
            <div className='form-editor-wrapper'>
                <h2>Create Form (JSON editor)</h2>
                <p>From KCY to investment declarations, bring your ideas to life effortlessly</p>
                <div className='form-editor-container'>
                    <div className='form-name'>
                        <div class="form-floating mb-3">
                            <input  class="form-control" id="floatingInput" placeholder=" Form Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%" }}/>
                            <label for="floatingInput">Name</label>
                        </div>
                        <br /><br />
                        <div class="form-floating mb-3">
                            <input  class="form-control" id="floatingInput" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%" }}/>
                            <label for="floatingInput">Description</label>
                        </div>
                    </div>
                    <div className='form-configs'>
                        <label>
                            Config (JSON) <br />
                            <textarea 
                                className='json-textarea' 
                                value={configText} onChange={(e) => setConfigText(e.target.value)} 
                                rows={24} 
                                style={{ width: "100%", fontFamily: "monospace" }} 
                                placeholder={prettyJSON({
                                    fields: [
                                        { name: "full_name", label: "Full Name", type: "text", required: true },
                                        { name: "dob", label: "Date of Birth", type: "date", required: true },
                                        { name: "loan_amount", label: "Loan Amount", type: "number", required: true },
                                    ]
                                })}
                            />
                        </label>
                        <div style={{ marginTop: 30 }} >
                            <button onClick={() => {
                            const parsed = validateConfigText(configText);
                            if (!parsed) return alert("Invalid JSON: " + configError);
                            // pretty print
                            setConfigText(prettyJSON(parsed));
                            }} className='format-json-btn'>Format JSON</button>
                            <button onClick={handleCreateForm} className='create-form-btn' style={{ marginLeft: 10}}>Create Form</button>
                        </div>
                        {configError && <div style={{ color: "red", marginTop: 8 }}>JSON Error: {configError}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateForm