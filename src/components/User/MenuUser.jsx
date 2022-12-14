import React, { Fragment } from 'react';
import {useDispatch} from "react-redux";
import { logout } from "../../redux/action";

//componente Barra MEnu de Usuario - Ruta en App.js --> "/userlogged"  
export default function MenuUser() {
	
	const dispatch = useDispatch()

	const userLogout = ()=>{
		dispatch(logout());
	}

	return (	
		<Fragment>    
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item dropdown">
							<div class="dropdown">
								<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									NAME_USER
								</button>
								<ul class="dropdown-menu">
									<li><a class="dropdown-item" href="#">MY PROFILE</a></li>
									<button class="dropdown-item" type="button" onClick={()=>userLogout()}>LOGOUT</button>
								</ul>
							</div>
						</li>
						<button><i class="bi bi-cart"></i></button>
						<button><i class="bi bi-heart"></i></button>
						
						<li class="nav-item active">
							<a class="nav-link" href="#">MY TRIPS</a>
						</li>
					</ul>
				</div>
			</nav>
		</Fragment>
	)
}