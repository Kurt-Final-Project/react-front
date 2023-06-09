import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import classes from "./File.module.css";

const File = (props) => {
	const { values } = useFormikContext();
	const selectedImageText = values.image.split("\\").at(-1);

	const classNames = classes.fileContainer;
	const isValidInputClassName = !props.isInvalidField ? classNames : classNames + " " + classes.invalid;

	const { isInvalidField, ...newProps } = { ...props };

	return (
		<div className={classes.perField}>
			<div className={isValidInputClassName} style={{ color: selectedImageText ? "black" : "" }}>
				{!selectedImageText ? "Upload Image" : selectedImageText}
				<button className={classes.textInput} type="button"></button>
				<Field {...newProps} />
			</div>
			<div className={classes.errorField}>{!isInvalidField ? <div>&nbsp;</div> : <ErrorMessage name={props.name} component="div" />}</div>
		</div>
	);
};

export default File;
