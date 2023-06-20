import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toaster } from "../Toaster";

import { getImpressionsApi } from "./api";
import { VscComment } from "react-icons/vsc";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import classes from "./ImpressionButton.module.css";

const ImpressionButton = ({ type, isLiked, blog_id, updateCount }) => {
	const [isUserLiked, setIsUserLiked] = useState(isLiked);
	const { token } = useSelector((state) => state.auth);

	const onClickLikeHandler = async () => {
		setIsUserLiked((prev) => !prev);
		try {
			const res = await getImpressionsApi({ token, body: { blog_id, isLiking: !isUserLiked } });

			const data = await res.json();

			if (!res.ok) {
				toaster.error(data.message);
				throw data;
			}

			if (!isUserLiked) updateCount(1);
			else updateCount(-1);
		} catch (err) {
			console.log("An error occured.", err);
		}
	};

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
