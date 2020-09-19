import React from "react";
import SidebarPost from "../SidebarPost/SidebarPost";
import "./Sidebar.css";

class Sidebar extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
		};
	}

	componentDidMount() {
		fetch("https://camplogs-backend.herokuapp.com")
			.then((response) => response.json())
			.then((data) => {
				return this.setState({
					posts: data,
				});
			});
	}

	render() {
		let key = 0;
		let sortedPosts = this.state.posts;
		for (let i = 0; i < sortedPosts.length; i++) {
			for (let j = 0; j < sortedPosts.length - 1; j++) {
				if (sortedPosts[j].likes < sortedPosts[j + 1].likes) {
					key = sortedPosts[j];
					sortedPosts[j] = sortedPosts[j + 1];
					sortedPosts[j + 1] = key;
				}
			}
		}

		const filteredSortedPosts = sortedPosts.filter((i, j) => {
			return j < 6;
		});

		return (
			<div className='sidebar-div'>
				<h1>Most Liked Posts</h1>
				{filteredSortedPosts.map((i, j) => {
					return (
						<SidebarPost
							title={i.title}
							readingTime={i.readingTime}
							post={i.post}
							key={j}
							domain={i.domain}
							link={i.link}
							likes={i.likes}
						/>
					);
				})}
			</div>
		);
	}
}

export default Sidebar;
