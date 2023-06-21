import React from "react";
import classes from "./Button.module.css";

import Spinner from "../Spinner";

const Button = (props) => {
	const btnType =
		props.btntype === "primary"
			? `${props.className} ${classes.buttonPrimary}`
			: `${props.className} ${classes.buttonSecondary}`;

	return (
		<button {...props} className={btnType}>
			{props.disabled && props.isfor === "tweet" ? props.btntext : props.disabled ? <Spinner /> : props.btntext}
		</button>
	);
};

export default Button;
