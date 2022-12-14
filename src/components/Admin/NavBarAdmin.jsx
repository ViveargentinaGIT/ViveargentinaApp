import React from 'react';
import { useEffect } from 'react';
import './NavBarAdmin.css';



export default function NavBarAdmin() {
    let userFromStorage = JSON.parse(localStorage.getItem("user"));
    let user = userFromStorage?.user;

    useEffect(() => {
        userFromStorage = JSON.parse(localStorage.getItem("user"));
    }, []);

    return (
        <div>
            <div className="container-fluid-admin">
                <div className="row">
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                        <div className="collapse navbar-collapse">
                            <img className='nav-item-img' src={user?.photo} alt="" />
                        </div>
                        <div className="collapse navbar-collapse">
                            <span className='nav-item'> {user?.first_name} {user?.last_name} DASHBOARD</span>
                        <div className="collapse navbar-collapse">                     
                                <a href="/home"> <button className="btn btn-outline-secondary btn-lg" style={{backgroundColor:"#C49D48",}}>HOME</button></a>                            
                        </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}