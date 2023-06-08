import React, { memo } from "react";
import classes from "./Post.module.css";
import ImpressionButton from "../ImpressionButton";
import { Link } from "react-router-dom";

const Post = ({ postDetails, isSinglePost = false }) => {
	const classNames = isSinglePost ? classes.container : `${classes.container} ${classes.containerEffect}`;
	const postPath = `/feed/${postDetails.id}`;

	console.log("post rerender");

	return (
		<div>
			<div className={classNames}>
				<div className={classes.containerContent}>
					<Link to={postPath} className={classes.linkContainer}>
						<div className={classes.userContainer}>
							<img
								src="https://media.istockphoto.com/id/1127404434/photo/stone-balance-on-rock-covered-by-moss-in-the-forest.jpg?s=612x612&w=0&k=20&c=M96L2QntRL9kebdalbeeEqxivalpCSG3JWGqWjDmlKA="
								alt="img"
								className={classes.userImage}
							/>
							<div className={classes.userInfo}>
								<div className={classes.userName}>{postDetails.name}</div>
								<div className={classes.userAt}>@{postDetails.userAt}</div>
							</div>
						</div>

						<div className={classes.postContent}>{postDetails.content}</div>

						<div className={classes.timestamp}>{postDetails.timestamp}</div>
					</Link>
					<hr />
					<div className={classes.impression}>
						<div className={classes.likes}>
							<span>{postDetails.likes}</span> Likes
						</div>
						<div className={classes.likes}>
							<span>{postDetails.comments}</span> Comments
						</div>
					</div>
					<hr />
					<div className={classes.impressionButtons}>
						<ImpressionButton className={classes.like} type="like" isLiked={false} />
						<Link to={postPath} className={classes.comment}>
							<ImpressionButton type={"comment"} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Post);
