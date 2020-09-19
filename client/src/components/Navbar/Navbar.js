import React from "react";
import "./Navbar.css";

class Navbar extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div className='outer-nav'>
				<div className='nav'>
					<a href='/'>
						<span className='logo-text'>CAMPLOGS</span>
					</a>

					<label htmlFor='toggle'>&#9776;</label>
					<input type='checkbox' id='toggle' />
					<div className='menu'>
						<a href=''></a>
						<a href='/'>Home</a>
						<a href='jee'>JEE</a>
						<a href='programming'>Programming</a>
						<a href='lifelogs'>Lifelogs</a>
						<a href='http://easeprep.camplogs.in'>Resources</a>
					</div>
				</div>
				<div className='mobile-banner'>
					<h1 className='mobile-banner-heading'>
						Get Free Material and Question Papers for JEE and Programming{" "}
						<a href='http://easeprep.camplogs.in'>here</a>
					</h1>
				</div>
			</div>
		);
	}
}
export default Navbar;
