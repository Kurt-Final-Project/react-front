import React, { useState, memo, useEffect, useCallback, lazy, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toaster } from "../Toaster";
import ImpressionButton from "../ImpressionButton";
import OptionMenu from "../OptionMenu";
import Modal from "../Modal";

import { deleteBlogApi, getLikesAndCommentsApi } from "./api";
import classes from "./Post.module.css";
import formatDateFromNow from "../../utils/date.helper";

const Impressions = lazy(() => import("../Impression"));

const Post = ({ postDetails, isSinglePost = false, handleDeleteBlog }) => {
	const navigate = useNavigate();
	const [isLiked, setIsLiked] = useState(false);
	const [likesCount, setLikesCount] = useState(0);
	const [commentsCount, setCommentsCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const dialogBox = useRef();
	const [showOptions, setShowOptions] = useState(false);

	const classNames = isSinglePost ? classes.container : `${classes.container} ${classes.containerEffect}`;
	const blog_id = postDetails._id;
	const postPath = `/feed/${blog_id}`;

	const { token, user: saved_user } = useSelector((state) => state.auth);

	const getLikesAndComments = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await getLikesAndCommentsApi({ token, blog_id });
			const data = await res.json();

			if (!res.ok) {
				throw data;
			}

			setIsLoading(false);
			setIsLiked(data.isLiked);
			setLikesCount(data.likes);
			setCommentsCount(data.comments);
		} catch (err) {
			setIsLoading(false);
			console.log("An error occured.", err);
		}
	}, [blog_id, token]);

	useEffect(() => {
		getLikesAndComments();
	}, [getLikesAndComments]);

	const user = postDetails.user_id;

	const CommentButton = ({ isSingular }) => {
		const render = !isSingular ? (
			<Link to={postPath} className={classes.comment}>
				<ImpressionButton type={"comment"} />
			</Link>
		) : (
			<div className={classes.comment} style={{ cursor: "none" }}>
				<ImpressionButton type={"comment"} />
			</div>
		);

		return render;
	};

	const showOptionMenuHandler = () => {
		setShowOptions((prev) => !prev);
	};

	const onDeletePostHandler = () => {
		setShowOptions(false);
		dialogBox.current.showModal();
	};

	const onDialogSubmit = async () => {
		try {
			const res = await deleteBlogApi({ token, blog_id });
			const data = await res.json();

			if (!res.ok) {
				throw data;
			}

			if (!isSinglePost) handleDeleteBlog(blog_id);
			else navigate("..");
			toaster.success(data.message);
			return data;
		} catch (err) {
			console.log("An error occured.", err);
		}
	};

	return (
		<div>
			<Modal onDialogSubmit={onDialogSubmit} ref={dialogBox} dialogSubmitText={"Delete"}>
				<div className={classes.modalContent}>
					<p className={classes.deleteHeading}>Delete Post?</p>
					<p className={classes.subText}>
						Once deleted, this post will be permanently removed from the system. This action cannot be undone. Please
						confirm your decision before proceeding.
					</p>
				</div>
			</Modal>
			<div className={classNames}>
				<div className={classes.containerContent}>
					<div className={classes.linkContainer}>
						<div className={classes.userContainer}>
							<img
								src={`${process.env.REACT_APP_BACKEND_URL}/${user.profile_picture_url}`}
								alt="img"
								className={classes.userImage}
							/>
							<div className={classes.userInfo}>
								<Link to={`/profile/${user._id}`} className={classes.userName}>
									{user.first_name}
								</Link>
								<Link to={`/profile/${user._id}`} className={classes.userAt}>
									@{user.user_at}
								</Link>
							</div>

							{saved_user === user._id && (
								<OptionMenu
									onDeletePostHandler={onDeletePostHandler}
									showOptionMenuHandler={showOptionMenuHandler}
									showOptionsModal={showOptions}
								/>
							)}
						</div>
						<Link to={postPath} className={classes.linkContainer}>
							<div className={classes.postContent}>{postDetails.description}</div>
							<div className={classes.timestamp}>{formatDateFromNow(postDetails.updatedAt)}</div>
						</Link>
					</div>
					<hr />

					{!isLoading ? (
						<React.Fragment>
							<Impressions likesCount={likesCount} commentsCount={commentsCount} />
							<hr />
							<div className={classes.impressionButtons}>
								<ImpressionButton
									className={classes.like}
									type="like"
									isLiked={isLiked}
									blog_id={blog_id}
									updateCount={(val) => setLikesCount((prev) => prev + val)}
								/>
								<CommentButton isSingular={isSinglePost} />
							</div>
						</React.Fragment>
					) : (
						<p>Fetching impressions...</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(Post);
