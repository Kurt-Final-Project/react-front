import React, { useState, useEffect, Suspense, useCallback, lazy } from "react";
import { useSelector } from "react-redux";
import Tweet from "../../components/Tweet";
import { toaster } from "../../components/Toaster";

import classes from "./Feed.module.css";

const Post = lazy(() => import("../../components/Post"));

const Feed = () => {
	const [blogs, setBlogs] = useState([]);
	const { token } = useSelector((state) => state.auth);

	const getAllBlogs = useCallback(async () => {
		try {
			const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/blog", {
				method: "GET",
				headers: {
					Authorization: "bearer " + token,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				toaster.error(data.message);
				throw data;
			}

			setBlogs(data.blogs);
		} catch (err) {
			console.log("An error occured.");
		}
	}, [token]);

	const handleFormSubmit = (data) => {
		setBlogs((prev) => {
			return [data, ...prev];
		});
	};

	useEffect(() => {
		getAllBlogs();
	}, [getAllBlogs]);

	return (
		<div className={classes.container}>
			<Tweet onSubmit={handleFormSubmit} />

			<Suspense fallback={<p>Loading...</p>}>
				{blogs.map((data) => {
					return <Post postDetails={data} key={data._id} />;
				})}
			</Suspense>
		</div>
	);
};

export default Feed;
