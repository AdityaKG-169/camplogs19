import React from "react";
import SmallPost from "../../components/SmallPost/SmallPost";
import "./Homepage.css";
import RecentlyAdded from "../../components/RecentlyAdded/RecentlyAdded";
import Sidebar from "../../components/Sidebar/Sidebar";

class Homepage extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			isLoading: true,
		};
	}

	componentDidMount() {
		fetch(`/allposts${this.props.location.pathname.toLowerCase()}`)
			.then((response) => response.json())
			.then((data) => {
				return this.setState({
					posts: data.reverse(),
					isLoading: false,
				});
			});
	}

	render() {
		const posts = this.state.posts.map((i, j) => {
			return (
				<SmallPost
					title={i.title}
					imgLink={i.imgLink}
					likes={i.likes}
					post={i.post}
					id={i._id}
					link={i.link}
					domain={i.domain}
					time={i.time}
					key={j}
					readingTime={i.readingTime}
					smallPost={i.smallPost}
				/>
			);
		});

		const recentPosts = this.state.posts.map((i, j) => {
			return (
				<RecentlyAdded
					title={i.title}
					imgLink={i.imgLink}
					likes={i.likes}
					post={i.post}
					id={i._id}
					link={i.link}
					domain={i.domain}
					time={i.time}
					key={j}
					readingTime={i.readingTime}
					smallPost={i.smallPost}
				/>
			);
		});
		const recentlyAdded = recentPosts.filter((i, j) => {
			return j < 3;
		});

		const fliteredPosts = posts.filter((i, j) => {
			return j >= 3;
		});

		return this.state.isLoading ? (
			<div className="loading"></div>
		) : (
			<div className="homepage-main-div">
				<div className="recently-added-main">{recentlyAdded}</div>
				<hr />
				<div className="bottom-page">
					<div>{fliteredPosts}</div>
					<Sidebar />
				</div>
			</div>
		);
	}
}

export default Homepage;
