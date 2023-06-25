import React from "react";
import { Field, ErrorMessage } from "formik";

import classes from "./Input.module.css";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const Input = (props) => {
	const classNames = classes.textInput;
	const isValidInputClassName = !props.isInvalidField ? classNames : classNames + " " + classes.invalid;

	const { isInvalidField, isPasswordField, isShowing, setIsShowing, ...newProps } = { ...props };

	return (
		<div className={classes.perField}>
			<div className={classes.inputField}>
				<Field {...newProps} className={isValidInputClassName} />

				{isPasswordField && (
					<button type="button" className={classes.eyeIcon} onClick={() => setIsShowing((prev) => !prev)}>
						{!isShowing ? <BsEye /> : <BsEyeSlash />}
					</button>
				)}
			</div>
			<div className={classes.errorField}>
				{!isInvalidField ? <div>&nbsp;</div> : <ErrorMessage name={props.name} component="div" />}
			</div>
		</div>
	);
};

export default Input;
