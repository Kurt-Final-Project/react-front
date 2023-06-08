import React, { useState } from "react";

import { VscComment } from "react-icons/vsc";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import classes from "./ImpressionButton.module.css";

const ImpressionButton = ({ type, isLiked }) => {
	const onClickLikeHandler = () => {
		setIsUserLiked((prev) => !prev);
	};

	const [isUserLiked, setIsUserLiked] = useState(isLiked);

	let buttonType = (
		<div className={classes.iconContainer}>
			<VscComment className={`${classes.icon}`} />
			<div className={classes.buttonText}>Comment</div>
		</div>
	);

	if (type === "like" && !isUserLiked) {
		buttonType = (
			<div className={classes.iconContainer}>
				<AiOutlineLike className={classes.icon} />
				<div className={classes.buttonText}>Like</div>
			</div>
		);
	} else if (type === "like" && isUserLiked) {
		buttonType = (
			<div className={classes.iconContainer}>
				<AiFillLike className={`${classes.icon} ${classes.liked}`} />
				<div className={classes.buttonText}>Liked</div>
			</div>
		);
	}

	return (
		<button className={classes.button} onClick={type === "like" ? onClickLikeHandler : null}>
			{buttonType}
		</button>
	);
};

export default ImpressionButton;
