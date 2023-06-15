import React, { memo } from "react";

import bg from "../../assets/blog-bg.svg";
import classes from "./Comment.module.css";

const Comment = () => {
	return (
		<div className={classes.commentContainer}>
			<div className={classes.userContainer}>
				<div className={classes.profile}>
					<img src={bg} alt="profile" className={classes.userImage} />
				</div>
				<div className={classes.userInfo}>
					<div className={classes.userName}>Name na mahaba</div>
					<div className={classes.comment}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ut molestiae laudantium. Quos dolorum
						voluptates tenetur obcaecati omnis perferendis tempora dolor nam atque! Voluptatem id optio labore pariatur
						consequatur dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vel eos sequi dignissimos
						natus reiciendis fugiat, laboriosam quasi minus atque optio aliquid omnis, vero adipisci deserunt tempora
						corrupti! Aut, dicta!
					</div>
				</div>
			</div>
			<hr />
		</div>
	);
};

export default memo(Comment);
