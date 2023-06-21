import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Button from "../Button";
import TextArea from "../TextArea";
import { toaster } from "../Toaster";

import { postCommentApi } from "./api";
import classes from "./Tweet.module.css";

const Tweet = ({ onSubmit }) => {
	const { token } = useSelector((state) => state.auth);
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
					src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
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
					btntype="primary"
					isfor="tweet"
				/>
			</div>
		</form>
	);
};

export default Tweet;
