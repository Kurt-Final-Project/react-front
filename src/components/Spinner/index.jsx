import React from "react";
import classes from "./Spinner.module.css";

const Spinner = () => {
	return (
		<div className={classes.spinner_container}>
			<div className={classes.loading_spinner}></div>
		</div>
	);
};

export const Loading = ({ loadingText }) => {
	return (
		<div className={classes.loading}>
			<Spinner />
			<p className={classes.loadingText}>{loadingText}</p>
		</div>
	);
};

export default Spinner;
