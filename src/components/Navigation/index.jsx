import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgFeed } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

// import { MdOutlineTravelExplore } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import classes from "./Navigation.module.css";

const Navigation = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLogoutHandler = () => {
		navigate("/");
		dispatch(authActions.logout());
	};

	return (
		<div className={classes.container}>
			<nav>
				<ul className={classes.linkContainer}>
					<NavLink
						to={"/feed"}
						className={classes.linkItem}
						style={({ isActive, isPending }) => {
							return {
								fontWeight: isActive ? "bold" : "",
								color: isPending ? "red" : "black",
							};
						}}
					>
						<div className={classes.linkContent}>
							<CgFeed size={35} />
							Feed
						</div>
					</NavLink>
					{/* <NavLink
						to={"/explore"}
						className={classes.linkItem}
						style={({ isActive, isPending }) => {
							return {
								fontWeight: isActive ? "bold" : "",
								color: isPending ? "red" : "black",
							};
						}}
					>
						<div className={classes.linkContent}>
							<MdOutlineTravelExplore size={35} />
							Explore
						</div>
					</NavLink> */}
					<NavLink
						to={"/profile/1"}
						className={classes.linkItem}
						style={({ isActive, isPending }) => {
							return {
								fontWeight: isActive ? "bold" : "",
								color: isPending ? "red" : "black",
							};
						}}
					>
						<div className={classes.linkContent}>
							<AiOutlineUser size={35} />
							Profile
						</div>
					</NavLink>
					<button className={classes.linkItem} onClick={onLogoutHandler}>
						<div className={classes.linkContent}>
							<RiLogoutCircleLine size={35} />
							Logout
						</div>
					</button>
				</ul>
			</nav>
		</div>
	);
};

export default Navigation;
