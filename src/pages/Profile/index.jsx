import React from "react";
import classes from "./Profile.module.css";
import Post from "../../components/Post";
import bg from "../../assets/blog-bg.svg";

const Profile = () => {
	return (
		<div className={classes.container}>
			<div className={classes.userContainer}>
				<img src={bg} alt="profile" className={classes.userImage} />
			</div>
			<div className={classes.profileInfo}>
				<div className={classes.userInfo}>
					<div className={classes.userName}>Name na mahaba mahaba </div>
					<div className={classes.userMotto}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, cupiditate nisi. Vero, id maiores aliquam ab voluptatum
						obcaecati animi aspernatur voluptates modi et provident nulla, explicabo voluptate velit, inventore nemo?
					</div>
					<div className={classes.dateCreated}>Birthday: {new Date().toLocaleDateString()}</div>
					<div className={classes.dateCreated}>Account Created: {new Date().toUTCString()}</div>
				</div>
				<button className={classes.btnEdit}>Edit Profile</button>
			</div>
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
		</div>
	);
};

export default Profile;
