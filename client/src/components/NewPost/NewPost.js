import React from "react";
import "./NewPost.css";

class NewPost extends React.Component {
	constructor() {
		super();
		this.state = {
			title: "",
			post: "",
			smallPost: "",
			domain: "",
			link: "",
			readingTime: "",
			imgLink: "",
		};
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleNewSubmit = () => {
		fetch("http://localhost:8080/administrator/new", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: window.localStorage.getItem("token"),
			},
			body: JSON.stringify(this.state),
		})
			.then((response) => response.json())
			.then(
				this.setState({
					title: "",
					post: "",
					smallPost: "",
					domain: "",
					link: "",
					readingTime: "",
					imgLink: "",
				})
			);
	};

	render() {
		return (
			<div className='adminpage-main-div'>
				<input
					type='text'
					name='title'
					placeholder='Title'
					className='inputbox'
					value={this.state.title}
					onChange={this.handleChange}
				/>
				<textarea
					name='post'
					value={this.state.post}
					onChange={this.handleChange}
					placeholder='Post'
				></textarea>
				<textarea
					name='smallPost'
					value={this.state.smallPost}
					placeholder='Small Post'
					onChange={this.handleChange}
				></textarea>
				<input
					type='text'
					name='domain'
					placeholder='Domain'
					className='inputbox'
					value={this.state.domain}
					onChange={this.handleChange}
				/>
				<input
					type='text'
					name='link'
					placeholder='Link'
					className='inputbox'
					value={this.state.link}
					onChange={this.handleChange}
				/>
				<input
					type='text'
					name='readingTime'
					placeholder='Reading Time'
					className='inputbox'
					value={this.state.readingTime}
					onChange={this.handleChange}
				/>
				<input
					type='text'
					name='imgLink'
					placeholder='Image Link'
					className='inputbox'
					value={this.state.imgLink}
					onChange={this.handleChange}
				/>
				<button onClick={this.handleNewSubmit}>Submit</button>
			</div>
		);
	}
}

export default NewPost;
