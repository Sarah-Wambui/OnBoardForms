import React from 'react'

function TopBar() {
  return (
    <header className="header">
        <div className="header_sub_content">
            <div className="topbar-left">
                <div className="sidebar-controller">
                    <button className="sidebar-control-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width={96} height={96} viewBox="0 0 24 24"><path fill="#233746" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"></path></svg>
                    </button>
                </div>
            </div>
            <div className="topbar-right">
                <div className="profile_notification">                  
                    <div className="profile-dropdown drop-down">
                        <div className="pointer dropdown-toggle d--flex align--center" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Admin
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <a className="dropdown-item"><i className="me-1 las la-cog"></i>Profile Setting</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href=""><i className="me-1 las la-lock"></i> Password Update</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href=""><i className="me-1 las la-sign-in-alt"></i> Logout</a>
                            </li>
                        </ul>
                    </div>                   
                </div>
            </div>   
        </div>
    </header>
  )
}

export default TopBar;