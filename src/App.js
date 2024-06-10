import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainContent from "./components/MainContent/MainContent";
import NavBar from "./components/nav-bar/NavBar";
import BlockLogo from "./components/footer/BlockLogo";
import "./App.css";
import "./Styles-responsive.css";

function App() {
	//Controlo la presentacion inicial
	const [showPresentation, setShowPresentation] = useState(true);

	useEffect(() => {
		// Oculto la presentación después de 2 segundos
		const timer = setTimeout(() => {
			setShowPresentation(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="App">
			{showPresentation && (
				<div className="presentation">
					<BlockLogo />
				</div>
			)}
			{!showPresentation && (
				<>
					<MainContent />
					<div className="app-container">
						<Header />
						<NavBar />
					</div>
					<Footer />
				</>
			)}
		</div>
	);
}

export default App;
