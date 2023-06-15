import React from "react";
import { MdError } from "react-icons/md";

import classes from "./ErrorText.module.css";

function ErrorText({ children }) {
	return (
		<i className={classes.errorText}>
			<MdError />
			{children}
		</i>
	);
}

export default ErrorText;
