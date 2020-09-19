const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let posts = new Schema({
	title: {
		type: String,
		required: true,
	},
	imgLink: {
		type: String,
		required: true,
	},
	time: {
		type: Date,
		default: Date.now,
	},
	smallPost: {
		type: String,
	},
	post: {
		type: String,
	},
	link: {
		type: String,
		required: true,
	},
	domain: {
		type: String,
		required: true,
	},
	readingTime: {
		type: String,
		default: "3 mins read",
	},
	likes: {
		type: Number,
		default: 1,
	},
});

module.exports = mongoose.model("posts", posts);
