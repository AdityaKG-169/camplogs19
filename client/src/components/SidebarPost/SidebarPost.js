import React from "react";
import "./SidebarPost.css";

const SidebarPost = (props) => {
	return (
		<div className='sidebar-post-div'>
			<a href={props.link}>
				<h1>{props.title}</h1>
				<div className='extra-text'>
					<p>{props.domain.toUpperCase()}</p>
					<p>{props.readingTime}</p>
					<i
						className='far fa-heart'
						style={{ fontSize: ".9em", color: "rgba(0,0,0,.6)" }}
					>
						{props.likes}
					</i>
				</div>
				<hr />
			</a>
		</div>
	);
};

export default SidebarPost;
