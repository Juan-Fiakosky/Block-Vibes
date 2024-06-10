import React, { useState } from "react";
import IconLogo from "./IconLogo";
import PopUp from "./PopUp";
import "./NavBar.css";

const NavBar = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<header className="container-navbar-header">
			<nav className="navbar-header">
				<ul className="navbar-nav-header">
					<li className="nav-item-header">
						<a href="#">NEWS</a>
					</li>
					<li className="nav-item-header">
						<a href="#">CAREERS</a>
					</li>
					<li className="nav-item-header">
						<a href="#">INVESTORS</a>
					</li>
				</ul>
			</nav>
			<IconLogo onClick={openModal} />
			<PopUp isOpen={modalIsOpen} closeModal={closeModal} />
		</header>
	);
};

export default NavBar;
