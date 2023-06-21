import React, { memo, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OptionMenu from "../OptionMenu";
import Modal from "../Modal";
import { toaster } from "../Toaster";

import { deleteCommentApi } from "../OptionMenu/api";
import formatDateFromNow from "../../utils/date.helper";
import classes from "./Comment.module.css";

const Comment = ({ commentDetails, blog_id, onDeleteCommentHandler }) => {
	const user = commentDetails.user_id;
	const comment_id = commentDetails._id;

	const { token, user: saved_user } = useSelector((state) => state.auth);

	const dialogBox = useRef();
	const [showOptions, setShowOptions] = useState(false);

	const showOptionMenuHandler = () => {
		setShowOptions((prev) => !prev);
	};

	const onDeletePostHandler = () => {
		setShowOptions(false);
		dialogBox.current.showModal();
	};

	const onDialogSubmit = async () => {
		try {
			const res = await deleteCommentApi({ token, blog_id, comment_id: commentDetails._id });
			const data = await res.json();

			if (!res.ok) {
				throw data;
			}

			toaster.success(data.message);
			onDeleteCommentHandler(comment_id);
		} catch (err) {
			console.log("An error occured.", err);
		}
	};

	return (
		<div className={classes.commentContainer}>
			<Modal onDialogSubmit={onDialogSubmit} ref={dialogBox} dialogSubmitText={"Delete"}>
				<div className={classes.modalContent}>
					<p className={classes.deleteHeading}>Delete Comment?</p>
					<p className={classes.subText}>Permanently remove this comment? Please confirm.</p>
				</div>
			</Modal>
			<div className={classes.userContainer}>
				<div className={classes.profile}>
					<img
						src={`${process.env.REACT_APP_BACKEND_URL}/${user.profile_picture_url}`}
						alt="profile"
						className={classes.userImage}
					/>
				</div>
				<div className={classes.userInfo}>
					<div className={classes.nameContainer}>
						<Link
							to={`/profile/${user.user_at}`}
							className={classes.userName}
						>{`${user.first_name} ${user.last_name}`}</Link>
						<div className={classes.userAt}>{`@${user.user_at}`}</div>
						<div className={classes.userAt}>{"ꞏ"}</div>
						<div className={classes.userAt}>{formatDateFromNow(commentDetails.createdAt)}</div>
					</div>

					<div className={classes.comment}>{commentDetails.comment}</div>
				</div>
				<div className={classes.userOption}>
					{saved_user === user._id && (
						<OptionMenu
							onDeletePostHandler={onDeletePostHandler}
							showOptionMenuHandler={showOptionMenuHandler}
							showOptionsModal={showOptions}
						/>
					)}
				</div>
			</div>
			<hr />
		</div>
	);
};

export default memo(Comment);
