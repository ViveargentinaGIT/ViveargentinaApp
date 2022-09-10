import React  from 'react';
import NavBarAdmin from './NavBarAdmin.jsx';
import SideBar from './SideBar.jsx';
import './AdminDashboard.css';


//componente Admin Dashboard - Ruta en App.js --> "/admin"  
export default function AdminDashboard() {

    return (
       
        <div> 
            <NavBarAdmin>
                </NavBarAdmin>

            <SideBar>
                </SideBar>    
        </div>
        
    )
}
