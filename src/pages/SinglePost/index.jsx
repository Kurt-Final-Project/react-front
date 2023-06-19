import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Comment from "../../components/Comment";
import { Loading } from "../../components/Spinner";
import Post from "../../components/Post";
import ToastContainer, { toaster } from "../../components/Toaster";

import { getSingleBlogApi, getAllCommentsApi } from "./api";

import DataLoaderComponent from "../../utils/DataLoader";

const SinglePost = () => {
	const { id } = useParams();
	const { token } = useSelector((state) => state.auth);

	const [blog, setBlog] = useState();
	const [isBlogLoading, setIsBlogLoading] = useState(false);

	const [comments, setComments] = useState([]);
	const [isCommentLoading, setIsCommentLoading] = useState(false);

	const getSingleBlog = useCallback(async () => {
		setIsBlogLoading(true);
		try {
			const res = await getSingleBlogApi({ token, id });
			const data = await res.json();

			if (!res.ok) {
				toaster.error(data.message);
				throw data;
			}

			setBlog(data.blog);
			setIsBlogLoading(false);
		} catch (err) {
			setIsBlogLoading(false);
			toaster.error();
			throw err;
		}
	}, [token, id]);

	const getAllComments = useCallback(async () => {
		setIsCommentLoading(true);
		try {
			const res = await getAllCommentsApi({ token, id });

			const data = await res.json();

			if (!res.ok) {
				toaster.error(data.message);
				throw data;
			}

			setIsCommentLoading(false);
			setComments(data.comments);
		} catch (err) {
			setIsCommentLoading(false);
			toaster.error();
			throw err;
		}
	}, [token, id]);

	useEffect(() => {
		getSingleBlog()
			.then(() => getAllComments())
			.catch(() => console.log("An error occured!"));
	}, [getSingleBlog, getAllComments]);

	return (
		<div>
			<DataLoaderComponent
				mainDependency={blog}
				isLoading={isBlogLoading}
				loader={<Loading loadingText={"Loading Blog Details"} />}
			>
				{(data) => <Post postDetails={data} isSinglePost={true} />}
			</DataLoaderComponent>

			<DataLoaderComponent
				mainDependency={comments}
				isLoading={isCommentLoading}
				loader={<Loading loadingText={"Loading Comments"} />}
			>
				{(data) =>
					data.map((comment) => {
						return <Comment key={comment._id} commentDetails={comment} />;
					})
				}
			</DataLoaderComponent>

			<ToastContainer />
		</div>
	);
};

export default memo(SinglePost);
