import React from 'react';
import './SideBar.css';

export default function SideBar() {
    return (
        <div>
            <div className="container__sidebar">
            <ul className="sidebar">
                <br />
                <li><span><i class="bi bi-airplane-fill"></i></span><span>PACKS</span></li>
                <br />
                <li><span><i class="bi bi-compass"></i></span><span>EXPERIENCES</span></li>
                <br />
                <li><span><i class="bi bi-cart4"></i></span><span>SALES</span></li>
                <br />
                <li><span><i class="bi bi-person-circle"></i></span><span>USERS</span></li>
                <br />
                <li><span><i class="bi bi-bell-fill"></i></span><span>NOTIFICATIONS</span></li>
                
            </ul>
            </div>
        </div>
    )
}