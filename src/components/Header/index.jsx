import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import { useLocation } from "react-router-dom";

import classes from "./Header.module.css";

const Header = () => {
	const location = useLocation();
	const currentPath = location.pathname.split("/")[1];
	const finalPath = currentPath === "edit-profile" ? "Edit Profile" : currentPath;

	return (
		<div className={classes.container}>
			<div className={classes.navigation}>
				<Navigation />
			</div>
			<div className={classes.bodyContainer}>
				<div className={classes.header}>
					<h2 className={classes.headerText}>{finalPath}</h2>
				</div>
				<div className={classes.feedContainer}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Header;
