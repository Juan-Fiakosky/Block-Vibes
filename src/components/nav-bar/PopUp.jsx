import React from "react";
import Modal from "react-modal";

const PopUp = ({ isOpen, closeModal }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			contentLabel="Accessibility Popup"
			style={{
				content: {
					borderRadius: "12px",
					width: "400px",
					height: "300px",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					backgroundColor: "black",
					color: "white",
					display: "flex",
					flexDirection: "column",
					alignItems: "left",
					fontFamily: "PilatWide",
				},
			}}
		>
			<h2>Accessibility</h2>
			<button
				onClick={closeModal}
				style={{
					position: "absolute",
					top: "10px",
					right: "10px",
					backgroundColor: "transparent",
					border: "none",
					color: "white",
					cursor: "pointer",
					fontSize: "20px",
				}}
			>
				×
			</button>
			<p>Use the controls below to customize your web experience.</p>
			<div style={{ marginTop: "80px" }}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						borderBottom: "1px solid white",
						paddingBottom: "10px",
					}}
				>
					<label htmlFor="reduce-color">Reduce color</label>
					<input
						style={{ cursor: "pointer" }}
						type="checkbox"
						id="reduce-color"
					/>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						paddingTop: "10px",
					}}
				>
					<label htmlFor="reduce-motion">Reduce motion</label>
					<input
						style={{ cursor: "pointer" }}
						type="checkbox"
						id="reduce-motion"
					/>
				</div>
			</div>
		</Modal>
	);
};

export default PopUp;
