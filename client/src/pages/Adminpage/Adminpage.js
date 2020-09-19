import React from "react";
import "./Adminpage.css";
import NewPost from "../../components/NewPost/NewPost";
import OverviewPosts from "../../components/OverviewPosts/OverviewPosts";

class Adminpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const token = window.localStorage.getItem("token");
		if (!token) {
			this.props.history.push("/");
			return;
		}
		fetch("http://localhost:8080/istokenvalid", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data !== "success") {
					this.props.history.push("/");
					return;
				}
			});
	}

	handleLogout = () => {
		window.localStorage.clear("token");
		window.location.reload();
	};

	render() {
		return (
			<div className="adminpage-main-div">
				<button onClick={this.handleLogout}>Log Out</button>
				<NewPost />
				<OverviewPosts />
			</div>
		);
	}
}
export default Adminpage;
