import React from "react";
import "./login.css";

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			message: "",
			isLoggedIn: false,
		};
	}

	saveToken = (data) => {
		window.localStorage.setItem("token", data);
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleClick = () => {
		fetch("http://localhost:8080/login", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
		})
			.then((response) => response.json())
			.then((token) => this.saveToken(token));
	};

	render() {
		return (
			<div className="login-div">
				<h1>Login To Admin Panel</h1>
				<div className="login-card">
					<input
						type="text"
						placeholder="Username"
						value={this.state.username}
						onChange={this.handleChange}
						name="username"
						className="login-input"
					/>
					<input
						type="password"
						value={this.state.password}
						placeholder="Password"
						onChange={this.handleChange}
						name="password"
						className="login-input"
					/>
					<button onClick={this.handleClick}>Login</button>
				</div>
			</div>
		);
	}
}

export default Login;
