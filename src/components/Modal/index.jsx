import React, { useRef, forwardRef, useImperativeHandle } from "react";
import Button from "../Button";

import classes from "./Modal.module.css";
const Modal = forwardRef(({ onDialogSubmit, children, isSubmitting }, ref) => {
	const dialogBox = useRef();

	const onDialogCancel = () => {
		dialogBox.current.close();
	};

	useImperativeHandle(
		ref,
		() => ({
			showModal() {
				dialogBox.current.showModal();
			},
		}),
		[]
	);

	return (
		<dialog ref={dialogBox} className={classes.dialogContainer}>
			<form method="dialog" onSubmit={onDialogSubmit}>
				<div className={classes.dialogContent}>
					{children}
					<div className={classes.btnContainer}>
						<Button
							className={classes.btn}
							disabled={isSubmitting}
							onClick={onDialogCancel}
							btntext="Cancel"
							btntype="secondary"
							type="button"
							formMethod="dialog"
						/>
						<Button className={classes.btn} disabled={isSubmitting} type="submit" btntext="Save" btntype="primary" />
					</div>
				</div>
			</form>
		</dialog>
	);
});

export default Modal;
