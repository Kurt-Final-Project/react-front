import React from "react";
import classes from "./Button.module.css";

const Button = (props, { type = "primary" }) => {
	const btnType = type === "primary" ? `${props.className} ${classes.buttonPrimary}` : `${props.className} ${classes.buttonSecondary}`;

	return (
		<button {...props} className={btnType}>
			{props.btnText}
		</button>
	);
};

export default Button;
