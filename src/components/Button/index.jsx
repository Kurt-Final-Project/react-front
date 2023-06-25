import React, { memo } from "react";
import classes from "./Button.module.css";

import Spinner from "../Spinner";

const Button = (props) => {
	const btnType =
		props.btntype === "primary"
			? `${props.className} ${classes.buttonPrimary}`
			: `${props.className} ${classes.buttonSecondary}`;

	const { isSubmitting, ...newProps } = props;

	return (
		<button {...newProps} className={btnType}>
			{newProps.disabled && newProps.isfor === "tweet" && !isSubmitting ? (
				newProps.btntext
			) : newProps.disabled && isSubmitting ? (
				<Spinner />
			) : (
				newProps.btntext
			)}
		</button>
	);
};

export default memo(Button);
