import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
    const [formsCount, setFormsCount] = useState(0);
    const [submissionsCount, setSubmissionsCount] = useState(0);

  useEffect(() => {
    // fetch forms count
    fetch("http://localhost:8000/api/forms/count/")
      .then(res => res.json())
      .then(data => setFormsCount(data.forms_count))
      .catch(err => console.error("Error fetching forms count:", err));

    // fetch submissions count
    fetch("http://localhost:8000/api/submissions/count/")
      .then(res => res.json())
      .then(data => setSubmissionsCount(data.submissions_count))
      .catch(err => console.error("Error fetching submissions count:", err));
  }, []);

  return (
    <div className='dashboard-statistics'>
        <div class="row g-4">
            <div class="col-md-6">
                <div class="card banner-card form-card">
                    <h3>Welcome Back</h3>
                    <p>Easily manage and create new onboarding forms in one place.</p>
                    <Link to="/admin/forms/new" className="i-btn primary--btn btn--lg dashboard-create-form">Create Form</Link>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card banner-card sub-card">
                    <h3>Form Responses</h3>
                    <p>Track how users are engaging with your forms in real-time.</p>
                <Link to="/admin/submissions" className="i-btn app-warning--btn btn--lg sub-create-form">Submissions</Link>
                </div>
            </div>

            <div class="col-md-6 col-xl-6">
                <div class="card form-card">
                    <div class="card-body">
                        <div class="form-content">
                            <div class="all-forms">
                                <h4>{formsCount}</h4>
                                <p class="pb-3 pt-2">Forms Created</p>
                                <Link to="/admin/forms" className="i-btn btn--sm info--btn stat-btn">All Forms</Link>
                            </div>

                            <div class="icon text--secondary">
                                <i class="las la-sms"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-xl-6">
                <div class="card form-card">
                    <div class="card-body">
                        <div class="form-content">
                            <div class="all-forms">
                                <h4>{submissionsCount}</h4>
                                <p class="pb-3 pt-2">Completed Entries</p>
                                <Link to="/admin/forms" className="i-btn btn--sm info--btn stat-btn">Submissions</Link>
                            </div>

                            <div class="icon text--danger">
                                <i class="las la-envelope"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard