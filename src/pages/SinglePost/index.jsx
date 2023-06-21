import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Comment from "../../components/Comment";
import CommentBox from "../../components/CommentBox";
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
			.catch((err) => console.log("An error occured.", err));
	}, [getSingleBlog, getAllComments]);

	const onUserReply = (data) => {
		setComments((prev) => {
			return [data, ...prev];
		});
	};

	const onDeleteCommentHandler = (comment_id) => {
		const filterComment = comments.filter((comment) => comment._id !== comment_id);
		setComments(filterComment);
	};

	return (
		<div>
			<DataLoaderComponent
				mainDependency={blog}
				isLoading={isBlogLoading}
				loader={<Loading loadingText={"Loading Blog Details"} />}
			>
				{(data) => <Post postDetails={data} isSinglePost={true} />}
			</DataLoaderComponent>

			<CommentBox onSubmit={onUserReply} />

			<DataLoaderComponent
				mainDependency={comments}
				isLoading={isCommentLoading}
				loader={<Loading loadingText={"Loading Comments"} />}
			>
				{(data) =>
					data.map((comment) => {
						return (
							<Comment
								key={comment._id}
								blog_id={id}
								commentDetails={comment}
								onDeleteCommentHandler={onDeleteCommentHandler}
							/>
						);
					})
				}
			</DataLoaderComponent>

			<ToastContainer />
		</div>
	);
};

export default memo(SinglePost);
