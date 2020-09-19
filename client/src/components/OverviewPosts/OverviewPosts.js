import React from "react";
import "./overviewposts.css";
import OverviewPost from "../OverviewPost/OverviewPost";
class OverviewPosts extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
		};
	}

	componentDidMount() {
		fetch("http://localhost:8080/")
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					posts: data,
				})
			);
	}

	render() {
		return (
			<div>
				{this.state.posts.map((i, j) => {
					return (
						<OverviewPost
							title={i.title}
							key={j}
							likes={i.likes}
							link={i.link}
						/>
					);
				})}
			</div>
		);
	}
}

export default OverviewPosts;
