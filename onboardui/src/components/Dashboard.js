import React from 'react'
import { Link } from "react-router-dom";

function Dashboard() {
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
                <Link to="/admin/forms/new" className="i-btn app-warning--btn btn--lg sub-create-form">Submissions</Link>
                </div>
            </div>

            <div class="col-md-6 col-xl-6">
                <div class="card form-card">
                    <div class="card-body">
                        <div class="form-content">
                            <div class="all-forms">
                                <h4>6</h4>
                                <p class="pb-3 pt-2">Forms Created</p>
                                <Link to="/admin/forms" className="i-btn btn--sm info--btn">All Forms</Link>
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
                                <h4>27</h4>
                                <p class="pb-3 pt-2">Completed Entries</p>
                                <Link to="/admin/forms" className="i-btn btn--sm info--btn">Submissions</Link>
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