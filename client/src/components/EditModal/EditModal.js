import React from "react";

class EditModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.post.title,
			post: this.props.post.post,
			smallPost: this.props.post.smallPost,
			link: this.props.post.link,
			imgLink: this.props.post.imgLink,
			domain: this.props.post.domain,
			readingTime: this.props.post.readingTime,
		};
	}

	handleChange = (event) => {
		this.setState(
			{
				title: event.target.value,
			},
			() => {
				fetch(`http://localhost:8080/administrator/${this.state.link}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: window.localStorage.getItem("token"),
					},
				});
			}
		);
	};

	render() {
		return (
			<div>
				<input
					value={this.state.title}
					type='text'
					placeholder='title'
					onChange={this.handleChange}
				/>
				{console.log(this.state.title)}
			</div>
		);
	}
}

export default EditModal;
