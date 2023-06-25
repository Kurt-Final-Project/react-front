import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Button from "../Button";
import TextArea from "../TextArea";
import { toaster } from "../Toaster";

import { postCommentApi } from "./api";
import classes from "./Tweet.module.css";

const Tweet = ({ onSubmit }) => {
	const { token, profile_picture_url } = useSelector((state) => state.auth);
	const [textareaValue, setTextareaValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onPostHandler = useCallback(
		async (e) => {
			e.preventDefault();
			if (textareaValue.length < 5) return;

			setIsLoading(true);
			try {
				const res = await postCommentApi({ token, description: textareaValue });
				const data = await res.json();

				if (!res.ok) {
					toaster.error(data.message);
					throw data;
				}

				setIsLoading(false);
				setTextareaValue("");
				onSubmit(data.blog);
				toaster.success(data.message);
			} catch (err) {
				setIsLoading(false);
				console.log("An error occured.", err);
			}
		},
		[onSubmit, textareaValue, token]
	);

	return (
		<form className={classes.container} onSubmit={onPostHandler}>
			<div className={classes.content}>
				<img
					src={`${process.env.REACT_APP_BACKEND_URL}/${profile_picture_url}`}
					alt="img"
					className={classes.userImage}
				/>
				<TextArea
					className={classes.message}
					placeholder="What's on your mind?"
					maxLength={1000}
					textValue={(val) => setTextareaValue(val)}
					value={textareaValue}
				/>
			</div>
			<div className={classes.btn}>
				<Button
					btntext={"Post"}
					type="submit"
					disabled={isLoading || textareaValue.length < 5}
					isSubmitting={isLoading}
					btntype="primary"
					isfor="tweet"
				/>
			</div>
		</form>
	);
};

export default Tweet;
