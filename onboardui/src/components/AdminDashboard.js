import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from './TopBar';

function AdminDashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main_content added">
        <TopBar/>
        <main className="main">
          <Outlet /> 
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard