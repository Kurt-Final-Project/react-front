import React from "react";

import { SlOptions } from "react-icons/sl";
import classes from "./OptionMenu.module.css";

const OptionMenu = ({ showOptionsModal, showOptionMenuHandler, onDeletePostHandler }) => {
	return (
		<div className={classes.optionContainer}>
			<button className={classes.optionBtn} onClick={showOptionMenuHandler}>
				<SlOptions size={20} />
			</button>
			{showOptionsModal && (
				<ul className={classes.optionMenu}>
					<li>
						<button className={classes.optionBtn} onClick={onDeletePostHandler}>
							Delete
						</button>
					</li>
				</ul>
			)}
		</div>
	);
};

export default OptionMenu;
