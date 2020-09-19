/****IMPORTING THE MODULES******/
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
const posts = require("./model");
const jwt = require("jsonwebtoken");
/****INITIALIZING THE EXPRESS APP******/

const app = express();
app.use(cors());
app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
	jwt.verify(
		req.headers.authorization,
		process.env.TOKEN_SECRET,
		(err, decoded) => {
			if (err) {
				res.json(err.name);
			} else {
				res.json("success");
				return next();
			}
		}
	);
};

/*******INITIALIZING THE DATABASE********/

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

/**********SETTING UP THE ROUTES***********/

app.get("/", async (req, res) => {
	try {
		const feed = await posts.find();
		if (feed) res.status(200).json(feed);
		else res.status(404).json("No Posts Yet");
	} catch (err) {
		res.status(400).json("Error Getting Feed");
	}
});

app.get("/:domain", async (req, res) => {
	try {
		const returnedFeed = await posts.find({ domain: req.params.domain });
		if (returnedFeed) res.status(200).json(returnedFeed);
		else res.status(404).json("No Posts Yet");
	} catch (err) {
		res.status(400).json("Error Getting Posts");
	}
});

app.get("/post/:link", async (req, res) => {
	try {
		const returnedPost = await posts.findOne({ link: req.params.link });
		if (returnedPost) res.status(200).json(returnedPost);
		else res.status(404).json("No Such Post");
	} catch (err) {
		res.status(400).json("Error Getting Post");
	}
});

app.post("/login", (req, res) => {
	if (
		req.body.username === process.env.USERNAME &&
		req.body.password === process.env.PASSWORD
	) {
		const token = jwt.sign(
			{ username: req.body.username },
			process.env.TOKEN_SECRET
		);
		res.status(200).json(token);
	} else {
		res.status(400).json("denied");
	}
});

app.post("/istokenvalid", verifyToken, (req, res) => {
	try {
		res.status(200).json("true");
	} catch (err) {
		res.status(400).json("false");
	}
});

app.post("/administrator/new", verifyToken, async (req, res) => {
	const post = new posts(req.body);
	try {
		const savedPost = await post.save();
		res.status(200).json(savedPost);
	} catch (err) {
		res.status(400).json(err);
	}
});

app.patch("/administrator/:link", verifyToken, async (req, res) => {
	try {
		updatedPost = await posts.updateOne(
			{ link: req.params.link },
			{ $set: req.body }
		);
		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(400).json("Post Updated");
	}
});

app.patch("/like/:link", async (req, res) => {
	try {
		likedPost = await posts.updateOne(
			{ link: req.params.link },
			{
				$set: {
					likes: req.body.likes,
				},
			}
		);
		res.status(200).json("Like Changed");
	} catch (err) {
		res.status(400).json(err);
	}
});

app.delete("/administrator/:link", verifyToken, async (req, res) => {
	try {
		const removedPost = await posts.deleteOne({ link: req.params.link });
		res.status(200).json("Post deleted");
	} catch (err) {
		res.status(400).json(err);
	}
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
