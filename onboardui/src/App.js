import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AdminDashboard from "./components/AdminDashboard";
import DashboardContent from './components/DashboardContent';
import CreateForm from './components/CreateForm';
import HomePage from './components/HomePage';
import ClientForms from './components/ClientForms';
import FormDetail from './components/FormDetail';
import AdminViewForm from './components/AdminViewForm';
import Dashboard from './components/Dashboard';
import Submissions from './components/Submissions';

function prettyJSON(obj) {
  try {
  return JSON.stringify(obj, null, 2);
  } catch (e) {
  return String(obj);
  }
}

function App() {
  const [forms, setForms] = useState([]);
  const [loadingForms, setLoadingForms] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [configError, setConfigError] = useState(null);
  const API_ROOT = "http://127.0.0.1:8000/api";
  const [configText, setConfigText] = useState(
    prettyJSON({
      fields: [
        { name: "full_name", label: "Full Name", type: "text", required: true },
        { name: "dob", label: "Date of Birth", type: "date", required: true },
        { name: "loan_amount", label: "Loan Amount", type: "number", required: true },
        {
          name: "income_proof",
          label: "Upload Income Proof",
          type: "file",
          required_if: { loan_amount: ">10000" }
        }
      ]
    })
  );



  useEffect(()=>{
    fetchForms();
  }, []);

  async function fetchForms() {
    try {
      const res = await fetch(`${API_ROOT}/forms/`);
      const data = await res.json();
      setForms(data); 
    } catch (error) {
      console.error(error);
      setForms([]);
    }
  }

  async function handleSelectForm(id) {
      try {
        const res = await fetch(`${API_ROOT}/forms/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch form");
        const f = await res.json();
        setName(f.name || "");
        setDescription(f.description || "");
        setConfigText(prettyJSON(f.config || {}));
        setConfigError(null);
      } catch (e) {
        console.error(e);
        alert("Could not load form: " + e.message);
      }
  }

    // --- Render ---
    return (
      <div className="App">
          <Routes>
            {/* home page */}
            <Route path="/" element={<HomePage />} />
            <Route path="/forms" element={<ClientForms forms={forms}  />} />
            <Route path="/forms/:id" element={<FormDetail />} />

            {/* Admin dashboard routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="dashboard"  element={<Dashboard />} />
              <Route path="forms" element={<DashboardContent forms={forms} setForms={setForms} handleSelectForm={handleSelectForm} />} />
              <Route path="forms/new" element={<CreateForm fetchForms={fetchForms} />} />
              <Route path="forms/:id" element={<AdminViewForm />} />
              <Route path="submissions"  element={<Submissions />} />
            </Route>
          </Routes>
      </div>
    );
}
export default App;
