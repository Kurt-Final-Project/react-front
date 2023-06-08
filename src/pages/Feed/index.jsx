import React from "react";
import Post from "../../components/Post";
import Tweet from "../../components/Tweet";

import fakeSamples from "../../store/sample.posts";
import classes from "./Feed.module.css";

const Feed = () => {
	return (
		<div className={classes.container}>
			<Tweet />
			{console.log(fakeSamples)}
			{fakeSamples.map((data) => {
				return <Post postDetails={data} />;
			})}
		</div>
	);
};

export default Feed;
