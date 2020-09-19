import React from "react";
import "./OverviewPost.css";
import EditModal from "../EditModal/EditModal";

class OverviewPost extends React.Component {
	constructor() {
		super();
		this.state = {
			isModalOpen: false,
			post: "",
		};
	}

	handleEdit = () => {
		fetch(`http://localhost:8080/post/${this.props.link}`)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					post: data,
					isModalOpen: true,
				})
			);
	};

	handleDelete = () => {
		let sureDelete = prompt("Type DELETE to permanently delete the post");
		if (sureDelete !== "DELETE") {
			alert("Post Not Deleted");
			return;
		}
		fetch(`http://localhost:8080/administrator/${this.props.link}`, {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
				Authorization: window.localStorage.getItem("token"),
			},
		})
			.then((response) => response.json())
			.then(() => alert("Post Successfully Deleted"))
			.then(() => window.location.reload(true));
	};

	render() {
		return this.state.isModalOpen ? (
			<EditModal post={this.state.post} />
		) : (
			<div>
				{this.props.title}
				{this.props.likes}
				<button onClick={this.handleEdit}>Edit</button>
				<button onClick={this.handleDelete}>Delete</button>
			</div>
		);
	}
}
export default OverviewPost;
