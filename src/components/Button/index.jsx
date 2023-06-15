import React from "react";
import classes from "./Button.module.css";

import Spinner from "../Spinner";

const Button = (props, { type = "primary" }) => {
	const btnType =
		type === "primary"
			? `${props.className} ${classes.buttonPrimary}`
			: `${props.className} ${classes.buttonSecondary}`;

	return (
		<button {...props} className={btnType}>
			{props.disabled ? <Spinner /> : props.btntext}
		</button>
	);
};

export default Button;
