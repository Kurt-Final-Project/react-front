import React from "react";
import classes from "./Post.module.css";
import ImpressionButton from "../ImpressionButton";

const Post = () => {
	return (
		<div className={classes.container}>
			<div className={classes.containerContent}>
				<div className={classes.userContainer}>
					<img
						src="https://media.istockphoto.com/id/1127404434/photo/stone-balance-on-rock-covered-by-moss-in-the-forest.jpg?s=612x612&w=0&k=20&c=M96L2QntRL9kebdalbeeEqxivalpCSG3JWGqWjDmlKA="
						alt="img"
						className={classes.userImage}
					/>
					<div className={classes.userInfo}>
						<div className={classes.userName}>name</div>
						<div className={classes.userAt}>user @</div>
					</div>
				</div>

				<div className={classes.postContent}>
					content content content content content content content content content content content content content content content content
					content content content content content content content content content content content content content content content content
					content content content content content content content content content content content content content content content content
					content content content content content content content content content content content content content content content content
				</div>

				<div className={classes.timestamp}>{new Date().toUTCString()}</div>
				<hr />
				<div className={classes.impression}>
					<div className={classes.likes}>
						<span>5</span> Likes
					</div>
					<div className={classes.likes}>
						<span>5</span> Comments
					</div>
				</div>
				<hr />
				<div className={classes.impressionButtons}>
					<ImpressionButton className={classes.like} type="like" isLiked={false} />
					<ImpressionButton className={classes.comment} type={"comment"} />
				</div>
			</div>
		</div>
	);
};

export default Post;
