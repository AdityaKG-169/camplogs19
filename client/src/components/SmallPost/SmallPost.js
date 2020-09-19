import React from "react";
import "./SmallPost.css";
import ReactHtmlParser from "react-html-parser";

class SmallPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className='smallpost-main-div'>
				<div className='smallpost-text'>
					<p>{this.props.domain.toUpperCase()}</p>
					<a href={this.props.link}>
						<h1>{this.props.title}</h1>
					</a>

					<p>
						{ReactHtmlParser(this.props.smallPost.substring(0, 95))}.....
						<a href={this.props.link}>
							<span className='read-more'>READ MORE</span>
						</a>
					</p>
					<div className='extra-info'>
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
				<div className='smallpost-image'>
					<a href={this.props.link}>
						<img src={this.props.imgLink} alt={this.props.title} />
					</a>
				</div>
			</div>
		);
	}
}
export default SmallPost;
