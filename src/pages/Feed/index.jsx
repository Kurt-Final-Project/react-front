import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import Tweet from "../../components/Tweet";
import { Loading } from "../../components/Spinner";

import { fetchAllBlogsApi } from "./api";
import classes from "./Feed.module.css";

const Post = lazy(() => import("../../components/Post"));

const Feed = () => {
	const [blogs, setBlogs] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const { token } = useSelector((state) => state.auth);

	const getAllBlogs = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await fetchAllBlogsApi({ token, page });
			const data = await res.json();

			if (!res.ok) {
				throw data;
			}

			setBlogs((prev) => [...prev, ...data.blogs]);
			setHasMore(data.hasMore);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			console.log("An error occured.", err);
		}
	}, [page, token]);

	useEffect(() => {
		getAllBlogs();
	}, [getAllBlogs, page]);

	const handleScroll = useCallback(() => {
		if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && hasMore) {
			setPage((prevPage) => prevPage + 1);
		}
	}, [hasMore]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	const handleFormSubmit = (data) => {
		setBlogs((prev) => {
			const newBlog = { ...data, isLiked: false, likes: 0, comments: 0 };
			return [newBlog, ...prev];
		});
	};

	const handleDeleteBlog = (blog_id) => {
		const filterBlogs = blogs.filter((blog) => blog_id !== blog._id);
		setBlogs(filterBlogs);
	};

	return (
		<div className={classes.container}>
			<Tweet onSubmit={handleFormSubmit} />
			{blogs.map((blog, i) => {
				return (
					<Suspense key={i}>
						<Post postDetails={blog} handleDeleteBlog={handleDeleteBlog} />
					</Suspense>
				);
			})}
			{isLoading && <Loading />}
		</div>
	);
};

export default Feed;
