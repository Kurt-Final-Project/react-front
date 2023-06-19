import React, { memo } from "react";

import bg from "../../assets/blog-bg.svg";
import classes from "./Comment.module.css";

const Comment = ({ commentDetails }) => {
	const user = commentDetails.user_id;

	return (
		<div className={classes.commentContainer}>
			<div className={classes.userContainer}>
				<div className={classes.profile}>
					<img src={bg} alt="profile" className={classes.userImage} />
					{/* <img src={user.profile_picture_url} alt="profile" className={classes.userImage} /> */}
				</div>
				<div className={classes.userInfo}>
					<div className={classes.userName}>{`${user.first_name} ${user.last_name}`}</div>
					<div className={classes.userAt}>{`${user.user_at}`}</div>
					<div className={classes.comment}>{commentDetails.comment}</div>
				</div>
			</div>
			<hr />
		</div>
	);
};

export default memo(Comment);
