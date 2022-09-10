import React from 'react';
import Login from '../User/Login.jsx';
import './NavBarAdmin.css';

export default function NavBarAdmin() {
    return(
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark"> 
                    <div className="collapse navbar-collapse">
                        <span className='nav-item'>ADMIN DASHBBOARD</span>
                        <ul className="navbar-nav">
                            <li className="nav-item"> <a href="#" class="nav-link"> Home </a> </li>
                            <li className="nav-item"> 
                                <Login> </Login>
                            </li>
                            
                        </ul>
                    </div>
            </nav>
        </div>
    )
}