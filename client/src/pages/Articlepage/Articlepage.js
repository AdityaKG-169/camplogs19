import React from "react";
import "./ArticlePage.css";
import ReactHtmlParser from "react-html-parser";

class Articlepage extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			isLoading: true,
			likes: "",
			isLiked: false,
			time: "",
		};
	}

	componentDidMount() {
		fetch(
			`https://camplogs-backend.herokuapp.com/post${this.props.location.pathname}`
		)
			.then((response) => response.json())
			.then((data) => {
				return this.setState({
					posts: data,
					isLoading: false,
					time: data.time,
					likes: data.likes,
					isLiked: false,
				});
			});
	}

	handleLike = () => {
		this.setState(
			{
				isLiked: !this.state.isLiked,
				likes: this.state.isLiked ? this.state.likes - 1 : this.state.likes + 1,
			},
			() => {
				fetch(
					`https://camplogs-backend.herokuapp.com/like${this.props.location.pathname}`,
					{
						method: "PATCH",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							likes: this.state.likes,
						}),
					}
				).then((res) => res.json());
			}
		);
	};

	render() {
		return this.state.isLoading ? (
			<div className="loading"></div>
		) : (
			<div className="article-div">
				<h1 className="article-title">{this.state.posts.title}</h1>
				<div className="sub-info">
					<div>
						<p>{this.state.posts.time.slice(0, 10)}</p>
						<p>{this.state.posts.domain.toUpperCase()}</p>
						<p>{this.state.posts.readingTime}</p>
					</div>
					<div className="contact-links">
						<a
							href="https://www.facebook.com/adityakrishna.gupta"
							className="fa fa-facebook faIcons"
							target="_blank"
						></a>
						<a
							href="https://www.linkedin.com/in/adityakrishnagupta"
							className="fa fa-linkedin faIcons"
							target="_blank"
						></a>
						<a
							href="https://www.instagram.com/aditya.krishna.gupta"
							className="fa fa-instagram faIcons"
							target="_blank"
						></a>
					</div>
				</div>
				<img src={this.state.posts.imgLink} style={{ width: "100%" }} />
				<div className="main-body-post">
					{ReactHtmlParser(this.state.posts.post)}
				</div>
				{this.state.isLiked ? (
					<i
						onClick={this.handleLike}
						style={{ color: "red" }}
						title="Unlike"
						className="far articleLikeIcon fa-heart"
					>
						{this.state.likes}
					</i>
				) : (
					<i
						onClick={this.handleLike}
						title="Like"
						className="far articleLikeIcon fa-heart"
						style={{ color: "black" }}
					>
						{this.state.likes}
					</i>
				)}
				<hr />
				<p className="extra-text">
					You can find FREE Questions Papers for JEE, questions and study
					material for programming interviews <a href="resources"> here</a>
				</p>
			</div>
		);
	}
}
export default Articlepage;
