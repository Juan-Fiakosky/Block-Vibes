import React from "react";

const IconLogo = ({ onClick }) => (
	<div onClick={onClick}>
		<svg
			className="icon"
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			width="24px"
			viewBox="0 0 14 17"
			fill="none"
		>
			<path d="M8.5 0H5.5V3H8.5V0Z" fill="currentColor" />
			<path d="M0 5H14V7H10V17H8V13H6V17H4V7H0V5Z" fill="currentColor" />
		</svg>
	</div>
);

export default IconLogo;
