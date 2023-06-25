import React from "react";
import { Link } from "react-router-dom";
import { BiSad } from "react-icons/bi";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
	return (
		<div className={classes.container}>
			<div className={classes.icon}>
				<BiSad />
			</div>
			<div className={classes.headerText}>404</div>

			<div className={classes.subText}>Page not found</div>
			<div className={classes.infoText}>
				Oh dear! The page you're seeking seems to be on vacation.
				<br />
				Join us as we explore alternative online destinations.
			</div>
			<Link to={"/"} className={classes.linkText}>
				Wander off
			</Link>
		</div>
	);
};

export default ErrorPage;
