import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./Entrypoint.module.css";

const Entrypoint = () => {
	const token = useSelector((state) => state.auth.token);
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			return navigate("/feed");
		}

		return navigate("/login");
	}, [token, navigate]);

	return (
		<div className={classes.container}>
			<h1 className={classes.header}>Hang tight!</h1>
			<h2 className={classes.midtext}>
				We're getting things ready for you. Sit back, relax, and let us take care of the rest.
			</h2>
			<h2 className={classes.lowtext}>We appreciate your patience.</h2>
		</div>
	);
};

export default Entrypoint;
