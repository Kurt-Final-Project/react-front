import React from "react";
import classes from "./Feed.module.css";
import Post from "../../components/Post";
import Tweet from "../../components/Tweet";

const Feed = () => {
	return (
		<div className={classes.container}>
			<Tweet />
			<Post />
			<Post />
			<Post />
			<Post />
		</div>
	);
};

export default Feed;
