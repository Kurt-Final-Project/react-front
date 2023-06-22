import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import File from "../File";
import Modal from "../Modal";
import { toaster } from "../Toaster";

import { uploadProfileApi } from "./api";
import { LuEdit2 } from "react-icons/lu";
import classes from "./ProfilePicture.module.css";

const ProfilePicture = ({ src }) => {
	const dialogBox = useRef();
	const dispatch = useDispatch();

	const [initialPicture, setInitialPicture] = useState(src);
	const [picture, setPicture] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { token } = useSelector((state) => state.auth);

	const showDialogOnClick = () => {
		dialogBox.current.showModal();
	};

	const onDialogSubmit = async () => {
		setIsSubmitting(true);
		try {
			const res = await uploadProfileApi({ token, picture });
			const data = await res.json();

			if (!res.ok) {
				throw data.message;
			}

			setIsSubmitting(false);
			setInitialPicture(URL.createObjectURL(picture));
			toaster.success(data.message);
			dispatch(authActions.changeProfile({ profile_picture_url: data.newPicture }));
		} catch (err) {
			setIsSubmitting(false);
			console.log("An error occured.", err);
		}
	};

	return (
		<div className={classes.editPictureContainer}>
			<button type="button" className={classes.pictureContainer} onClick={showDialogOnClick}>
				<img src={initialPicture} className={classes.picture} alt="profile_picture" />
				<div className={classes.editContainer}>
					<LuEdit2 className={classes.editBtn} />
				</div>
			</button>

			<Modal onDialogSubmit={onDialogSubmit} isSubmitting={isSubmitting} dialogSubmitText={"Save"} ref={dialogBox}>
				<File type="file" selectedFileHandler={(file) => setPicture(file)} />
			</Modal>
		</div>
	);
};

export default ProfilePicture;
