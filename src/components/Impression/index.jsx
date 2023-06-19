import React from "react";
import classes from "./Impression.module.css";

const Impression = ({ likesCount, commentsCount }) => {
	return (
		<div className={classes.impression}>
			<div className={classes.likes}>
				<span>{likesCount}</span> Likes
			</div>
			<div className={classes.likes}>
				<span>{commentsCount}</span> Comments
			</div>
		</div>
	);
};

export default Impression;
