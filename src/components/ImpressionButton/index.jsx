import React, { useState } from "react";

import { VscComment } from "react-icons/vsc";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import classes from "./ImpressionButton.module.css";

const ImpressionButton = ({ type, isLiked }) => {
	const onClickLikeHandler = () => {
		setIsUserLiked((prev) => !prev);
	};

	const [isUserLiked, setIsUserLiked] = useState(isLiked);

	let buttonType = <VscComment className={classes.icon} />;

	if (type === "like" && !isUserLiked) {
		buttonType = <AiOutlineLike className={classes.icon} />;
	} else if (type === "like" && isUserLiked) {
		buttonType = <AiFillLike className={`${classes.icon} ${classes.liked}`} />;
	}

	return (
		<button className={classes.button} onClick={type === "like" ? onClickLikeHandler : null}>
			{buttonType}
		</button>
	);
};

export default ImpressionButton;
