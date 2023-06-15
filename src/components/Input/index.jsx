import React from "react";
import { Field, ErrorMessage } from "formik";

import classes from "./Input.module.css";

const Input = (props) => {
	const classNames = classes.textInput;
	const isValidInputClassName = !props.isInvalidField ? classNames : classNames + " " + classes.invalid;

	const { isInvalidField, ...newProps } = { ...props };

	return (
		<div className={classes.perField}>
			<Field {...newProps} className={isValidInputClassName} />
			<div className={classes.errorField}>
				{!isInvalidField ? <div>&nbsp;</div> : <ErrorMessage name={props.name} component="div" />}
			</div>
		</div>
	);
};

export default Input;
