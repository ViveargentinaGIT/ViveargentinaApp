import React, { Fragment } from 'react';
import GoogleLogin from 'react-google-login';

//componente Barra MEnu de Usuario - Ruta en App.js --> "/user"  
export default function MenuUser() {

	const responseGoogle = (response) => {
		console.log(response);
	}

	return (
		
		
		<Fragment>
			        
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<GoogleLogin
				clientId="968326545929-buhpvbglrgfe23rqfhmhmo2a9t738bev.apps.googleusercontent.com"
				buttonText="Login"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
				/>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">

						<li class="nav-item dropdown">
							<div class="dropdown">
								<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									USER
								</button>
								<ul class="dropdown-menu">
									<li><a class="dropdown-item" href="#">LOGIN</a></li>
									<li><a class="dropdown-item" href="#">MY PROFILE</a></li>
									<li><a class="dropdown-item" href="#">SIGN IN</a></li>
									<div class="dropdown-divider"></div>
									<button class="dropdown-item" type="button">LOGOUT</button>
								</ul>
							</div>
						</li>

						<li class="nav-item active">
							<a class="nav-link" href="#">MY TRAVELS</a>
						</li>

					</ul>

				</div>
			</nav>

		</Fragment>


	)

}
