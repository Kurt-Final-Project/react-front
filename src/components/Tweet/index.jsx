import React, { useState } from "react";
import classes from "./Tweet.module.css";

const Tweet = () => {
	const [textareaValue, setTextareaValue] = useState("");

	const handleTextareaInput = (event) => {
		setTextareaValue(event.target.value);
		event.target.style.height = "auto";
		event.target.style.height = event.target.scrollHeight + "px";
	};

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<img
					src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
					alt="img"
					className={classes.userImage}
				/>
				<textarea
					className={classes.message}
					value={textareaValue}
					onChange={handleTextareaInput}
					placeholder="What's on your mind?"
					maxLength={450}
				/>
			</div>
			<div className={classes.btn}>
				<button className={classes.btnStyle}>Post</button>
			</div>
		</div>
	);
};

export default Tweet;
