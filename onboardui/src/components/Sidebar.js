import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar" id="sidebar">
        <div className="sidebar-top">
            <div className="site-logo">
                <Link to="/admin/dashboard" className="site-name">OnBoardForms</Link>
            </div>
        </div>
        <div className="sidebar-menu-container" data-simplebar>
            <ul className="sidebar-menu">
                <li class="sidebar-menu-item">
                    <Link to="/admin/dashboard" className="sidebar-menu-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 32 32"><path fill="#000" d="M16 6C9.383 6 4 11.383 4 18a11.93 11.93 0 0 0 2.75 7.625l.281.375H24.97l.281-.375A11.93 11.93 0 0 0 28 18c0-6.617-5.383-12-12-12m0 2c5.535 0 10 4.465 10 10c0 2.266-.793 4.324-2.063 6H8.063C6.793 22.324 6 20.266 6 18c0-5.535 4.465-10 10-10m0 1c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1m-4 1.063c-.55 0-1 .449-1 1s.45 1 1 1s1-.45 1-1c0-.551-.45-1-1-1m8 0c-.55 0-1 .449-1 1s.45 1 1 1s1-.45 1-1c0-.551-.45-1-1-1M9.062 13c-.55 0-1 .45-1 1s.45 1 1 1c.551 0 1-.45 1-1s-.449-1-1-1m13.594.031L17 16.281A2 2 0 0 0 16 16a1.999 1.999 0 1 0 0 4a2 2 0 0 0 2-1.969V18l5.656-3.219zM8 17c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1m16 0c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1M9.062 21c-.55 0-1 .45-1 1s.45 1 1 1c.551 0 1-.45 1-1s-.449-1-1-1m13.876 0c-.551 0-1 .45-1 1s.449 1 1 1s1-.45 1-1s-.45-1-1-1"></path></svg>
                    Dashboard
                    </Link>
                </li> 
                <li class="sidebar-menu-item">
                    <Link to="/admin/forms/new" className="sidebar-menu-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 36 36"><path fill="#000" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1M8 10h12V7.94H8Z" className="clr-i-outline clr-i-outline-path-1"></path><path fill="#000" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1M20 18H8v-2h12Z" className="clr-i-outline clr-i-outline-path-2"></path><path fill="#000" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.4 3.4 0 0 1 .06-.49" className="clr-i-outline clr-i-outline-path-3"></path><path fill="#000" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79" className="clr-i-outline clr-i-outline-path-4"></path><path fill="#000" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" className="clr-i-outline clr-i-outline-path-5"></path><path fill="#000" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.6 1.6 0 0 0 .31 0a1.2 1.2 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" className="clr-i-outline clr-i-outline-path-6"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
                    Create Form
                    </Link>
                </li> 
                <li class="sidebar-menu-item">
                    <Link to="/admin/forms" className="sidebar-menu-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 512 512"><path fill="#000" fillRule="evenodd" d="M218.37 106.667L256 125.462l37.63-18.795h175.704v320H303.68L256 450.518l-47.7-23.851H42.667v-320zm-10.071 42.667H85.334V384H218.37l16.297 8.14V162.518zm218.368 0H303.68l-26.347 13.179V392.14l16.298-8.14h133.036zm-21.333 128v32H298.667v-32zm-192 0v32H106.667v-32zm192-85.334v32H298.667v-32zm-192 0v32H106.667v-32z"></path></svg>
                    All Forms
                    </Link>
                </li>    
            </ul>
        </div>           
    </aside>
  );
}

export default Sidebar;
