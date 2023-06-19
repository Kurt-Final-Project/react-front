import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../Button";
import { toaster } from "../Toaster";

import { postReplyApi } from "./api";
import classes from "./CommentBox.module.css";

const CommentBox = ({ onSubmit }) => {
	const { token } = useSelector((state) => state.auth);
	const { id } = useParams();

	const [textareaValue, setTextareaValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleTextareaInput = (event) => {
		setTextareaValue(event.target.value);
		event.target.style.height = "auto";
		event.target.style.height = event.target.scrollHeight + "px";
	};

	const onReplyHandler = useCallback(
		async (e) => {
			e.preventDefault();
			setIsLoading(true);
			try {
				const res = await postReplyApi({ token, comment: textareaValue, blog_id: id });
				const data = await res.json();

				if (!res.ok) {
					toaster.error(data.message);
					throw data;
				}

				setIsLoading(false);
				setTextareaValue("");
				onSubmit(data.comment);
				toaster.success(data.message);
			} catch (err) {
				setIsLoading(false);
			}
		},
		[onSubmit, token, textareaValue, id]
	);

	return (
		<form className={classes.container} onSubmit={onReplyHandler}>
			<div className={classes.content}>
				<textarea
					className={classes.message}
					value={textareaValue}
					onChange={handleTextareaInput}
					placeholder="Reply"
					maxLength={300}
				/>
			</div>
			<div className={classes.btn}>
				<Button btntext={"Reply"} type="submit" disabled={isLoading} />
			</div>
		</form>
	);
};

export default CommentBox;
