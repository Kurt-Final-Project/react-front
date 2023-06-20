import React, { useState } from "react";

import classes from "./TextArea.module.css";

const TextArea = ({ placeholder, maxLength, className, textValue, value }) => {
	const [, setTextareaValue] = useState("");

	const handleTextareaInput = (event) => {
		const value = event.target.value;
		setTextareaValue(value);
		textValue(value);

		event.target.style.height = "auto";
		event.target.style.height = event.target.scrollHeight + "px";
	};

	className = className ?? classes.message;
	return (
		<textarea
			className={className}
			value={value}
			onChange={handleTextareaInput}
			placeholder={placeholder}
			maxLength={maxLength}
		/>
	);
};

export default TextArea;
