import React from "react";
import "./RecentlyAdded.css";

class RecentlyAdded extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div>
				<a href={this.props.link}>
					<div className='recently-added-div'>
						<img
							src={this.props.imgLink}
							className='recently-added-image'
							alt={this.props.title}
						/>
						<h1>{this.props.title}</h1>

						<div className='extra-text'>
							<p>{this.props.domain.toUpperCase()}</p>
							<p className='new'>NEW</p>
						</div>
						<div className='recently-added-main-text'>
							<p>
								{this.props.smallPost.substring(0, 95)}.....
								<span className='read-more'>READ MORE</span>
							</p>
						</div>
						<div className='extra-text'>
							<p>{this.props.time.substring(0, 10)}</p>
							<i
								className='far fa-heart'
								style={{ fontSize: ".9em", color: "rgba(0,0,0,.6)" }}
							>
								{this.props.likes}
							</i>
							<p className='reading-time'>{this.props.readingTime}</p>
						</div>
					</div>
				</a>
			</div>
		);
	}
}

export default RecentlyAdded;
