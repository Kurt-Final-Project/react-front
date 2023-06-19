import React, { useState, memo, useEffect, useCallback, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImpressionButton from "../ImpressionButton";

import classes from "./Post.module.css";
import formatDateFromNow from "../../utils/date.helper";

const Impressions = lazy(() => import("../Impression"));

const Post = ({ postDetails, isSinglePost = false }) => {
	const [likesCount, setLikesCount] = useState(0);
	const [commentsCount, setCommentsCount] = useState(0);

	const classNames = isSinglePost ? classes.container : `${classes.container} ${classes.containerEffect}`;
	const blog_id = postDetails._id;
	const postPath = `/feed/${blog_id}`;

	const { token } = useSelector((state) => state.auth);
	const getLikesAndComments = useCallback(async () => {
		const urls = [
			`${process.env.REACT_APP_BACKEND_URL}/api/impression/like/${blog_id}`,
			`${process.env.REACT_APP_BACKEND_URL}/api/impression/comment/${blog_id}`,
		];

		try {
			const [likes, comments] = await Promise.all(
				urls.map(async (url) => {
					const res = await fetch(url, {
						method: "GET",
						headers: {
							Authorization: "bearer " + token,
						},
					});

					const data = await res.json();
					return data;
				})
			);

			setLikesCount(likes.likes);
			setCommentsCount(comments.comments.length);
		} catch (err) {
			throw err;
		}
	}, [blog_id, token]);

	useEffect(() => {
		getLikesAndComments();
	}, [getLikesAndComments]);

	const user = postDetails.user_id;
	return (
		<div>
			<div className={classNames}>
				<div className={classes.containerContent}>
					<Link to={postPath} className={classes.linkContainer}>
						<div className={classes.userContainer}>
							{/* <img src={user.profile_picture_url} alt="img" className={classes.userImage} /> */}
							<img src={"http://localhost:8000/public/covers/0.png"} alt="img" className={classes.userImage} />
							<div className={classes.userInfo}>
								<Link to={`/profile/${user.user_at}`} className={classes.userName}>
									{user.first_name}
								</Link>
								<Link to={`/profile/${user.user_at}`} className={classes.userAt}>
									@{user.user_at}
								</Link>
							</div>
						</div>

						<div className={classes.postContent}>{postDetails.description}</div>

						<div className={classes.timestamp}>{formatDateFromNow(postDetails.updatedAt)}</div>
					</Link>
					<hr />
					<Suspense fallback={<p>Fetching impressions...</p>}>
						<Impressions likesCount={likesCount} commentsCount={commentsCount} />
						<hr />
						<div className={classes.impressionButtons}>
							<ImpressionButton className={classes.like} type="like" isLiked={false} />
							<Link to={postPath} className={classes.comment}>
								<ImpressionButton type={"comment"} />
							</Link>
						</div>
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default memo(Post);
