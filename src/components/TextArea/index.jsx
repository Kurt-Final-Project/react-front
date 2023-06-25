import React, { useState, useEffect, useRef } from "react";

import classes from "./TextArea.module.css";

const TextArea = ({ placeholder, maxLength, className, textValue, value }) => {
	const [, setTextareaValue] = useState("");
	const textAreaRef = useRef();

	const adjustTextAreaHeight = () => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "auto";
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
		}
	};

	const handleTextareaInput = (event) => {
		const value = event.target.value;
		setTextareaValue(value);
		textValue(value);
		adjustTextAreaHeight();
	};

	useEffect(() => {
		adjustTextAreaHeight();
	}, [value]);

	className = className ?? classes.message;
	return (
		<textarea
			className={className}
			value={value}
			onChange={handleTextareaInput}
			placeholder={placeholder}
			maxLength={maxLength}
			ref={textAreaRef}
		/>
	);
};

export default TextArea;
