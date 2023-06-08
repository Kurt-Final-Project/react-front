import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Entrypoint = () => {
	const token = useSelector((state) => state.auth.token);
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			return navigate("/feed");
		}

		return navigate("/login");
	}, [token, navigate]);

	return <div>Loading...</div>;
};

export default Entrypoint;
