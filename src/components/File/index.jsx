import React, { useState } from "react";
import classes from "./File.module.css";

const File = (props) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [imageUrl, setImageUrl] = useState("");

	const { selectedFileHandler, ...newProps } = { ...props };

	const onFileChangeHandler = (e) => {
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file);
			setImageUrl(URL.createObjectURL(file));
			selectedFileHandler(file);
		}
	};

	return (
		<div className={classes.perField}>
			<div className={classes.fileContainer}>
				{selectedFile?.name ? (
					<img src={imageUrl} alt="profile_picture" className={classes.imageContainer} />
				) : (
					"Upload Image"
				)}
				<button className={classes.textInput} type="button"></button>
				<input {...newProps} onChange={onFileChangeHandler} accept=".png, .jpg, .jpeg" />
			</div>
		</div>
	);
};

export default File;
