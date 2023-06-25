import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Post from "../../components/Post";
import Button from "../../components/Button";
import { toaster } from "../../components/Toaster";
import { Loading } from "../../components/Spinner";

import DataLoaderComponent from "../../utils/DataLoader";
import { getUserProfileApi, getAllBlogsApi } from "./api";
import classes from "./Profile.module.css";

const Profile = () => {
	const { id } = useParams();
	const { token, user: user_id } = useSelector((state) => state.auth);

	const [user, setUserProfile] = useState();
	const [isLoadingUser, setIsLoadingUser] = useState(false);

	const [blogs, setBlogs] = useState([]);
	const [isLoadingBlog, setIsLoadingBlog] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const getUserProfile = useCallback(async () => {
		setIsLoadingUser(true);
		try {
			const res = await getUserProfileApi({ token, id });
			const data = await res.json();

			if (!res.ok) {
				toaster.error(data.message);
				throw data;
			}

			setUserProfile(data.user);
			setIsLoadingUser(false);
		} catch (err) {
			setIsLoadingUser(false);
			throw err;
		}
	}, [token, id]);

	const getAllBlogs = useCallback(async () => {
		setIsLoadingBlog(true);
		try {
			const res = await getAllBlogsApi({ token, id, page });
			const data = await res.json();

			if (!res.ok) {
				toaster.error(data.message);
				throw data;
			}

			setBlogs((prev) => [...prev, ...data.blogs]);
			setHasMore(data.hasMore);
			setIsLoadingBlog(false);
		} catch (err) {
			setIsLoadingBlog(false);
			throw err;
		}
	}, [token, id, page]);

	useEffect(() => {
		getUserProfile()
			.then(() => getAllBlogs())
			.catch((err) => {
				console.log("An error occured.", err);
			});
	}, [getUserProfile, getAllBlogs, page]);

	const handleScroll = useCallback(() => {
		if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && hasMore) {
			setPage((prevPage) => prevPage + 1);
		}
	}, [hasMore]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	return (
		<div className={classes.container}>
			<DataLoaderComponent
				mainDependency={user}
				isLoading={isLoadingUser}
				loader={<Loading loadingText={"Loading User Profile..."} />}
			>
				{(data) => {
					return (
						<React.Fragment>
							<div className={classes.userContainer}>
								<img
									src={`${process.env.REACT_APP_BACKEND_URL}/${data.profile_picture_url}`}
									alt="profile"
									className={classes.userImage}
								/>
							</div>
							<div className={classes.profileInfo}>
								<div className={classes.userInfo}>
									<div className={classes.userName}>{`${data.first_name} ${data.last_name}`}</div>
									{data.bio && <div className={classes.userMotto}>{data.bio}</div>}
									{data.birthday && (
										<div className={classes.dateCreated}>Birthday: {new Date(data.birthday).toDateString()}</div>
									)}
									<div className={classes.dateCreated}>Account Created: {new Date(data?.createdAt).toDateString()}</div>
								</div>
								{user_id === id && (
									<Link to={"/edit-profile"}>
										<Button className={classes.btnEdit} btntext={"Edit Profile"} />
									</Link>
								)}
							</div>
							<hr />
						</React.Fragment>
					);
				}}
			</DataLoaderComponent>

			<DataLoaderComponent
				mainDependency={blogs}
				isLoading={isLoadingBlog}
				loader={<Loading loadingText={"Loading Blogs..."} />}
			>
				{(data) => {
					return data.length > 0
						? data.map((blog) => {
								return <Post postDetails={blog} key={blog._id} />;
						  })
						: !data.length && user && <div className={classes.noBlogs}>No blogs found</div>;
				}}
			</DataLoaderComponent>
		</div>
	);
};

export default Profile;
